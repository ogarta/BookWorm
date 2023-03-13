<?php

namespace App\Providers;

use App\Services\Auth\AuthService;
use App\Services\Shop\ShopService;
use App\Services\Books\BookService;
use App\Services\Order\OrderService;
use App\Services\Author\AuthorService;
use App\Services\Review\ReviewService;
use Illuminate\Support\ServiceProvider;
use App\Services\Address\AddressService;
use App\Services\Category\CategoryService;
use App\Services\Auth\AuthServiceInterface;
use App\Services\Shop\ShopServiceInterface;
use App\Services\Books\BookServiceInterface;
use App\Services\Order\OrderServiceInterface;
use App\Services\Author\AuthorServiceInterface;
use App\Services\Review\ReviewServiceInterface;
use App\Services\Address\AddressServiceInterface;
use App\Services\Category\CategoryServiceInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            AddressServiceInterface::class,
            AddressService::class
        );
        $this->app->bind(
            AuthServiceInterface::class,
            AuthService::class
        );
        $this->app->bind(
            ReviewServiceInterface::class,
            ReviewService::class
        );
        $this->app->bind(
            AuthorServiceInterface::class,
            AuthorService::class
        );
        $this->app->bind(
            CategoryServiceInterface::class,
            CategoryService::class
        );
        $this->app->bind(
            BookServiceInterface::class,
            BookService::class
        );
        $this->app->bind(
            ShopServiceInterface::class,
            ShopService::class
        );
        $this->app->bind(
            OrderServiceInterface::class,
            OrderService::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
