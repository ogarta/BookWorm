import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/shopPage.scss';
import FilterComponent from "../components/shop/fillterComponent/index"
import PaginatesComponent from '../components/shop/paginatesComponent';
import { setSort, setNumItemsPage } from '../reducers/filterReducer';
import { capitalizeFistLeter } from '../utils/captislize';

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

        let filterArrary = [];

        const filteredBy = useSelector(state => state.filterReducer.filterDetail);

        for (const [key, value] of Object.entries(filteredBy)) {
            if (value) {
                filterArrary.push(capitalizeFistLeter(value));
            }
        }

        let filterString = filterArrary.join('| ');

        return filterString ? '(Filltered by ' + filterString + ")" : '';
    }

    return (
        <div className="container">
            <div className='title-box'>
                <p className='title-shop'>Books <span className='filtered-by'>{handleFilteredBy()}</span></p>
            </div>

            <hr></hr>
            <div className="row">
                <div className='col-xs-12 col-sm-12 col-lg-3 col-xl-3'>
                    <p className='mb-4' style={{ fontWeight: "700" }}>Filter by</p>
                    <section id="filter">
                        <FilterComponent />
                    </section>
                </div>
                <div className='col-xs-12 col-sm-12 col-lg-9 col-xl-9'>
                    <div className='row mb-2'>
                        <div className='col-xs-12 col-sm-12 col-lg-6 col-xl-6'>
                            <p className='show-item-page'>Showing {paginate.from} - {paginate.to} of {paginate.total} books</p>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-lg-6 col-xl-6 d-flex justify-content-end'>
                            <section id="sort" className='me-4'>
                                <DropdownButton
                                    drop='down'
                                    variant="secondary"
                                    title={`Sort by ${params.sort.replaceAll('_', ' ')}`}
                                    autoClose="inside"
                                    onSelect={handleSelectSort}
                                >
                                    <Dropdown.Item eventKey="on_sale">sort by on Sale</Dropdown.Item>
                                    <Dropdown.Item eventKey="popularity">sort by popularity</Dropdown.Item>
                                    <Dropdown.Item eventKey="price_low_to_high">sort by price: Low to High</Dropdown.Item>
                                    <Dropdown.Item eventKey="price_high_to_low">sort by price: High to Low</Dropdown.Item>
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
                                    <Dropdown.Item eventKey="15">15</Dropdown.Item>
                                    <Dropdown.Item eventKey="20">20</Dropdown.Item>
                                    <Dropdown.Item eventKey="25">25</Dropdown.Item>
                                </DropdownButton>
                            </section>
                        </div>
                    </div>

                    <section id="list-book" className='pt-4'>
                        <PaginatesComponent />
                    </section>
                </div >

            </div>
        </div >

    );
}