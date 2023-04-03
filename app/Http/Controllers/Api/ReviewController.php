<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IdBookRequest;
use App\Http\Requests\ReviewRequest;
use App\Http\Requests\CreateReviewRequest;
use App\Http\Resources\Review\ReviewCollection;
use App\Http\Resources\Review\RatingCollection;
use App\Services\Review\ReviewServiceInterface;

class ReviewController extends Controller
{
    private $reviewServiceInterface;
    public function __construct(ReviewServiceInterface $reviewServiceInterface){
        $this->reviewServiceInterface=$reviewServiceInterface;
    }
    
    public function getDetailRating(IdBookRequest $request){
        $listDetailRating =  $this->reviewServiceInterface->getDetailRating($request->id);
        return response()->json(new RatingCollection($listDetailRating), 200);
    }

    public function getDetailReview(ReviewRequest $request){
        $listDetailReview =  $this->reviewServiceInterface->getDetailReview($request);
        return response()->json(new ReviewCollection($listDetailReview), 200);
    }

    public function createReview(CreateReviewRequest $request){
        return $this->reviewServiceInterface->create($request->all());
    }
}
