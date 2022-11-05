import { useEffect, useState } from 'react';
import homeApi from '../../../adapters/homePageAdapter';
import ItemCardComponent from '../../bookCard';
import { FiPlay } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselListDiscount() {
    const [listDiscount, setListDiscount] = useState([]);

    useEffect(() => {
        const fetchListBookDiscount = async () => {
            const response = await homeApi.getListTopBookDiscount();
            setListDiscount(response.data);
        }
        fetchListBookDiscount();
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };

    return (
        <Carousel responsive={responsive}>
            {
                listDiscount && listDiscount.map((item, index) => {
                    return (
                        <div key={index} className="d-flex justify-content-center">
                            <ItemCardComponent dataBook={item} />
                        </div>

                    );
                })
            }
        </Carousel>

    );
}

export default CarouselListDiscount;