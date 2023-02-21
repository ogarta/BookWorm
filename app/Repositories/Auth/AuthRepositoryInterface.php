<?php

namespace App\Repositories\Auth;

use App\Repositories\RepositoryInterface;

interface AuthRepositoryInterface extends RepositoryInterface{
    public function loginUser($email, $password);
    public function logoutUser();
}