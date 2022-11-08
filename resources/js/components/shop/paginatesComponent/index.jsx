import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopApi from "../../../adapters/shopPageAdapter";
import ReactPaginate from 'react-paginate';
import ItemCardComponent from "../../bookCard";
import { setPagination, setPage } from "../../../reducers/filterReducer";
import IMAGE from "../../../../assets";
import './style.scss';

export default function PaginatesComponent() {
    const dispatch = useDispatch();
    const [listBookFilterAndSort, setListBookFilterAndSort] = useState([]);
    const params = useSelector(state => state.filterReducer.filter);
    const paggination = useSelector(state => state.filterReducer.pagination);

    useEffect(() => {
        const fetchListBookByFilterAndSort = async () => {
            try {
                const response = await shopApi.getListBookByFilterAndSort(params);
                setListBookFilterAndSort(response.data);
                dispatch(setPagination({
                    total: response.meta.total,
                    per_page: response.meta.per_page,
                    current_page: response.meta.current_page,
                    last_page: response.meta.last_page,
                    from: response.meta.from,
                    to: response.meta.to,
                }));
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } catch (error) {
                console.log(error.response.data);
            }
        }
        fetchListBookByFilterAndSort();
    }, [params]);

    const handlePageClick = (data) => {
        dispatch(setPage(data.selected + 1));
    }

    if (listBookFilterAndSort.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            <img src={IMAGE.EmptyListBook} alt="EmptyListBook" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="row">
                {listBookFilterAndSort?.map((item, index) => (
                    <div className="col-item-shop col-xs-6 col-sm-6 col-lg-4 col-xl-3 mb-2 d-flex justify-content-center p-0" key={index}>
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
                    nextLabel="Next"
                    forcePage={paggination.current_page - 1}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={paggination.last_page}
                    previousLabel="Previous"
                    renderOnZeroPageCount={null}
                />
            </div>

        </>
    );
}

