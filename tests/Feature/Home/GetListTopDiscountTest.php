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
        // fake data author and category
        $authors = Author::factory()->count(4)->create();
        $categories = Category::factory()->count(3)->create();

        // fake data date expired
        $dateOutOf = Carbon::now()->add($this->faker->randomElement([
            '-1 week',
            '+2 months',
        ]));
        $startDateOutOf = $dateOutOf->toDateString();
        $endDateOutOf = $dateOutOf->add($this->faker->randomElement([
            '-2 months',
            '-3 months',
        ]))->toDateString();
        
        // fake data books
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

    public function test_sort_discount_books(){
        $author = Author::factory()->create();
        $category = Category::factory()->create();

        // fake data date 
        $date= Carbon::now()->add('-2 months');
        $startDate = $date->toDateString();
        $endDate = null;
        
        // fake data books
        $booksDiscount = Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
        ]);
        $percentage = 0;
        foreach ($booksDiscount as $book) {
            $discount = Discount::factory([
                'discount_start_date' => $startDate,
                'discount_end_date' => $endDate
            ]);
            $percentage+= 10;
            if ($percentage) {

                $discount->create([
                    'discount_price' => number_format($book->book_price * $percentage / 100, 2),
                    'book_id' => $book->id
                ]);
            } else {
                $discount->create(['book_id' => $book->id]);
            }
        }

        $response = $this->getJson(route('home.top-discount'));

        // check status response
        $response->assertStatus(200);

        // check structure json response
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'book_title',
                    'book_price',
                    'book_cover_photo',
                    'book_description',
                    'author_name',
                    'category_name',
                    'count_review',
                    'avg_rating_star',
                    'final_price',
                    'sub_price',
                    'discount_price',
                ],
            ],
        ]);

        // check data response
        $response->assertJson([
            'data' => [
                [
                    'id' => $booksDiscount[9]->id,
                ],
                [
                    'id' => $booksDiscount[8]->id,
                ],
                [
                    'id' => $booksDiscount[7]->id,
                ],
                [
                    'id' => $booksDiscount[6]->id,
                ],
                [
                    'id' => $booksDiscount[5]->id,
                ],
                [
                    'id' => $booksDiscount[4]->id,
                ],
                [
                    'id' => $booksDiscount[3]->id,
                ],
                [
                    'id' => $booksDiscount[2]->id,
                ],
                [
                    'id' => $booksDiscount[1]->id,
                ],
                [
                    'id' => $booksDiscount[0]->id,
                ],
            ],
        ]);
    }

}
