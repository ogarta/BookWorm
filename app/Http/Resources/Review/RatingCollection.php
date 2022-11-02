<?php

namespace App\Http\Resources\Review;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Helper\Usort;

class RatingCollection extends ResourceCollection
{

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this->collection);
        // $this->collection->map(function ($item) {
        //     dd($item);
        //     // return [
        //     //     'rating_start' => $item->rating_start,
        //     //     'count_rating_star' => $item->count_rating_star,
        //     // ];
        // });
        $data = $this->collection->toArray();
        // dd($data);
        for($i=1;$i<=5;$i++){
            if (!in_array($i, array_column($data, 'rating_start'))) {
                array_push($data, ['rating_start' => $i, 'count_rating_star' => 0]);
            }
        }
        // dd($data);
        return [
            'data'=> Usort::sortArray($data,'desc'),
        ];
        
    }
}
