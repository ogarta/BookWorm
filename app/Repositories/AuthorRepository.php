<?php
namespace App\Repositories;

use App\Models\Author;

class AuthorRepository
{

    public function getAuthor()
    {
        $listAuthor = Author::all();
        return $listAuthor;
    }
}
