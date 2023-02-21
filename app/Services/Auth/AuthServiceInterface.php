<?php

namespace App\Services\Auth;

use App\Services\ServiceInterface;

interface AuthServiceInterface extends ServiceInterface
{
    public function loginUser($email, $password);
    public function logoutUser();
}
