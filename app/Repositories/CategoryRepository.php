<?php
namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{

    public function getCategory()
    {
        $listCategory = Category::all();
        return $listCategory;
    }
}
