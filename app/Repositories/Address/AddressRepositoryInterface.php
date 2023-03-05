<?php

namespace App\Repositories\Address;

use App\Repositories\RepositoryInterface;

interface AddressRepositoryInterface extends RepositoryInterface{
    public function updateDefaulse($id, $attributes = []);
}