<?php
namespace App\Repositories;
use App\Models\Book;
use DB;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;

class ProductRepository{
    public function getReviewBook($id){
        return $id;
    }
}