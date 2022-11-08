import React, { useEffect, useState } from "react";
import CardProduct from "../components/product/productDetailComponent/idex";
import ReviewProduct from "../components/product/reviewComponent/displayReviewComponent/index";
import ProductPageAdapter from "../adapters/productPageAdapter";
import { useParams } from "react-router-dom";
import AddReviewComponen from "../components/product/reviewComponent/addRevewComponent";
import AddCartComponent from "../components/product/addCartComponent";
import { capitalizeFistLeter } from "../utils/captislize";
import '../../css/productPage.scss';
import { Container } from "react-bootstrap";

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

    if (Object.keys(book).length === 0) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Container className="container-procuduct">

                <h3 className="mt-3" id="title-product">{capitalizeFistLeter(book.category_name)}</h3>
                <hr />
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-8 col-xl-8 mb-2">
                        <CardProduct dataBook={book} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-4 col-xl-4 mb-2">
                        <AddCartComponent dataBook={book} />
                    </div>

                </div>
                <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-lg-8 col-xl-8 mb-2">
                        <ReviewProduct dataBook={book} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-lg-4 col-xl-4 mb-2">
                        <AddReviewComponen dataBook={book} />
                    </div>

                </div>

            </Container>


        </>
    );


}