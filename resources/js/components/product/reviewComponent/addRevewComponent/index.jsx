import React, { useEffect, useState } from "react";
import ProductPageAdapter from "../../../../adapters/productPageAdapter";
import { useForm } from "react-hook-form";

export default function AddReviewComponen({ dataBook }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if (timeLeft === 0) {
            window.location.reload();
            setTimeLeft(null)
        }
        if (!timeLeft) return;
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const onSubmit = data => {
        const postReview = async () => {
            try {
                const response = await ProductPageAdapter.addReview({
                    id: dataBook.id,
                    rating_start: data.reviewRating,
                    title: data.reviewTitle,
                    details: data.reviewDetail,
                });
                setTimeLeft(5)
            } catch (error) {
                console.log(error.response.data);
            }
        }

        postReview();
    };



    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Write a review</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <p>Add a title</p>
                            <input type="text" className="form-control" name="review_title" {...register("reviewTitle", { required: true })} />
                            {errors.reviewTitle?.type === 'required' && <p role="alert" style={{ color: "red" }}>Review title is required</p>}
                            <p>Details please! Your review helps other shoppers</p>
                            <textarea className="form-control" rows="3" name="review_detail" {...register("reviewDetail", { required: true })}></textarea>
                            {errors.reviewDetail?.type === 'required' && <p role="alert" style={{ color: "red" }}>Review detail is required</p>}
                            <label htmlFor="exampleFormControlSelect1">Rating</label>
                            <select className="form-control" id="exampleFormControlSelect1" {...register("reviewRating", { required: true })}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <p>{timeLeft !== null ? "Successful review" : ""}</p>
                            <p>{timeLeft !== null ? "Reload Page after " + timeLeft + " s" : ""}</p>
                            <button type="submit" className="btn btn-primary mt-3" >Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}