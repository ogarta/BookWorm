<?php

namespace App\Services\Books;

use App\Repositories\Book\BookRepository;
use App\Services\Service;
use App\Services\Books\BookServiceInterface;

class BookService extends Service implements BookServiceInterface
{
    protected $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        parent::__construct($bookRepository);
        $this->bookRepository = $bookRepository;
    }

    public function getTopDiscount()
    {
        return $this->bookRepository->getTopDiscount();
    }

    public function getTopRecommend()
    {
        return $this->bookRepository->getTopRecommend();
    }

    public function getTopPopular()
    {
        return $this->bookRepository->getTopPopular();
    }

    public function detailBook($id = null)
    {
        return $this->bookRepository->detailBook($id);
    }
}