<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListBookIdRequest;
use Illuminate\Http\Request;
use App\Http\Resources\Book\BookResource;
use App\Services\Books\BookServiceInterface;

class BookController extends Controller
{
    private $bookServiceInterface;

    public function __construct(BookServiceInterface $bookServiceInterface){
        $this -> bookServiceInterface = $bookServiceInterface;
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
        $detailBook = $this->bookServiceInterface->getBookDetail($id);
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
        $listTopDiscount =  $this->bookServiceInterface->getTopDiscount();
        return response()->json($listTopDiscount, 200);
    }

    public function getTopRecommend(){
        $listTopRecommend =  $this->bookServiceInterface->getTopRecommend();
        return  response()->json($listTopRecommend, 200);
    }

    public function getTopPopular(){
        $listTopPopular =  $this->bookServiceInterface->getTopPopular();
        return response()->json($listTopPopular, 200);
    }

    public function getListBook(ListBookIdRequest $arrIdBook){
        $listBook = $this->bookServiceInterface->getListBook($arrIdBook);
        return $listBook;
    }
}
