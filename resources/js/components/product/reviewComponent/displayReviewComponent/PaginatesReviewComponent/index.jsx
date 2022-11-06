import React from "react";
import ItemCardComponent from "../../../../../components/bookCard/index";
import ReactPaginate from 'react-paginate';
import ConvertDate from "../../../../../utils/convertDate";

export default function PaginatesReviewComponent({ dataBook, setPage }) {
    if (Object.keys(dataBook).length === 0) {
        return <h1>Loading...</h1>
    }
    const reviewData = dataBook[1];
    const paginate = dataBook[0];

    const handlePageClick = (data) => {
        if (isFinite(data.selected)) {
            setPage(data.selected + 1);
        }
    }

    return (
        <>
            <div>
                {reviewData?.map((item, index) => (
                    <div key={index}>
                        <p className="fw-bold">{item.review_title} <span className="fw-light"> | {item.rating_start}</span></p>
                        <p>{item.review_details}</p>
                        <p>{ConvertDate.convertDate(item.review_date)}</p>
                        <hr />
                    </div>
                ))}

            </div>
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    breakLabel="..."
                    nextLabel=">"
                    forcePage={paginate.current - 1}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={paginate.last}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}