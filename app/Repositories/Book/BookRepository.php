<?php

namespace App\Repositories\Book;

use App\Models\Book;
use App\Repositories\BaseRepository;
use App\Repositories\Book\BookRepositoryInterface;

class BookRepository extends BaseRepository implements BookRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return new Book();
    }

    // Add your custom database methods here
}
