<?php

namespace App\Http\Controllers\Api\Book;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\AuthorRepository;
use App\Http\Resources\Book\AuthorResource;

class AuthorController extends Controller
{
    private AuthorRepository $authorRepository;

    public function __construct(AuthorRepository $authorRepository){
        $this -> authorRepository = $authorRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listAuthor = $this->authorRepository->getAuthor();
        return response()->json(AuthorResource::collection($listAuthor),200);
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
        //
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
}
