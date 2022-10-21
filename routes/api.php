<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// login User
Route::prefix('auth')->group(function () {
	Route::post('login', [AuthController::class, 'login'])
	->name('login');
});

// Home Page
Route::prefix('home')->group(function () {
	Route::get('/books/top-discount',[BookController::class,'getTopDiscount']);
	Route::get('/books/top-recommend',[BookController::class,'getTopRecommend']);
	Route::get('/books/top-popular',[BookController::class,'getTopPopular']);
});

//Shop Page
Route::prefix('shop')->group(function () {
	Route::get('/{sort?}{order?}{category_id?}{author_id?}{num_rating?}{num_item?}', [ShopController::class, 'filterAndSortBookBy'])
	->name('filter_sort_book');
});

//Product Page
Route::prefix('product')->group(function () {
	Route::apiResource('books', BookController::class)->only('show');
	Route::prefix('/review')->group(function () {
		Route::get('/rating/{id?}',[ReviewController::class,'getDetailRating']);
		Route::get('/{id?}{sort?}{rating_star?}{num_item?}',[ReviewController::class,'getDetailReview']);
		Route::post('/create',[ReviewController::class,'createReview']);
	});
});

// Cart Page
Route::middleware('auth:sanctum')->prefix('cart')->group(function () {
	Route::apiResource('order', OrderController::class)->only('store');
});







