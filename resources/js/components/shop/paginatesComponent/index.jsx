import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopApi from "../../../adapters/shopPageAdapter";
import ReactPaginate from 'react-paginate';
import ItemCardComponent from "../../bookCard";
import { setPagination, setCurentPage, setPage } from "../../../reducers/filterReducer";

export default function PaginatesComponent() {
    const dispatch = useDispatch();
    const [listBookFilterAndSort, setListBookFilterAndSort] = useState({});
    const params = useSelector(state => state.filterReducer.filter);
    const paggination = useSelector(state => state.filterReducer.pagination);

    console.log(params);

    useEffect(() => {
        const fetchListBookByFilterAndSort = async () => {
            const response = await shopApi.getListBookByFilterAndSort(params);
            setListBookFilterAndSort(response);
            dispatch(setPagination({
                total: response.meta.total,
                per_page: response.meta.per_page,
                current_page: response.meta.current_page,
                last_page: response.meta.last_page,
                from: response.meta.from,
                to: response.meta.to,
            }));

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
                    initialPage={paggination.current_page - 1}
                    forcePage={paggination.current_page - 1}
                    pageCount={paggination.last_page}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>
    );
}

