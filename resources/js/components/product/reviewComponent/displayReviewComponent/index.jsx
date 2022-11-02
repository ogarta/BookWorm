import React from "react";
import ProductPageAdapter from "../../../../adapters/productPageAdapter";
import { useEffect, useState } from "react";
export default function ReviewProduct({ dataBook }) {
    const [review, setReview] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [detailRating, setDetailRating] = useState([]);
    const avgRating = dataBook.data.avg_rating_star;
    let starRating = 1;

    // useEffect(() => {
    //     const fetchDataReview = async () => {
    //         const response = await ProductPageAdapter.getReview(dataBook.data.id);
    //         setReview(response.data);
    //     }
    //     fetchDataReview();
    // }, []);

    useEffect(() => {
        const fetchSumEachRating = async () => {
            const response = await ProductPageAdapter.getSumEachRating(dataBook.data.id);
            setDetailRating(response.data.data);
        }
        fetchSumEachRating();
    }, []);

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await ProductPageAdapter.postReview(dataBook.data.id, rating, comment);
        setReview(response.data);
    }

    const handleSelect = (e) => {
        console.log(e);
    }
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Customer Reviews <span>(filtered by )</span></h5>
                </div>
                <div className="card-body">
                    <h2>{Number(avgRating).toFixed(1)} Star</h2>
                    <label className="me-3">({dataBook.data.count_review})</label>

                    {
                        detailRating && detailRating.map((item, index) => (
                            <label className="me-3 " key={index} onClick={() => handleSelect(item.rating_start)}><ins>{item.rating_start} star ({item.count_rating_star})</ins></label>
                        ))}

                </div>
            </div >
        </>
    );
}
