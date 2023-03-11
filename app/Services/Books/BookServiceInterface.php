<?php

namespace App\Services\Books;
use App\Services\ServiceInterface;

interface BookServiceInterface extends ServiceInterface
{
    public function getTopDiscount();
    public function getTopRecommend();
    public function getTopPopular();
    public function getBookDetail($id = null);
    public function getListBook($arrIdBook);
}