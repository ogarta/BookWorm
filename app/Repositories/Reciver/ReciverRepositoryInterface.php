<?php

namespace App\Repositories\Reciver;

use App\Repositories\RepositoryInterface;

interface ReciverRepositoryInterface extends RepositoryInterface{
    public function getListReciver();
    public function removeDefault();
    public function getReciverDefault();
}