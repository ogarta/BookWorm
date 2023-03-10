<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Services\Auth\AuthService;
use GuzzleHttp\Psr7\Request;

class AuthController extends Controller
{
    private $authService;

	public function __construct(AuthService $authService)
	{
		$this->authService = $authService;
	}

    public function login(LoginRequest $request){
        return $this->authService->loginUser($request->email, $request->password);
    }

    public function logout(){
        return $this->authService->logoutUser();
    }

    public function signUp(SignUpRequest $request){
        return $this->authService->signUpUser($request);
    }

    public function user(){
        return $this->authService->getUser();
    }

    public function editPassword(UpdatePasswordRequest $request){
        return $this->authService->editPassword($request);
    }
}
