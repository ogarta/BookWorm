<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ShopRepository;
use App\Http\Requests\FillterAndSortRequest;
use App\Http\Resources\Shop\FilterSortCollection;

class ShopController extends Controller
{
    private ShopRepository $shopRepository;

    public function __construct(ShopRepository $shopRepository){
        $this -> shopRepository = $shopRepository;
    }

    public function filterAndSortBookBy(FillterAndSortRequest $request){
        $listBook = $this->shopRepository->handleFilterAndSort($request);
        return $listBook->count() > 0?
        response()->json(new FilterSortCollection($listBook), 200) :
        response()->json(['message' => 'Not Found List Book'], 404);
    }

}
