<?php

namespace App\Http\Resources\Review;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ReviewCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection,
            'pagination' => [
                'size' => $this->perPage(),
                'total' => $this->total(),
                'current' => $this->currentPage(),
                'last' => $this->lastPage(),
            ]
        ];
    }
}
