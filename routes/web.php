<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// All path will be call reactjs.blade.php
Route::get('{path?}', function () {
    return view('reactjs');
})->where('path', '[a-zA-Z0-9-/]+');
