import React, { useEffect, useState } from "react";
import ProductPageAdapter from "../../../adapters/productPageAdapter";
export default function AddReviewComponen({ dataBook }) {
    const [ratingStar, setRatingStar] = useState(1);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewDetail, setReviewDetail] = useState("");

    // useEffect(() => {
    //     const fetchData = () => {
    //         console.log(dataBook.id);
    //         console.log(ratingStar);
    //         console.log(reviewTitle);
    //         console.log(reviewDetail);

    //         const response = ProductPageAdapter.addReview({
    //             id: dataBook.id,
    //             rating_start: ratingStar,
    //             title: reviewTitle,
    //             details: reviewDetail,
    //         });
    //         console.log(response);
    //     }
    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const postReview = async () => {

            const response = await ProductPageAdapter.addReview({
                id: dataBook.id,
                rating_start: ratingStar,
                title: reviewTitle,
                details: reviewDetail,
            });
            console.log(response);
        }
        postReview();

        event.target.reset();
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Write a review</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <p>Add a title</p>
                            <input type="text" className="form-control" name="review_title" onChange={e => setReviewTitle(e.target.value)} />
                            <p>Details please! Your review helps other shoppers</p>
                            <textarea className="form-control" rows="3" name="review_detail" onChange={e => setReviewDetail(e.target.value)}></textarea>
                            <label htmlFor="exampleFormControlSelect1">Rating</label>
                            <select className="form-control" id="exampleFormControlSelect1" onChange={e => setRatingStar(event.target.value)}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <button type="submit" className="btn btn-primary mt-3" >Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}