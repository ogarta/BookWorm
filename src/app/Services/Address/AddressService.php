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
        $listAddress = $this->addressRepository->all();
        $data['user_id'] = auth()->user()->id;
        if (count($listAddress) == 0){
            $data['default'] = 1;
        }else {
            if ($data['default'] == 1){
                $this->addressRepository->updateDefaultAddress($data['user_id']);
            }
        }
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
        $data['user_id'] = auth()->user()->id;
        if ($data['default'] == 1){
            $this->addressRepository->updateDefaultAddress($data['user_id']);
        }
        $address = $this->addressRepository->update($id,$data);
        return $address;
    }

    public function deleteAddress($id)
    {
        $address = $this->addressRepository->find($id);
        if ($address->default == 1){
            return ['message' => 'Address default not delete'];
        }
        $address = $this->addressRepository->delete($id);
        return $address;
    }
}
