<?php

namespace App\Services;

use App\Services\ServiceInterface;

class Service implements ServiceInterface
{
    protected $repository;

    public function __construct($repository)
    {
        $this->repository = $repository;
    }

    public function all()
    {
        return $this->repository->getAll();
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function update(array $data, $id)
    {
        $record = $this->repository->find($id);
        return $record->update($data);
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }

    public function show($id)
    {
        return $this->repository->find($id);
    }
}
