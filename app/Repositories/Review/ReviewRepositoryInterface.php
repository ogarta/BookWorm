<?php

namespace App\Repositories\Review;

use App\Repositories\RepositoryInterface;

interface ReviewRepositoryInterface extends RepositoryInterface{
    public function getDetailRating($bookId);
    public function getDetailReview($request);
}