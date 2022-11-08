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

class GetListBookRecommendTest extends TestCase
{

    /** @test */
    public function test_list_book_dont_have_recommend()
    {
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
        $response = $this->getJson(route('home.top-recommend'));

        $response->assertStatus(202);

        // check data response
        $response->assertJson([
            'data' => [],
        ]);
    }

    /** @test */
    public function test_sort_recommend_by_most_avg_rating_star()
    {
        // fake data author and category
        $author = Author::factory()->create();
        $category = Category::factory()->create();
        
        // fake data books
        $faker = Factory::create();

        $booksRecommend = Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
            ]); 
        $arrAvgStarOfBook = array();
        foreach ($booksRecommend as $book) {
            $reviews = Review::factory()->count($book->id)
                ->create([
                    'book_id' => $book->id,
                ]);
            $sumRatingStar = 0; 
            foreach($reviews as $review) {
                $sumRatingStar = $sumRatingStar + $review->rating_start;
            }
            $avgRatingStar = $sumRatingStar / $book->id;
            $arrAvgStarOfBook[$book->id] = $avgRatingStar;
        }

        $arrAvgStarOfBook = Usort::sortArray($arrAvgStarOfBook, 'desc');
        
        $listAvgRatingStar =[];
        foreach($arrAvgStarOfBook as $key => $value) {
            $listAvgRatingStar[] = number_format($value, 5);
        }

        $response = $this->getJson(route('home.top-recommend'));

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
                    'avg_rating_star' => $listAvgRatingStar[0],
                ],
                [
                    'avg_rating_star' => $listAvgRatingStar[1],
                ],
                [
                    'avg_rating_star' => $listAvgRatingStar[2],
                ],
                [
                    'avg_rating_star' => $listAvgRatingStar[3],
                ],
                [
                    'avg_rating_star' => $listAvgRatingStar[4],
                ],
                [
                    'avg_rating_star' => $listAvgRatingStar[5],
                ],
                [
                    'avg_rating_star' => $listAvgRatingStar[6],
                ],
                [
                    'avg_rating_star' => $listAvgRatingStar[7],
                ],
            ],
        ]);

    }
    
    public function test_sort_recommend_by_most_avg_rating_star_and_lowest_final_price_have_discount()
    {
        $author = Author::factory()->create();
        $category = Category::factory()->create();

        // fake data date 
        $date= Carbon::now()->add('-2 months');
        $startDate = $date->toDateString();
        $endDate = null;
        
        // fake data books
        $booksRecommend = Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
        ]);
        $percentage = 0;
        $arrAvgStarOfBook = array();
        foreach ($booksRecommend as $book) {
            $discount = Discount::factory([
                'discount_start_date' => $startDate,
                'discount_end_date' => $endDate
            ]);
            $percentage+= 10;
            $discount->create([
                'discount_price' => number_format($book->book_price * $percentage / 100, 2),
                'book_id' => $book->id
            ]);            
            $reviews = Review::factory()->count($book->id)
                ->create([
                    'book_id' => $book->id,
                ]);
            $sumRatingStar = 0; 
            foreach($reviews as $review) {
                $sumRatingStar = $sumRatingStar + $review->rating_start;
            }
            $avgRatingStar = $sumRatingStar / $book->id;

            $arrAvgStarOfBook[$book->id] = [
                'avg_rating_star'=>$avgRatingStar, 
                'final_price'=>number_format($book->book_price * $percentage / 100, 2)
                ];
        }

        $arrAvgStarOfBook = Usort::sortMultidimensionalArrays($arrAvgStarOfBook, 'avg_rating_star','final_price', 'desc', 'asc');

        $listIdBookRecommend =[];
        foreach($arrAvgStarOfBook as $key => $value) {
            $listIdBookRecommend[] = $key;
        }
        
        $response = $this->getJson(route('home.top-recommend'));

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
                    'id' => $listIdBookRecommend[0],
                ],
                [
                    'id' => $listIdBookRecommend[1],
                ],
                [
                    'id' => $listIdBookRecommend[2],
                ],
                [
                    'id' => $listIdBookRecommend[3],
                ],
                [
                    'id' => $listIdBookRecommend[4],
                ],
                [
                    'id' => $listIdBookRecommend[5],
                ],
                [
                    'id' => $listIdBookRecommend[6],
                ],
                [
                    'id' => $listIdBookRecommend[7],
                ],
            ],
        ]);
    }

    public function test_sort_recommend_by_most_avg_rating_star_and_lowest_final_price_dont_have_discount()
    {
        $author = Author::factory()->create();
        $category = Category::factory()->create();

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
        $booksRecommend = Book::factory()
            ->count(10)
            ->create([
                'category_id' => $category->id,
                'author_id' => $author->id,
                'book_price' => 100
        ]);
        $percentage = 0;
        $arrAvgStarOfBook = array();
        foreach ($booksRecommend as $book) {
            $discount = Discount::factory([
                'discount_start_date' => $startDateOutOf,
                'discount_end_date' => $endDateOutOf
            ]);
            $percentage+= 10;
            $discount->create([
                'discount_price' => number_format($book->book_price * $percentage / 100, 2),
                'book_id' => $book->id
            ]);            
            $reviews = Review::factory()->count($book->id)
                ->create([
                    'book_id' => $book->id,
                ]);
            $sumRatingStar = 0; 
            foreach($reviews as $review) {
                $sumRatingStar = $sumRatingStar + $review->rating_start;
            }
            $avgRatingStar = $sumRatingStar / $book->id;

            $arrAvgStarOfBook[$book->id] = [
                'avg_rating_star'=>$avgRatingStar, 
                'final_price'=>100
                ];
        }

        $arrAvgStarOfBook = Usort::sortMultidimensionalArrays($arrAvgStarOfBook, 'avg_rating_star','final_price', 'desc', 'asc');
        
        $listIdBookRecommend =[];
        foreach($arrAvgStarOfBook as $key => $value) {
            $listIdBookRecommend[] = $key;
        }

        $response = $this->getJson(route('home.top-recommend'));

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
                    'id' => $listIdBookRecommend[0],
                ],
                [
                    'id' => $listIdBookRecommend[1],
                ],
                [
                    'id' => $listIdBookRecommend[2],
                ],
                [
                    'id' => $listIdBookRecommend[3],
                ],
                [
                    'id' => $listIdBookRecommend[4],
                ],
                [
                    'id' => $listIdBookRecommend[5],
                ],
                [
                    'id' => $listIdBookRecommend[6],
                ],
                [
                    'id' => $listIdBookRecommend[7],
                ],
            ],
        ]);
    }
}
