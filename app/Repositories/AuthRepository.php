<?php
namespace App\Repositories;

use App\Models\User;
use Auth;

class AuthRepository
{

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

}
