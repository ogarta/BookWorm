<?php

namespace App\Repositories\Address;

use App\Models\Address;
use App\Repositories\BaseRepository;
use App\Repositories\Address\AddressRepositoryInterface;

class AddressRepository extends BaseRepository implements AddressRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return Address::class;
    }

    public function all()
    {
        $listAddress = $this->model->where('user_id', auth()->user()->id)->get();
        return $listAddress;
    }

    public function updateDefaulse($id, $attributes = [])
    {
        $result = $this->model->where('user_id', $id)->update($attributes);
        return $result;
    }
}
