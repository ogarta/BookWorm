<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
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
            'items_order' => 'required|array',
            'items_order.*.book_id' => 'required|integer|exists:book,id',
            'items_order.*.quantity' => 'required|integer|min:1|max:8',
            
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors();
        $errorExist = [];
        foreach($errors->get('items_order.*.book_id') as $error) {
            array_push($errorExist,$error);
        }
        $response = response()->json([
            'message' => 'The given data was invalid.',
            'errors' => [
                'items_order' => $errorExist,
                'quantity' => $errors->get('items_order.*.quantity'),
            ]
        ], 422);
        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }

    public function messages()
{
    return [
        // get value 
        'items_order.*.book_id.exists' => ':input',
    ];
}
}
