import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopApi from "../../../adapters/shopPageAdapter";
import ReactPaginate from 'react-paginate';
import ItemCardComponent from "../../bookCard";
import { setPage } from "../../../reducers/filterReducer";

export default function PaginatesComponent() {
    const dispatch = useDispatch();
    const [listBookFilterAndSort, setListBookFilterAndSort] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const params = useSelector(state => state.filterReducer.filter);

    useEffect(() => {
        const fetchListBookByFilterAndSort = async () => {
            console.log("param", params);
            const response = await shopApi.getListBookByFilterAndSort(params);
            // console.log(response);
            setListBookFilterAndSort(response);
            setTotalPage(response.meta.last_page);
            setPageNumber(response.meta.current_page);

        }
        fetchListBookByFilterAndSort();
    }, [params]);

    const handlePageClick = (data) => {
        dispatch(setPage(data.selected + 1));
    }

    return (
        <>
            <div className="row">
                {listBookFilterAndSort.data?.map((item, index) => (
                    <div className="col-3 mb-2" key={index}>
                        <ItemCardComponent dataBook={item} />
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
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    initialPage={pageNumber - 1}
                    forcePage={pageNumber - 1}
                    pageCount={totalPage}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>
    );
}

