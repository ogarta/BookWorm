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
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'type_address' => 'required|string|max:255',
            'number_address' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'default' => 'required|boolean',
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'id_address' => $this->route('address'),
        ]);
    }
}
