<?php

namespace App\Services\Reciver;

use App\Services\ServiceInterface;

interface ReciverServiceInterface extends ServiceInterface
{
    public function getListReciver();
    public function createReciver($request);
    public function getReciverDefault();
}
