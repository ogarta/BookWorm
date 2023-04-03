<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Services\Auth\AuthServiceInterface;
use GuzzleHttp\Psr7\Request;

class AuthController extends Controller
{
    private $authServiceInterface;

	public function __construct(AuthServiceInterface $authServiceInterface)
	{
		$this->authServiceInterface = $authServiceInterface;
	}

    public function login(LoginRequest $request){
        return $this->authServiceInterface->loginUser($request->email, $request->password);
    }

    public function logout(){
        return $this->authServiceInterface->logoutUser();
    }

    public function signUp(SignUpRequest $request){
        return $this->authServiceInterface->signUpUser($request);
    }

    public function user(){
        return $this->authServiceInterface->getUser();
    }

    public function editPassword(UpdatePasswordRequest $request){
        return $this->authServiceInterface->editPassword($request);
    }
}
