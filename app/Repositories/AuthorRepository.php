<?php
namespace App\Repositories;
use App\Models\Author;
use DB;

class AuthorRepository{

    public function getAuthor(){
        $listAuthor = Author::all();
        return $listAuthor;
    }
}