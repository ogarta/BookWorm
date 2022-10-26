<?php

namespace Tests\Feature\Home;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Review;
use Carbon\Carbon;
use Faker\Factory;
use App\Helper\Usort;

class GetListTopPopularTest extends TestCase
{
    /** @test */
    public function test_list_book_dont_have_popular()
    {
        $author = Author::factory()->create();
        $category = Category::factory()->create();

        // fake data date 
        $date= Carbon::now()->add('-2 months');
        $startDate = $date->toDateString();
        $endDate = null;
        
        // fake data books
        $booksPopular= Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
        ]);

        $response = $this->getJson(route('home.top-popular'));

        $response->assertStatus(404);
    }

    /** @test */
    public function test_sort_popular_by_most_sum_review()
    {
        // fake data author and category
        $author = Author::factory()->create();
        $category = Category::factory()->create();
        
        // fake data books
        $faker = Factory::create();

        $booksPopular = Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
            ]); 
        $arrSumReviewOfBook = array();
        foreach ($booksPopular as $book) {
            $reviews = Review::factory()->count($book->id)
                ->create([
                    'book_id' => $book->id,
                ]);
            $arrSumReviewOfBook[$book->id] = $book->id;
        }

        $arrSumReviewOfBook = Usort::sortArray($arrSumReviewOfBook, 'desc');

        
        $listIdBookPopular =[];
        foreach($arrSumReviewOfBook as $key => $value) {
            $listIdBookPopular[] = $key;
        }

        $response = $this->getJson(route('home.top-popular'));

        $response->assertStatus(200);

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
                    'id' => $listIdBookPopular[0],
                ],
                [
                    'id' => $listIdBookPopular[1],
                ],
                [
                    'id' => $listIdBookPopular[2],
                ],
                [
                    'id' => $listIdBookPopular[3],
                ],
                [
                    'id' => $listIdBookPopular[4],
                ],
                [
                    'id' => $listIdBookPopular[5],
                ],
                [
                    'id' => $listIdBookPopular[6],
                ],
                [
                    'id' => $listIdBookPopular[7],
                ],
            ],
        ]);

    }

    public function test_sort_popular_by_most_sum_review_and_lowest_final_price_have_discount()
    {
        $author = Author::factory()->create();
        $category = Category::factory()->create();
        $faker = Factory::create();
        // fake data date 
        $date= Carbon::now()->add('-2 months');
        $startDate = $date->toDateString();
        $endDate = null;
        
        // fake data books
        $booksPopular = Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
        ]);
        $percentage = 0;
        $arrSumReviewOfBook = array();
        foreach ($booksPopular as $book) {
            $discount = Discount::factory([
                'discount_start_date' => $startDate,
                'discount_end_date' => $endDate
            ]);
            $percentage+= 10;
            $discount->create([
                'discount_price' => number_format($book->book_price * $percentage / 100, 2),
                'book_id' => $book->id
            ]);            
            $reviews = Review::factory()->count($faker->numberBetween(1, 10))
                ->create([
                    'book_id' => $book->id,
                ]);

            $arrSumReviewOfBook[$book->id] = [
                'sum_review'=>count($reviews), 
                'final_price'=>number_format($book->book_price * $percentage / 100, 2)
                ];
        }

        $arrSumReviewOfBook = Usort::sortMultidimensionalArrays($arrSumReviewOfBook, 'sum_review','final_price', 'desc', 'asc');

        $listIdBookPopular =[];
        foreach($arrSumReviewOfBook as $key => $value) {
            $listIdBookPopular[] = $key;
        }

        $response = $this->getJson(route('home.top-popular'));

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
                    'id' => $listIdBookPopular[0],
                ],
                [
                    'id' => $listIdBookPopular[1],
                ],
                [
                    'id' => $listIdBookPopular[2],
                ],
                [
                    'id' => $listIdBookPopular[3],
                ],
                [
                    'id' => $listIdBookPopular[4],
                ],
                [
                    'id' => $listIdBookPopular[5],
                ],
                [
                    'id' => $listIdBookPopular[6],
                ],
                [
                    'id' => $listIdBookPopular[7],
                ],
            ],
        ]);
    }

    public function test_sort_popular_by_most_sum_review_and_lowest_final_price_dont_have_discount()
    {
        $author = Author::factory()->create();
        $category = Category::factory()->create();
        $faker = Factory::create();
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
        $booksPopular = Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
        ]);
        $percentage = 0;
        $arrSumReviewOfBook = array();
        foreach ($booksPopular as $book) {
            $discount = Discount::factory([
                'discount_start_date' => $startDateOutOf,
                'discount_end_date' => $endDateOutOf
            ]);
            $percentage+= 10;
            $discount->create([
                'discount_price' => number_format($book->book_price * $percentage / 100, 2),
                'book_id' => $book->id
            ]);            
            $reviews = Review::factory()->count($faker->numberBetween(1, 10))
                ->create([
                    'book_id' => $book->id,
                ]);

            $arrSumReviewOfBook[$book->id] = [
                'sum_review'=>count($reviews), 
                'final_price'=>100
                ];
        }

        $arrSumReviewOfBook = Usort::sortMultidimensionalArrays($arrSumReviewOfBook, 'sum_review','final_price', 'desc', 'asc');
        // dd($arrSumReviewOfBook);

        $listSumReviewBookPopular =[];
        foreach($arrSumReviewOfBook as $key => $value) {
            $listSumReviewBookPopular[] = $value['sum_review'];
        }

        $response = $this->getJson(route('home.top-popular'));

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
                    'count_review' => $listSumReviewBookPopular[0],
                ],
                [
                    'count_review' => $listSumReviewBookPopular[1],
                ],
                [
                    'count_review' => $listSumReviewBookPopular[2],
                ],
                [
                    'count_review' => $listSumReviewBookPopular[3],
                ],
                [
                    'count_review' => $listSumReviewBookPopular[4],
                ],
                [
                    'count_review' => $listSumReviewBookPopular[5],
                ],
                [
                    'count_review' => $listSumReviewBookPopular[6],
                ],
                [
                    'count_review' => $listSumReviewBookPopular[7],
                ],
            ],
        ]);
    }
}
