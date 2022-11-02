import React, { useEffect, useState } from "react";
import CardProduct from "../components/product/productDetailComponent/idex";
import ReviewProduct from "../components/product/reviewComponent/displayReviewComponent/index";
import ProductPageAdapter from "../adapters/productPageAdapter";
import { useParams } from "react-router-dom";

export default function ProductPage() {
    let { id } = useParams()
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchDataBook = async () => {
            const response = await ProductPageAdapter.getProductDetail(id);
            console.log(response.data.data);
            setBook(response.data);
        }
        fetchDataBook();
    }, []);

    if (Object.keys(book).length === 0) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <div className="container">

                <h3 className="mt-3">{book.data.category_name}</h3>
                <hr />
                <div className="row">
                    <div className="col-8">
                        <CardProduct dataBook={book} />
                    </div>
                    <div className="col-4">
                    </div>

                </div>
                <div className="row">
                    <div className="col-8">
                        <ReviewProduct dataBook={book} />
                    </div>
                    <div className="col-4">
                    </div>

                </div>

            </div>


        </>
    );


}