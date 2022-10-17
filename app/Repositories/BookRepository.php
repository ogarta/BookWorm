<?php
namespace App\Repositories;
use App\Models\Book;

class BookRepository{
    public function getTopDisCount(){
        $listTopDisCount = Book::join('discount', 'book.id', '=', 'discount.book_id')
        ->join('author', 'book.author_id', '=', 'author.id')
        ->select('book.id','book.book_title', 'book.book_price','book.book_cover_photo','author.author_name', 'discount.discount_price')
        ->orderBy('discount_price','ASC')
        ->limit(env('LIMIT_TOP_DISCOUNT'))
        ->get();
        return $listTopDisCount;

    }

}