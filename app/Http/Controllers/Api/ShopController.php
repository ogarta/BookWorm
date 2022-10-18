<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ShopRepository;
use App\Http\Requests\FillterAndSortRequest;

class ShopController extends Controller
{
    private ShopRepository $shopRepository;

    public function __construct(ShopRepository $shopRepository){
        $this -> shopRepository = $shopRepository;
    }

    public function filterAndSortBookBy(FillterAndSortRequest $request){
        return $this -> shopRepository->handleFilterAndSort($request);
    }
}
