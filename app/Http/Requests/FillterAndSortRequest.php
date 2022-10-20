<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FillterAndSortRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'sort' => 'string|nullable|in:asc,desc',
            'order' => 'string|nullable|in:on_sale,popularity',
            'category_id' => 'string|nullable',
            'author_id' => 'string|nullable',
            'num_rating' => 'integer|min:0|max:5|nullable',
            'num_item' => 'integer|nullable|in:5,10,15,20',        
        ];
    }
}
