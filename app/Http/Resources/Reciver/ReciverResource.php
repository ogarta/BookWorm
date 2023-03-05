<?php

namespace App\Http\Resources\Reciver;

use App\Models\Address;
use Illuminate\Http\Resources\Json\JsonResource;

class ReciverResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address_id' => $this->address_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'address' => Address::find($this->address_id),
        ];
    }
}
