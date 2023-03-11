<?php

namespace App\Repositories\Order;

use App\Models\Book;
use App\Models\Order;
use App\Models\ItemOrder;
use Illuminate\Support\Facades\DB;
use App\Repositories\BaseRepository;
use App\Repositories\Order\OrderRepositoryInterface;

class OrderRepository extends BaseRepository implements OrderRepositoryInterface
{
    protected $model;

    public function getModel()
    {
        return Order::class;
    }

    public function createOrder($request)
    {
        $userId = $request->user()->id;
        DB::beginTransaction();
        try {
            $order = $this->model->create([
                'user_id' => $userId,
                'address_id' => $request->address_id,
                'order_amount' => count($request->items_order),
                'order_date' => date('Y-m-d H:i:s'),
                'order_status' => 1,
                'payment_method' => $request->payment_method,
            ]);
            
            foreach ($request->items_order as $item) {
                ItemOrder::create([
                    'order_id' => $order->id,
                    'book_id' => $item['book_id'],
                    'quantity' => $item['quantity'],
                    'price' => Book::getFinalBookPrice($item['book_id']),
                ]);
            }
            DB::commit();
            return $order;
        } catch (\Exception$e) {
            DB::rollback();
            return $e;
        }

    }

    public function getHistoryOrder($idAuth)
    {
        return $this->model
        ->select(
            'order.id',
            'order.order_amount',
            'order.order_date',
            'order.order_status',
            'order.payment_method',
            'order.address_id')
        ->with('addressOrderDetail','itemOrder')
        ->where('user_id', $idAuth)
        ->groupBy('order.id')
        ->get();  
    }
}
