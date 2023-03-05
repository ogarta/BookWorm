<?php

namespace App\Services\Order;

use App\Helper\Constant;
use App\Services\Service;
use App\Repositories\Order\OrderRepository;
use App\Services\Order\OrderServiceInterface;
use App\Http\Resources\Order\HistoryOrderCollection;

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

    public function getHistoryOrder()
    {
        $idAuth = auth()->user()->id;
        return $this->orderRepository->getHistoryOrder($idAuth);
    }
}
