<?php

namespace App\Repositories\Reciver;

use App\Models\Reciver;
use App\Repositories\BaseRepository;
use App\Repositories\Reciver\ReciverRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ReciverRepository extends BaseRepository implements ReciverRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return Reciver::class;
    }

    public function getListReciver()
    {
        $idUser = Auth::user()->id;
        return $this->model->where('user_id', $idUser)->with('address')->get();
    }

    public function removeDefault()
    {
        $idUser = Auth::user()->id;
        $this->model->where('user_id', $idUser)->update(['is_default' => false]);
    }

    public function getReciverDefault()
    {
        $idUser = Auth::user()->id;
        return $this->model->where('user_id', $idUser)->where('is_default', true)->with('address')->first();
    }
}
