<?php
namespace App\Repositories;

use App\Http\Requests\FillterAndSortRequest;
use App\Models\Book;
use App\Models\Review;
use DB;
use App\Helper\Constant;

class ShopRepository
{

    /**
     * Handle paramester filter and sort book
     *
     * @param  \Illuminate\Http\FillterAndSortRequest  $request
     * @return App\Repositories\filterAndSortBookBy array book filter and sort
     */
    public function handleFilterAndSort($request)
    {
        $sort = $request->sort;
        $category_id = $request->category_id;
        $author_id = $request->author_id;
        $num_rating = $request->num_rating;
        $num_item = $request->num_item !== null ? $request->num_item : Constant::DEFAULT_ITEM_PAGE;
        return $this->filterAndSortBookBy($sort, $category_id, $num_rating, $author_id, $num_item);
    }

    public function filterAndSortBookBy($sort, $category_id, $num_rating, $author_id, $num_item)
    {
        $query = Book::Leftjoin('review', 'book.id', '=', 'review.book_id')
            ->select('book.*',)

            // Filter by Category use category id
            ->when($category_id !== null, function ($query) use ($category_id) {
                return $query->where('book.category_id', $category_id);
            })

            // Filter by Author use author id
            ->when($author_id !== null, function ($query) use ($author_id) {
                return $query->where('book.author_id', $author_id);
            })
            ->groupBy('book.id', 'discount.discount_price')

            // Filter by Rating Review use num rating
            ->when($num_rating !== null, function ($query) use ($num_rating) {
                return $query->havingRaw('avg(review.rating_start) >= ? ', [$num_rating]);
            });

        // Sort List Books
        switch ($sort) {
            // Sort by most discount price with descending mode and final price with ascending mode
            case Constant::ON_SALE:
                $query = $query->orderBy('sub_price', 'DESC')->orderBy('final_price', 'ASC');
                break;
            // Sort by the most reviews with descending mode and final price with ascending mode
            case Constant::POPULARITY:
                $query = $query->orderBy('count_review', 'DESC')->orderBy('final_price', 'ASC');
                break;
            // Sort by final price ascending mode
            case Constant::PRICE_LOW_TO_HIGH:
                $query = $query->orderBy('final_price', 'ASC');
                break;
            // Sort by final price descending mode
            case Constant::PRICE_HIGH_TO_LOW:
                $query = $query->orderBy('final_price', 'DESC');
                break;
            default:
                break;
        }

        // Handle join discount table
        $detailBook = Book::joinDiscountTable($query);
        
        // Handle Select specific field
        $query = Book::selecFinalPrice($query);
        $query = Review::selectAvgRatingStar($query);
        $query = Review::selectCountReview($query);
        $query = Book::selectSubPrice($query);

        return $query->paginate($num_item);
    }
}
