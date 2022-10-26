<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\BookRepository;
use App\Http\Resources\Book\BookCollection;

class BookController extends Controller
{
    private BookRepository $bookRepository;

    public function __construct(BookRepository $bookRepository){
        $this -> bookRepository = $bookRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "get all";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   
        $detailBook = $this->bookRepository->detailBook($id)->get();
        return $detailBook->isNotEmpty()? 
        response()->json(new BookCollection($detailBook), 200) : 
        response()->json(['message' => 'Not Found Book'], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    public function getTopDiscount(){   
        $listTopDiscount =  $this->bookRepository->getTopDiscount();
        return $listTopDiscount->isNotEmpty()?
        response()->json($listTopDiscount, 200) :
        response()->json(['message' => 'Not Found Books Top Discount'], 404);
    }

    public function getTopRecommend(){
        $listTopRecommend =  $this->bookRepository->getTopRecommend();
        return $listTopRecommend->isNotEmpty()?
        response()->json($listTopRecommend, 200) :
        response()->json(['message' => 'Not Found Books Top Recommend'], 404);
    }

    public function getTopPopular(){
        $listTopPopular =  $this->bookRepository->getTopPopular();
        return $listTopPopular->isNotEmpty()?
        response()->json($listTopPopular, 200) :
        response()->json(['message' => 'Not Found Books Top Popular'], 404);
    }
}
