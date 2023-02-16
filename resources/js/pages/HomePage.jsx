import React from "react";
import { Link } from "react-router-dom";
import CarouselListDiscount from "../components/home/carouselComponent/index";
import "../../css/homePage.scss";
import Feature from "../components/home/featureComponent/index";
import { Container } from "react-bootstrap";

function HomePage() {
    return (
        <>
            <Container className="mt-3">
                <section id="on-sale">
                    <div className="row justify-content-between p-0">
                        <div className="col-4 p-0">
                            <p id="title">On Sale</p>
                        </div>
                        <div className="col-4 align-self-center p-0">
                            <div className="d-flex justify-content-end p-0">
                                <div className="col-auto">
                                    <Link to={"/shop"}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-view-all"
                                        >
                                            <span className="text-view-all">
                                                View All
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="on-sale-carousel">
                            <CarouselListDiscount />
                        </div>
                    </div>
                </section>
                <section>
                    <Feature />
                </section>
            </Container>
        </>
    );
}

export default HomePage;
