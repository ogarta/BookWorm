<?php

namespace App\Services\Shop;

use App\Services\Service;
use App\Repositories\Shop\ShopRepository;
use App\Services\Shop\ShopServiceInterface;

class ShopService extends Service implements ShopServiceInterface
{
    protected $shopRepository;
    public function __construct(ShopRepository $shopRepository)
    {
        parent::__construct($shopRepository);
        $this->shopRepository = $shopRepository;
    }

    public function handleFilterAndSort($request)
    {
        return $this->shopRepository->handleFilterAndSort($request);
    }
}
