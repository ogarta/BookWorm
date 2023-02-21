<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FillterAndSortRequest;
use App\Http\Resources\Shop\FilterSortCollection;
use App\Services\Shop\ShopService;

class ShopController extends Controller
{
    private ShopService $shopService;

    public function __construct(ShopService $shopService){
        $this -> shopService = $shopService;
    }

    public function filterAndSortBookBy(FillterAndSortRequest $request){
        $listBook = $this->shopService->handleFilterAndSort($request);
        return new FilterSortCollection($listBook);
    }

}
