import { useEffect, useState } from 'react';
import homeApi from '../../../adapters/homePageAdapter';
import ItemCardComponent from '../../bookCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './style.scss';

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
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <Carousel responsive={responsive} className="bookworm__carousel py-2"
            infinite={true}>
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