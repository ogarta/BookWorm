<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Http\Requests\LoginRequest;
use App\Repositories\AuthRepository;

class AuthController extends Controller
{

    private AuthRepository $authRepository;

	public function __construct(AuthRepository $authRepository)
	{
		$this->authRepository = $authRepository;
	}

    public function login(LoginRequest $request){
        return $this->authRepository->loginUser($request->email, $request->password);
    }


}
