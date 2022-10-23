<?php

namespace Tests\Feature\Home;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetListTopDiscountTest extends TestCase
{
    /** @test */
    public function test_can_get_list_top_discount_book()
    {

        $response = $this->getJson('/api/product/book/1');

        $response->assertStatus(404);
    }
}
