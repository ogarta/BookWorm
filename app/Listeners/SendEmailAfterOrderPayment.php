<?php

namespace App\Listeners;

use App\Models\Book;
use App\Models\Order;
use App\Mail\MailOrder;
use App\Models\Address;
use App\Models\ItemOrder;
use App\Events\OrderPayment;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Auth;

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

        Mail::to(Auth::user()->email)->send(new MailOrder());
    }
}
