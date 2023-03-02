<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Book\BookResource;
use App\Services\Books\BookService;

class BookController extends Controller
{
    private $bookService;

    public function __construct(BookService $bookService){
        $this -> bookService = $bookService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $detailBook = $this->bookService->getBookDetail($id);
        return $detailBook ? new BookResource($detailBook) : response()->json(['message' => 'Book not found'], 404);
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
        $listTopDiscount =  $this->bookService->getTopDiscount();
        return response()->json($listTopDiscount, 200);
    }

    public function getTopRecommend(){
        $listTopRecommend =  $this->bookService->getTopRecommend();
        return  response()->json($listTopRecommend, 200);
    }

    public function getTopPopular(){
        $listTopPopular =  $this->bookService->getTopPopular();
        return response()->json($listTopPopular, 200);
    }
}
