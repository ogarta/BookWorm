<?php

namespace App\Http\Controllers\Api\Shop;

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
        // return $this->shopRepository->handleFilterAndSort($request)->lastPage();
        $listBook = $this->shopRepository->handleFilterAndSort($request);
        return response()->json($listBook,200);
    }

}
