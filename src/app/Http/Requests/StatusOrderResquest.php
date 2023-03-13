<?php

namespace App\Http\Requests;

use App\Helper\Constant;
use App\Models\Order;
use Illuminate\Foundation\Http\FormRequest;

class StatusOrderResquest extends FormRequest
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
        $listOrderStatus = implode(',', array_values(Constant::ORDER_STATUS));
        return [
            'id_order' => 'required|exists:order,id',
            'order_status' => [
                'required',
                'in:' . $listOrderStatus,
                function ($attribute, $value, $fail) {
                    $statusOrder = Order::find($this->id_order)->order_status;
                    if ($statusOrder != Constant::ORDER_STATUS['pending']) {
                        $fail('Order status is not pending');
                    }
                },
            ],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'id_order' => $this->route('order'),
        ]);
    }
}
