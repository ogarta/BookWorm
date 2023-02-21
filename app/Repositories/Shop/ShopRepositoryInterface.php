<?php

namespace App\Repositories\Shop;

use App\Repositories\RepositoryInterface;

interface ShopRepositoryInterface extends RepositoryInterface{
    public function handleFilterAndSort($request);
}