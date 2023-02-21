<?php

namespace App\Services\Shop;

use App\Services\ServiceInterface;

interface ShopServiceInterface extends ServiceInterface
{
    public function handleFilterAndSort($request);
}
