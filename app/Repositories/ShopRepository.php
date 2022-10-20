<?php
namespace App\Repositories;
use App\Models\Book;
use DB;
use App\Http\Requests\FillterAndSortRequest;

class ShopRepository{

    // Handle paramester null before filter and sort
    public function handleFilterAndSort(FillterAndSortRequest $request){
        $sort = $request->sort !== null?$request->num_item:'ASC';
        $order = $request->order;
        $category_id = $request->category_id;
        $author_id = $request->author_id;
        $num_rating = $request->num_rating;
        $num_item = $request->num_item !== null?$request->num_item:env('DEFAULT_ITEM_PAGE');
        return $this-> filterAndSortBookBy($sort,$order,$category_id,$num_rating,$author_id,$num_item);
    }

    public function filterAndSortBookBy($sort,$order,$category_id,$num_rating,$author_id,$num_item){
        $query = Book::Leftjoin('review', 'book.id', '=', 'review.book_id')
        ->Leftjoin('author', 'book.author_id', '=', 'author.id')
        ->Leftjoin('discount','book.id', '=', 'discount.book_id')
        ->select('book.id',
            'book.book_title', 
            'book.book_price',
            'book.book_cover_photo',
            'author.author_name', 
            DB::raw('avg(review.rating_start) as avg_rating_star'),
            DB::raw('case
					when now() >= discount.discount_start_date 
                    and (discount.discount_end_date is null
                    or now() <=discount.discount_end_date) then discount.discount_price
					else book.book_price
					end as final_price'),
            DB::raw('case
                    when now() >= discount.discount_start_date 
                    and (discount.discount_end_date is null
                    or now() <= discount.discount_end_date) then book.book_price - discount.discount_price
                    end as sub_price'),
            DB::raw('count(review.book_id) as count_review'));
                    
        // Fillter List Books
        // Filter by Author use author id
        if($author_id){
            $query = $query->where('book.author_id','=',$author_id);
        }

        // Filter by Category use category id
        if($category_id){
            $query = $query->where('book.category_id','=',$category_id);
        }

        $query = $query->groupBy('book.id', 
                'discount.discount_start_date', 
                'discount.discount_end_date', 
                'discount.discount_price', 
                'author.author_name');

        // Filter by Rating Review use num rating
        if($num_rating){
            $query = $query->havingRaw('avg(review.rating_start) >= ? ',[$num_rating]);
        }

        // Sort List Books
        switch($order){
            // Sort by most discount price with descending mode and final price with ascending mode
            case 'on_sale':
                $query = $query->orderBy('sub_price','DESC')->orderBy('final_price','ASC');
                break;
            // Sort by the most reviews with descending mode and final price with ascending mode
            case 'popularity':
                $query = $query->orderBy('count_review','DESC')->orderBy('final_price','ASC');
                break;
            // Sort by final price with both ascending and descending mode
            case 'price':
                $query = $query->orderBy('final_price',$sort);
                break;
        }
        return $query->paginate($num_item);
    }
}