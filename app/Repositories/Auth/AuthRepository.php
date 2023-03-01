<?php

namespace App\Repositories\Auth;

use Auth;
use App\Models\User;
use App\Repositories\BaseRepository;
use App\Repositories\Auth\AuthRepositoryInterface;

class AuthRepository extends BaseRepository implements AuthRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return User::class;
    }

    public function loginUser($email, $password)
    {
        $checkLogin = Auth::attempt([
            'email' => $email,
            'password' => $password,
        ]);
        // login successful
        if ($checkLogin) {
            $user = Auth::user();
            $token = $user->createToken('API_TOKEN')->plainTextToken;
            return response(
                [
                    'message' => 'Login successful',
                    'user' => $user,
                    'token' => $token,
                ],
                200
            );
        }
        // login fail
        return response([
            'message' => 'Incorrect account or password',
        ], 401);
    }

    public function logoutUser()
    {
        return Auth::user()->tokens()->delete();
    }

    public function signUpUser($request)
    {
        $user = $this->model->create([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $token = $user->createToken('API_TOKEN')->plainTextToken;
        return response(
            [
                'message' => 'Sign up successful',
                'user' => $user,
                'token' => $token,
            ],
            200
        );
    }

    public function getUser()
    {
        return Auth::user();
    }
}
