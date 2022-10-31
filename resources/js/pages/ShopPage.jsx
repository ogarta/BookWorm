import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/shopPage.scss';
import FilterComponent from "../components/shop/fillterComponent/index"
import PaginatesComponent from '../components/shop/paginatesComponent';
import { setSort, setNumItemsPage } from '../reducers/filterReducer';

export default function ShopPage() {
    const dispatch = useDispatch();
    const params = useSelector(state => state.filterReducer.filter);
    const paginate = useSelector(state => state.filterReducer.pagination);

    const handleSelectNumItemPage = (e) => {
        dispatch(setNumItemsPage(e));
    }

    const handleSelectSort = (e) => {
        dispatch(setSort(e));
    }

    const handleFilteredBy = () => {
        const filteredBy = useSelector(state => state.filterReducer.filterDetail);
        return (filteredBy.category_name ? ('Category: ' + filteredBy.category_name) : '') +
            (filteredBy.author_name ? (' | Author: ' + filteredBy.author_name) : '') +
            (filteredBy.star ? (' | Star: ' + filteredBy.star) : '');
    }

    return (
        <div className="container">
            <h2>Books <span className='filtered-by'>(Filltered by {handleFilteredBy()})</span></h2>
            <hr></hr>
            <div className="row">
                <div className='col-3'>
                    <p>Filter by</p>
                    <section id="filter">
                        <FilterComponent />
                    </section>
                </div>
                <div className='col-9'>
                    <div className='row'>
                        <div className='col-6'>
                            <section >
                                <p>Showing {paginate.from} - {paginate.to} of {paginate.total} books</p>
                            </section>
                        </div>
                        <div className='col-6 d-flex justify-content-end'>
                            <section id="sort" className='me-4'>
                                <DropdownButton
                                    drop='down'
                                    variant="secondary"
                                    title={`Sort by ${params.sort}`}
                                    autoClose="inside"
                                    onSelect={handleSelectSort}
                                >
                                    <Dropdown.Item eventKey="on_sale">On Sale</Dropdown.Item>
                                    <Dropdown.Item eventKey="popularity">Popularity</Dropdown.Item>
                                    <Dropdown.Item eventKey="price_low_to_high">Price: Low to High</Dropdown.Item>
                                    <Dropdown.Item eventKey="price_high_to_low">Price: High to Low</Dropdown.Item>
                                </DropdownButton>
                            </section>

                            <section id="item-page">
                                <DropdownButton
                                    drop='down'
                                    variant="secondary"
                                    title={`Show ${params.num_item}`}
                                    autoClose="inside"
                                    onSelect={handleSelectNumItemPage}
                                >
                                    <Dropdown.Item eventKey="5">5</Dropdown.Item>
                                    <Dropdown.Item eventKey="10">10</Dropdown.Item>
                                    <Dropdown.Item eventKey="15">15</Dropdown.Item>
                                    <Dropdown.Item eventKey="20">20</Dropdown.Item>
                                </DropdownButton>
                            </section>
                        </div>
                    </div>

                    <section id="list-book">
                        <div className="row">
                            <PaginatesComponent />
                        </div>
                    </section>
                </div >

            </div>
        </div >

    );
}