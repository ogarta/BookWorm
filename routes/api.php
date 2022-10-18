<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\ShopController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// login User
Route::prefix('auth')->group(function () {
	Route::post('login', [AuthController::class, 'login'])
		->name('login');
});

// Hom Page
//
Route::get('/books/top-discount',[BookController::class,'getTopDiscount']);
Route::get('/books/top-recommend',[BookController::class,'getTopRecommend']);
Route::get('/books/top-popular',[BookController::class,'getTopPopular']);
Route::apiResource('books', BookController::class);

//Shop Page
Route::prefix('shop')->group(function () {
	Route::get('/{sort?}{order?}{category_id?}{author_id?}{num_rating?}{num_item?}', [ShopController::class, 'filterAndSortBookBy'])->name('filter_sort_book');
});

