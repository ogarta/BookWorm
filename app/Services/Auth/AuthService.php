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
        $this->authRepository = $authRepository;
    }
}
