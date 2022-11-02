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
        // convert collection to array
        $data = $this->collection->toArray();
        // check if missing data, push 0 to array
        for($i=1;$i<=5;$i++){
            if (!in_array($i, array_column($data, 'rating_start'))) {
                array_push($data, ['rating_start' => $i, 'count_rating_star' => 0]);
            }
        }
        // sort array by rating_start
        return [
            'data'=> Usort::sortArray($data,'desc'),
        ];
        
    }
}
