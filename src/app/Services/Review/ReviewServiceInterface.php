<?php

namespace App\Services\Review;

use App\Services\ServiceInterface;

interface ReviewServiceInterface extends ServiceInterface
{
    public function getDetailRating($bookId);
    public function getDetailReview($request);
}
