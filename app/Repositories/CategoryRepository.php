<?php
namespace App\Repositories;
use App\Models\Category;
use DB;

class CategoryRepository{

    public function getCategory(){
        $listCategory = Category::all();
        return $listCategory;
    }
}