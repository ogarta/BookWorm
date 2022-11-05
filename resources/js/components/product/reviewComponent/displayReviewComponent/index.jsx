import React from "react";
import ProductPageAdapter from "../../../../adapters/productPageAdapter";
import { useEffect, useState } from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import PaginatesReviewComponent from "./PaginatesReviewComponent";

export default function ReviewProduct({ dataBook }) {
    const [rating, setRating] = useState("");
    const [detailRating, setDetailRating] = useState([]);
    const avgRating = dataBook.avg_rating_star;
    const [sort, setSort] = useState('asc');
    const [itemsPage, setItemsPage] = useState(15);
    const [ReviewProduct, setReviewProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState({});

    useEffect(() => {
        const fetchDataReview = async () => {
            const response = await ProductPageAdapter.getReview({
                id: dataBook.id,
                rating_star: rating,
                num_item: itemsPage,
                sort: sort,
                page: page,

            });
            setPaginate(response.pagination);
            setReviewProduct(response.data);
        }
        fetchDataReview();
    }, [rating, itemsPage, sort, page]);

    useEffect(() => {
        const fetchSumEachRating = async () => {
            const response = await ProductPageAdapter.getSumEachRating(dataBook.id);
            setDetailRating(response.data);
        }
        fetchSumEachRating();
    }, []);

    const handleSelectRating = (e) => {
        setRating(e === rating ? '' : e);
    }

    const handleSelectSort = (e) => {
        setSort(e);
    }

    const handleSelectNumItemPage = (e) => {
        setItemsPage(e);
    }

    if (ReviewProduct.length == 0) {
        return (
            <Card>
                <Card.Body>
                    <h3 className="d-flex justify-content-center">There are no reviews yet.</h3>
                </Card.Body>
            </Card>
        )
    }

    return (
        <>
            <Card>
                <Card.Header>
                    <h5 className="card-title">Customer Reviews <span>(filtered by {rating !== "" ? (rating + " star") : ""})</span></h5>
                </Card.Header>
                <Card.Body>
                    <h2>{Number(avgRating).toFixed(1)} Star</h2>
                    <label className="me-3">({dataBook.count_review})</label>

                    {detailRating && detailRating.map((item, index) => (
                        <label className="me-3 " key={index} onClick={() => handleSelectRating(item.rating_start)}><ins>{item.rating_start} star ({item.count_rating_star})</ins></label>
                    ))}
                    <div className="row">
                        <div className="col-md-6">
                            <p>Showing {paginate.from}-{paginate.to} of {paginate.total}</p>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-end">
                                <div className='col-6 d-flex justify-content-end'>
                                    <section id="sort" className='me-4'>
                                        <DropdownButton
                                            drop='down'
                                            variant="secondary"
                                            title={`Sort by ${sort}`}
                                            autoClose="inside"
                                            onSelect={() => handleSelectSort()}
                                        >
                                            <Dropdown.Item eventKey="desc">Sort by date: newest to oldest</Dropdown.Item>
                                            <Dropdown.Item eventKey="asc">Sort by date: oldest to newest</Dropdown.Item>
                                        </DropdownButton>
                                    </section>

                                    <section id="item-page">
                                        <DropdownButton
                                            drop='down'
                                            variant="secondary"
                                            title={`Show ${itemsPage}`}
                                            autoClose="inside"
                                            onSelect={() => handleSelectNumItemPage()}
                                        >
                                            <Dropdown.Item eventKey="5">5</Dropdown.Item>
                                            <Dropdown.Item eventKey="10">10</Dropdown.Item>
                                            <Dropdown.Item eventKey="15">15</Dropdown.Item>
                                            <Dropdown.Item eventKey="20">20</Dropdown.Item>
                                        </DropdownButton>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div>
                            <PaginatesReviewComponent dataBook={[paginate, ReviewProduct]} setPage={setPage} />
                        </div>
                    </div >
                </Card.Body>
            </Card>
        </>
    );
}
