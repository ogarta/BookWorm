<?php

namespace App\Services\Auth;

use App\Services\ServiceInterface;

interface AuthServiceInterface extends ServiceInterface
{
    public function loginUser($email, $password);
    public function logoutUser();
    public function signUpUser($request);
    public function getUser();
    public function editPassword($request);
}
