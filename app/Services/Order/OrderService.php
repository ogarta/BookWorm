<?php

namespace App\Services\Order;

use App\Services\Service;
use App\Repositories\Order\OrderRepository;
use App\Services\Order\OrderServiceInterface;

class OrderService extends Service implements OrderServiceInterface
{
    protected $orderRepository;
    public function __construct(OrderRepository $orderRepository)
    {
        parent::__construct($orderRepository);
        $this->orderRepository = $orderRepository;
    }

    public function createOrder($data)
    {
        return $this->orderRepository->createOrder($data);
    }
}
