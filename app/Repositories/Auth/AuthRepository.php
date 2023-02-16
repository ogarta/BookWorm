<?php

namespace App\Repositories\Auth;

use App\Models\User;
use App\Repositories\BaseRepository;
use App\Repositories\Auth\AuthRepositoryInterface;

class AuthRepository extends BaseRepository implements AuthRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return new User();
    }

    // Add your custom database methods here
}
