<?php

namespace App\Services\Reciver;

use App\Http\Resources\Reciver\ReciverResource;
use App\Services\Service;
use App\Repositories\Reciver\ReciverRepository;
use App\Services\Reciver\ReciverServiceInterface;
use Illuminate\Support\Facades\Auth;

class ReciverService extends Service implements ReciverServiceInterface
{
    protected $reciverRepository;
    public function __construct(ReciverRepository $reciverRepository)
    {
        parent::__construct($reciverRepository);
        $this->reciverRepository = $reciverRepository;
    }

    public function getListReciver()
    {
        return response()->json([
            'data' => $this->reciverRepository->getListReciver(),
        ]);
    }

    public function createReciver($request)
    {
        $idUser = Auth::user()->id;
        if ($request->is_default){
            $this->reciverRepository->removeDefault();
        }
        $data = [
            'name' => $request->name,
            'phone' => $request->phone,
            'address_id' => $request->address_id,
            'user_id' => $idUser,
            'is_default' => $request->is_default,
        ];
        return response()->json([
            'data' => new ReciverResource($this->reciverRepository->create($data)),
        ]);
    }

    public function getReciverDefault()
    {
        return response()->json([
            'data' => $this->reciverRepository->getReciverDefault(),
        ]);
    }
}
