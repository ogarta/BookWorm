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
    } = { ...book.data };

    return (
        <div className="card">
            <div className="row">
                <div className="col-4">
                    <img src={book_cover_photo ? IMAGE[book_cover_photo] : IMAGE['Empty']} className="card-img-top" alt="book_cover_photo" />
                    <p className="text-end">By (author) <span className="fw-bold">AnnaBanks</span></p>
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">{book_title}</h5>
                        <p className="card-text">{book_description}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}