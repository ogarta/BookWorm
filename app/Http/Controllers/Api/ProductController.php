<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ProductRepository;

class ProductController extends Controller
{
    private ProductRepository $productRepository;
    public function __construct(ProductRepository $productRepository){
        $this->productRepository=$productRepository;
    }

    public function getReviewBook(Request $request){
        return $this->productRepository->getReviewBook($request);
    }
}
