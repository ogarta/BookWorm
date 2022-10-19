<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\IdBookRequest;
use App\Repositories\ReviewRepository;

class ReviewController extends Controller
{
    private ReviewRepository $reviewRepository;
    public function __construct(ReviewRepository $reviewRepository){
        $this->reviewRepository=$reviewRepository;
    }
    
    public function getDetailRating(Request $request){
        return $this->reviewRepository->getDetailRating($request->id);
    }

    public function getDetailReview(IdBookRequest $request){
        return $request->id;
    }
}
