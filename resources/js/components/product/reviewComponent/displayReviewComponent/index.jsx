import React from "react";
import ProductPageApi from "../../../../api/productPageApi";
import { useEffect, useState } from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import PaginatesReviewComponent from "./PaginatesReviewComponent";
import "./style.scss";

export default function ReviewProduct({ dataBook }) {
    const [rating, setRating] = useState("");
    const [detailRating, setDetailRating] = useState([]);
    const avgRating = dataBook.avg_rating_star;
    const [sort, setSort] = useState("asc");
    const [itemsPage, setItemsPage] = useState(15);
    const [ReviewProduct, setReviewProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState({});

    useEffect(() => {
        const fetchDataReview = async () => {
            try {
                const response = await ProductPageApi.getReview({
                    id: dataBook.id,
                    rating_star: rating,
                    num_item: itemsPage,
                    sort: sort,
                    page: page,
                });
                setPaginate(response.pagination);
                setReviewProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataReview();
    }, [rating, itemsPage, sort, page]);

    useEffect(() => {
        const fetchSumEachRating = async () => {
            const response = await ProductPageApi.getSumEachRating(dataBook.id);
            setDetailRating(response.data);
        };
        fetchSumEachRating();
    }, []);

    const handleSelectRating = (e) => {
        setPage(1);
        setRating(e === rating ? "" : e);
    };

    const handleSelectSort = (e) => {
        setPage(1);
        setSort(e === "newest_to_oldest" ? "desc" : "asc");
    };

    const handleSelectNumItemPage = (e) => {
        setPage(1);
        setItemsPage(e);
    };

    if (ReviewProduct.length == 0) {
        return (
            <Card>
                <Card.Body>
                    <h3 className="d-flex justify-content-center">
                        There are no reviews yet.
                    </h3>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h5>
                        Customer Reviews{" "}
                        <span>
                            {rating !== ""
                                ? "(filtered by " + rating + " star)"
                                : ""}
                        </span>
                    </h5>
                    <h2>{Number(avgRating).toFixed(1)} Star</h2>
                    <label className="me-3 text-decoration-underline">
                        ({dataBook.count_review})
                    </label>

                    {detailRating &&
                        detailRating.map((item, index) => {
                            return item.count_rating_star > 0 ? (
                                <label
                                    className="me-2 "
                                    key={index}
                                    onClick={() =>
                                        handleSelectRating(item.rating_start)
                                    }
                                >
                                    {item.rating_start == "5" ? "" : "| "}
                                    <ins>
                                        {item.rating_start} star (
                                        {item.count_rating_star})
                                    </ins>
                                </label>
                            ) : (
                                <label className="me-2" key={index}>
                                    {item.rating_start == "5" ? "" : "| "}
                                    <span className="text-decoration-underline">
                                        {item.rating_start} star (
                                        {item.count_rating_star})
                                    </span>
                                </label>
                            );
                        })}
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                Showing {paginate.from}-{paginate.to} of{" "}
                                {paginate.total} reviews
                            </p>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-end">
                                <div className="col-6 d-flex justify-content-end">
                                    <section id="sort" className="me-4">
                                        <DropdownButton
                                            drop="down"
                                            variant="secondary"
                                            title={`Sort by date ${
                                                sort === "desc"
                                                    ? "newwest to oldest"
                                                    : "oldest to newwest"
                                            }`}
                                            autoClose="inside"
                                            onSelect={(e) =>
                                                handleSelectSort(e)
                                            }
                                        >
                                            <Dropdown.Item eventKey="newest_to_oldest">
                                                Sort by date: newest to oldest
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="oldest_to_newest">
                                                Sort by date: oldest to newest
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </section>

                                    <section id="item-page">
                                        <DropdownButton
                                            drop="down"
                                            variant="secondary"
                                            title={`Show ${itemsPage}`}
                                            autoClose="inside"
                                            onSelect={(e) =>
                                                handleSelectNumItemPage(e)
                                            }
                                        >
                                            <Dropdown.Item eventKey="5">
                                                5
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="10">
                                                10
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="15">
                                                15
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="20">
                                                20
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div>
                            <PaginatesReviewComponent
                                dataBook={[paginate, ReviewProduct]}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}
