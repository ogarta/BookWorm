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
            $order = Order::create([
                'user_id' => $userId,
                'order_amount' => count($request->items_order),
                'order_date' => date('Y-m-d H:i:s'),
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
}
