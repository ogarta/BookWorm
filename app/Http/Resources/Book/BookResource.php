<?php

namespace App\Http\Resources\Book;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'book_title' => $this->book_title,
            'book_price' => $this->book_price,
            'book_cover_photo' => $this->book_cover_photo,
            'book_description' => $this->book_summary,
            'author_name' => $this->author->author_name,
            'category_name' => $this->category ? $this->category->category_name : null,
            'count_review' => $this->count_review,
            'avg_rating_star' => number_format($this->avg_rating_star, 5),
            'final_price' => $this->final_price,
            'sub_price' => $this->sub_price,
            'discount_price' => $this->discount_price,
        ];
    }
}
