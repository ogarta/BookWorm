import React, { useEffect, useState } from "react";
import ProductPageAdapter from "../../../../adapters/productPageAdapter";
import { useForm } from "react-hook-form";
import { Card } from "react-bootstrap";
import AlertComponent from "../../../alert";
import './style.scss';

export default function AddReviewComponen({ dataBook }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [alertParams, setAlertParams] = useState({});

    const handleHideAlert = (type) => {
        if (type == "success") {
            const timer = setTimeout(() => {
                // reload page
                window.location.reload();
            }, 5000);
            return () => clearTimeout(timer);
        }
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);
        return () => clearTimeout(timer);
    }

    const onSubmit = data => {
        const postReview = async () => {
            try {
                const response = await ProductPageAdapter.addReview({
                    id: dataBook.id,
                    rating_start: data.reviewRating,
                    title: data.reviewTitle,
                    details: data.reviewDetail,
                });
                setAlertParams({
                    type: "success",
                    title: "Add review",
                    message: "Add review successfully",
                });
                setShowAlert(true);
                handleHideAlert("success");

            } catch (error) {
                setAlertParams({
                    type: "fail",
                    title: "Add review",
                    message: "Add review failed",
                });
                setShowAlert(true);
                handleHideAlert();
            }
        }

        postReview();
    };



    return (
        <>
            <Card className="mb-3">
                <Card.Header>
                    <h5 className="title-add-review card-title">Write a review</h5>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <p>Add a title</p>
                            <input type="text" className="form-control" name="review_title" {...register("reviewTitle", { required: true, maxLength: 120 })} />
                            {errors.reviewTitle?.type === 'required' && <p role="alert" style={{ color: "red" }}>Review title is required</p>}
                            {errors.reviewTitle?.type === 'maxLength' && <p role="alert" style={{ color: "red" }}>Review title max length 120 characters</p>}
                            <p className="mt-2">Details please! Your review helps other shoppers</p>
                            <textarea className="form-control" rows="3" name="review_detail" {...register("reviewDetail")}></textarea>
                            <label htmlFor="exampleFormControlSelect1" className="my-2">Rating</label>
                            <select className="form-control" id="exampleFormControlSelect1" {...register("reviewRating", { required: true })}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <button type="submit" className="btn-sumit-add-review btn btn-secondary mt-3" >Submit Review</button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
            {showAlert ? AlertComponent(alertParams) : ''}
        </>
    );
}