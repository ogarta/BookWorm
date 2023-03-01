<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\CategoryController;
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
	Route::middleware('auth:sanctum')->get('logout', [AuthController::class, 'logout'])
	->name('logout');
	Route::post('sign-up', [AuthController::class, 'signUp']);
	Route::middleware('auth:sanctum')->get('/', [AuthController::class, 'user']);
});

// Home Page
Route::prefix('home')->name('home.')->group(function () {
	Route::get('/books/top-discount',[BookController::class,'getTopDiscount'])->name('top-discount');
	Route::get('/books/top-recommend',[BookController::class,'getTopRecommend'])->name('top-recommend');
	Route::get('/books/top-popular',[BookController::class,'getTopPopular'])->name('top-popular');
});

//Shop Page
Route::prefix('shop')->group(function () {
	Route::apiResource('author', AuthorController::class)->only('index');
	Route::apiResource('category', CategoryController::class)->only('index');
	Route::get('/{sort?}{order?}{category_id?}{author_id?}{num_rating?}{num_item?}', [ShopController::class, 'filterAndSortBookBy'])
	->name('filter_sort_book');
});

//Product Page
Route::prefix('product')->group(function () {
	Route::apiResource('book', BookController::class)->only('show');
	Route::prefix('/review')->group(function () {
		Route::get('/rating/{id?}',[ReviewController::class,'getDetailRating']);
		Route::get('/{id?}{sort?}{rating_star?}{num_item?}',[ReviewController::class,'getDetailReview']);
		Route::post('/create',[ReviewController::class,'createReview']);
	});
});

// Cart Page
Route::middleware('auth:sanctum')->prefix('cart')->group(function () {
	Route::apiResource('order', OrderController::class);
});







