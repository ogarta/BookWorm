<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FillterAndSortRequest;
use App\Http\Resources\Shop\FilterSortCollection;
use App\Services\Shop\ShopServiceInterface;

class ShopController extends Controller
{
    private $shopServiceInterface;

    public function __construct(ShopServiceInterface $shopServiceInterface){
        $this -> shopServiceInterface = $shopServiceInterface;
    }

    public function filterAndSortBookBy(FillterAndSortRequest $request){
        $listBook = $this->shopServiceInterface->handleFilterAndSort($request);
        return new FilterSortCollection($listBook);
    }

}
