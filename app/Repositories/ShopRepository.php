<?php
namespace App\Repositories;
use App\Models\Book;
use DB;
use App\Http\Requests\FillterAndSortRequest;

class ShopRepository{

    /**
     * Handle paramester filter and sort book
     *
     * @param  \Illuminate\Http\FillterAndSortRequest  $request
     * @return App\Repositories\filterAndSortBookBy array book filter and sort
     */
    public function handleFilterAndSort($request){
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
            DB::raw('count(review.book_id) as count_review'))
        
            // Filter by Category use category id
        ->when($category_id !== null, function ($query) use ($category_id) {
            return $query->where('book.category_id', $category_id);
        })

        // Filter by Author use author id
        ->when($author_id !== null, function ($query) use ($author_id) {
            return $query->where('book.author_id', $author_id);
        })
        ->groupBy('book.id', 
                'discount.discount_start_date', 
                'discount.discount_end_date', 
                'discount.discount_price', 
                'author.author_name')

        // Filter by Rating Review use num rating
        ->when($num_rating !== null, function ($query) use ($num_rating) {
            return $query->havingRaw('avg(review.rating_start) >= ? ', [$num_rating]);
        });

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
        
        return [$query->paginate($num_item)];
    }
}