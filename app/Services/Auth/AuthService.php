<?php

namespace App\Services\Auth;

use App\Services\Service;
use App\Repositories\Auth\AuthRepository;
use App\Services\Auth\AuthServiceInterface;

class AuthService extends Service implements AuthServiceInterface
{

    protected $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        parent::__construct($authRepository);
        $this->authRepository = $authRepository;
    }

    public function loginUser($email, $password)
    {
        return $this->authRepository->loginUser($email, $password);
    }

    public function logoutUser()
    {
        return $this->authRepository->logoutUser();
    }
}
