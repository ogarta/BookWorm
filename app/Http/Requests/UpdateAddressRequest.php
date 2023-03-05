<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
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
            'id_address' => 'required|integer|exists:addresses,id',
            'city' => 'nullable|string',
            'street' => 'nullable|string',
            'state' => 'nullable|integer|in:0,1',
            'default' => 'nullable|boolean',
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'id_address' => $this->route('address'),
        ]);
    }
}
