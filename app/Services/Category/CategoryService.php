<?php

namespace App\Services\Category;

use App\Services\Service;
use App\Repositories\Category\CategoryRepository;
use App\Services\Category\CategoryServiceInterface;

class CategoryService extends Service implements CategoryServiceInterface
{
    protected $categoryRepository;
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }
}
