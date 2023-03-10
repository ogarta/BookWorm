<?php
namespace App\Helper;
class Constant{
    const LIMIT_TOP_DISCOUNT = 10;
    const LIMIT_TOP_RECOMMEND = 8;
    const LIMIT_TOP_POPULAR = 8;
    const DEFAULT_ITEM_PAGE = 5;

    const ON_SALE = 'on_sale';
    const POPULARITY = 'popularity';
    const PRICE_LOW_TO_HIGH = 'price_low_to_high';
    const PRICE_HIGH_TO_LOW = 'price_high_to_low';


    const PAYMENT_METHOD_SHIP = 0;
    const PAYMENT_METHOD_AT_STORE = 1;

    const ORDER_STATUS = [
        'pending' => 1,
        'shipping' => 2,
        'delivered' => 3,
        'cancel' => 4,
        'return' => 5,
        'ready'=> 6,
    ];
}
