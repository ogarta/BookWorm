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
        parent::__construct($reviewRepository);
        $this->reviewRepository = $reviewRepository;
    }

    public function getDetailRating($bookId)
    {
        return $this->reviewRepository->getDetailRating($bookId);
    }

    public function getDetailReview($request)
    {
        return $this->reviewRepository->getDetailReview($request);
    }

    public function create($request)
    {
        $createReview = [
            'book_id' => $request['id'],
            'review_title' => $request['title'],
            'review_details' => $request['details'],
            'rating_start' => $request['rating_start'],
            'review_date' => date('Y-m-d H:i:s'),
        ];

        return $this->reviewRepository->create($createReview);
    }
}
