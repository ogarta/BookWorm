import { useEffect, useState } from 'react';
import Slider from "react-slick";
import homeApi from '../../../adapters/homePageAdapter';
import ItemCardComponent from '../../bookCard';

function CarouselListDiscount() {
    const [listDiscount, setListDiscount] = useState({});

    useEffect(() => {
        const fetchListBookDiscount = async () => {
            const response = await homeApi.getListTopBookDiscount();
            setListDiscount(response);
        }
        fetchListBookDiscount();
    }, []);

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", color: 'black' }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", color: 'black' }}
                onClick={onClick}
            >
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleCarouselItem = () => {
        const rows = listDiscount.data;

        return rows && rows.map((item, index) => {
            return (
                <ItemCardComponent dataBook={item} key={index} />
            );
        })
    }

    return (
        <div className="book-carousel">
            <Slider {...settings}>
                {handleCarouselItem()}
            </Slider>
        </div>

    );
}

export default CarouselListDiscount;