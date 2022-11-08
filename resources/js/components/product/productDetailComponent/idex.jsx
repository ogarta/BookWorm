import React from "react";
import IMAGE from '../../../../assets/index';
import './style.scss';

export default function CardProduct(props) {
    const book = props.dataBook;

    const {
        id,
        book_title,
        book_price,
        book_cover_photo,
        book_description,
        author_name,
        category_name,
        count_review,
        avg_rating_star,
        final_price,
        sub_price,
        discount_price,
    } = book;

    return (
        <div className="card pb-2">
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-lg-4 col-xl-4">
                    <img src={book_cover_photo ? IMAGE[book_cover_photo] : IMAGE['Empty']} className="card-img-top" alt="book_cover_photo" />
                    <p className="text-end m-0">By (author) <span className="fw-bold">AnnaBanks</span></p>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-8 col-xl-8">
                    <div className="card-body">
                        <h5 className="card-title m-0">{book_title}</h5>
                        <p className="card-text">{book_description}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}