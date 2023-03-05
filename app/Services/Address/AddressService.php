<?php

namespace App\Services\Address;

use App\Services\Service;
use App\Repositories\Address\AddressRepository;
use App\Services\Address\AddressServiceInterface;

class AddressService extends Service implements AddressServiceInterface
{
    protected $addressRepository;
    public function __construct(AddressRepository $addressRepository)
    {
        parent::__construct($addressRepository);
        $this->addressRepository = $addressRepository;
    }

    public function createAddress($request)
    {
        $data = $request->all();
        $data['user_id'] = auth()->user()->id;
        $address = $this->addressRepository->create($data);
        if ($address){
            return response()->json([
                'message' => 'Address created successfully',
                'data' => $address
        ], 200);
        }
        return response()->json(['message' => 'Address not created'], 400);
    }

    public function updateAddress($request, $id)
    {
        $request->request->remove('id_address');
        $data = $request->all();
        $address = $this->addressRepository->update($id,$data);
        return $address;
    }
}
