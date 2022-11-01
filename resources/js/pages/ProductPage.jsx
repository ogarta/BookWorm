import React, { useEffect, useState } from "react";
import CardProduct from "../components/product/productDetailComponent/idex";
import ProductPageAdapter from "../adapters/productPageAdapter";
import { useParams } from "react-router-dom";

export default function ProductPage() {
    let { id } = useParams()
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchDataBook = async () => {
            const response = await ProductPageAdapter.getProductDetail(id);
            setBook(response.data);
        }
        fetchDataBook();
    }, []);

    return (
        <>
            <div className="container">
                <h3 className="mt-3">Category Name</h3>
                <hr />
                <div className="row">
                    <div className="col-8">
                        <CardProduct dataBook={book} />
                    </div>
                    <div className="col-4">
                    </div>
                </div>
            </div>


        </>
    );
}