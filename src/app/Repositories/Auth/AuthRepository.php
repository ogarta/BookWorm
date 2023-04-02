<?php

namespace App\Repositories\Auth;

use Illuminate\Support\Facades\Auth;
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
            'phone_number' => $request->phone_number,
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

    public function editPassword($request)
    {
        $user = Auth::user();
        if (password_verify($request->old_password, $user->password)) {
            $user->password = bcrypt($request->new_password);
            $user->save();
            return response([
                'message' => 'Change password successful',
            ], 200);
        }
        return response([
            'message' => 'Incorrect old password',
        ], 401);
    }
}
