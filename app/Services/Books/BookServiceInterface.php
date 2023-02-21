<?php

namespace App\Services\Book;
use App\Services\ServiceInterface;

interface BookServiceInterface extends ServiceInterface
{
    public function getTopDiscount();
    public function getTopRecommend();
    public function getTopPopular();
    public function detailBook($id = null);
}