<?php

namespace App\Listeners;

use App\Models\Book;
use App\Models\User;
use App\Models\Order;
use App\Mail\MailOrder;
use App\Models\Address;
use App\Models\ItemOrder;
use App\Events\OrderPayment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmailAfterOrderPayment implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrderPayment  $event
     * @return void
     */
    public function handle(OrderPayment $event)
    {   
        $detals = [
            'customer' => $event->user,
            'order' => $event->order,
        ];
        Mail::to('ogatabookworm@gmail.com')->send(new MailOrder($detals));
    }
}
