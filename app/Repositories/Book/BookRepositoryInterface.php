<?php

namespace App\Repositories\Book;

use App\Repositories\RepositoryInterface;

interface BookRepositoryInterface extends RepositoryInterface{
    public function getTopDiscount();
    public function getTopRecommend();
    public function getTopPopular();
}