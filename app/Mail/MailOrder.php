<?php

namespace App\Mail;

use App\Helper\Constant;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class MailOrder extends Mailable
{
    use Queueable, SerializesModels;

    public $detals;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct( $detals)
    {
        $this->detals = $detals;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Mail Order',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'mail',
            with: [
                'nameCustomer'=> $this->detals['customer']->first_name . ' ' . $this->detals['customer']->last_name,
                'orderAmount'=> $this->detals['order']->order_amount,
                'orderDate'=> $this->detals['order']->order_date,
                'orderPayment'=> $this->detals['order']->payment_method == Constant::PAYMENT_METHOD_SHIP ? 'At the Store' : 'COD',
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
