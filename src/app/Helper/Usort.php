<?php
namespace App\Helper;
class Usort
{
    public static function sortArray($array, $order = 'asc')
    {
        uasort ( $array , function ($a, $b) use ($order) {
            if ($a == $b) {
                return 0;
            }
            if($order == 'asc') {
                return ($a < $b) ? 1 : -1;
            } else {
                return ($a > $b) ? -1 : 1;
            }
        });
        return $array;
    }

    public static function sortMultidimensionalArrays($array, $key1, $key2, $order1 = 'asc', $order2 = 'asc')
    {
        uasort ( $array , function ($a, $b) use ($key1, $key2, $order1, $order2) {
            if ($a[$key1] == $b[$key1]) {
                if($order2 == 'asc') {
                    if ($a[$key2] < $b[$key2]) {
                        return -1;
                    }
                } else {
                    if ($a[$key2] > $b[$key2]) {
                        return 1;
                    }
                }
            }
            if($order1 == 'asc'){
                return ($a[$key1] > $b[$key1]) ? -1 : 1;
            } else {
                return ($a[$key1] < $b[$key1]) ? 1 : -1;
            }
        });
        return $array;
    }
}