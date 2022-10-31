import React, { useEffect, useState } from 'react';
import '../../css/shopPage.scss';
import FilterComponent from "../components/shop/fillterComponent/index"

function HomePage() {
    const [listFilteredBy, setListFilteredBy] = useState("")

    return (
        <div className="container">
            <h2>Books <span className='filtered-by'>(Filltered by {listFilteredBy})</span></h2>
            <div className="row">
                <div className='col-3'>
                    <section id="filter">
                        <FilterComponent />

                    </section>
                </div>
                <div className='col-9'>
                    <section id="list-book">

                        <h1>ahuhu</h1>

                    </section>
                </div >

            </div>
        </div>

    );
}

export default HomePage;