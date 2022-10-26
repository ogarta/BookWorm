<?php

namespace Tests\Feature\Home;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Discount;
use Carbon\Carbon;
use Faker\Factory;

class GetListTopDiscountTest extends TestCase
{

    /** @test */
    public function test_list_book_null()
    {
        $response = $this->getJson(route('home.top-discount'));

        $response->assertStatus(404);
    }

    /** @test */
    public function test_discount_expired_books()
    {
        $authors = Author::factory()->count(4)->create();
        $categories = Category::factory()->count(3)->create();

        $dateOutOf = Carbon::now()->add($this->faker->randomElement([
            '-1 week',
            '+2 months',
        ]));
        $startDateOutOf = $dateOutOf->toDateString();
        $endDateOutOf = $dateOutOf->add($this->faker->randomElement([
            '-2 months',
            '-3 months',
        ]))->toDateString();
        

        $faker = Factory::create();
        foreach ($categories as $category) {
            foreach ($authors as $author) {
                $booksDiscount = Book::factory()
                    ->count(5)
                    ->create([
                        'category_id' => $category->id,
                        'author_id' => $author->id,
                    ]);
                foreach ($booksDiscount as $book) {
                    $percentage = $faker->randomElement([0, 25, 50, 75]);
                    $discount = Discount::factory([
                        'discount_start_date' => $startDateOutOf,
                        'discount_end_date' => $endDateOutOf
                    ]);
                    if ($percentage) {

                        $discount->create([
                            'discount_price' => number_format($book->book_price * $percentage / 100, 2),
                            'book_id' => $book->id
                        ]);
                    } else {
                        $discount->create(['book_id' => $book->id]);
                    }
                }
            }
        }

        $response = $this->getJson(route('home.top-discount'));

        $response->assertStatus(404);
    }
}
