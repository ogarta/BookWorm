<?php

namespace App\Services\Author;

use App\Services\Service;
use App\Repositories\Author\AuthorRepository;
use App\Services\Author\AuthorServiceInterface;

class AuthorService extends Service implements AuthorServiceInterface
{
    protected $authorRepository;
    public function __construct(AuthorRepository $authorRepository)
    {
        $this->authorRepository = $authorRepository;
    }
}
