<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\ShopRepository;
use App\Http\Requests\FillterAndSortRequest;
use App\Http\Resources\Shop\FilterSortCollection;
use App\Http\Resources\Book\AuthorResource;

class ShopController extends Controller
{
    private ShopRepository $shopRepository;

    public function __construct(ShopRepository $shopRepository){
        $this -> shopRepository = $shopRepository;
    }

    public function filterAndSortBookBy(FillterAndSortRequest $request){
        $listBook = $this->shopRepository->handleFilterAndSort($request);
        return response()->json($listBook,200);
    }

}
