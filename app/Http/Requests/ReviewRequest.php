<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id' => 'required|integer|min:0',
            'sort' => 'string|nullable|in:asc,desc',
            'rating' => 'integer|nullable|min:0|max:5',
            'num_item' => 'integer|nullable|min:0|max:5',
        ];
    }
}
