<?php

namespace App\Services\Review;

use App\Services\Service;
use App\Repositories\Review\ReviewRepository;
use App\Services\Review\ReviewServiceInterface;

class ReviewService extends Service implements ReviewServiceInterface
{
    protected $reviewRepository;
    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }
}
