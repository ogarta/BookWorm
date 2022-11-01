import React from 'react';
import { Link } from 'react-router-dom';
import CarouselListDiscount from '../components/home/carouselComponent/index';
import '../../css/homePage.scss';
import Feature from '../components/home/featureComponent/index';

function HomePage() {

    return (
        <>
            <div className="container mt-3">
                <section id="on-sale">
                    <div className="row">
                        <div className="col-11">
                            <h3>On Sale</h3>
                        </div>
                        <div className="col-1" >
                            <Link to={'/shop'}>
                                <button type="button" className="btn btn-secondary btn-view-all">
                                    View All <i className="fa fa-caret-right"></i>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="on-sale-carousel">
                        <CarouselListDiscount />
                    </div>
                </section>
                <section id="feature">
                    <Feature />
                </section>
            </div>

        </>
    );
}

export default HomePage;