import React from 'react';
import { useEffect, useState } from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import homeApi from '../../../adapters/homePageAdapter';
import ItemCardComponent from '../../bookCard';
import './index.scss';

export default function Feature() {
    const [listRecommend, setListRecommend] = useState({});
    const [listPopular, setListPopular] = useState({});
    const [statusFeature, setStatusFeature] = useState("1");
    const [listFeature, setListFeature] = useState({});

    const radios = [
        { name: 'Recommend', value: '1' },
        { name: 'Popular', value: '2' },
    ];

    useEffect(() => {
        const fetchListBookRecommend = async () => {
            const response = await homeApi.getListTopBookRecommended();
            setListRecommend(response);
        }
        const fetchListBookPopular = async () => {
            const response = await homeApi.getListTopBookPopular();
            setListPopular(response);
        }
        fetchListBookPopular();
        fetchListBookRecommend();
    }, []);

    useEffect(() => {
        setListFeature(statusFeature === "1" ? listRecommend : listPopular);
    }, [statusFeature]);

    const handleShowListBookByFeature = () => {
        const rows = listFeature.data ? listFeature.data : listRecommend.data;
        return rows && rows.map((item, index) => {
            return (
                <div className="col-lg-3 col-xl-3 my-3" key={index}>
                    <ItemCardComponent dataBook={item} />
                </div>
            );
        })
    }

    return (
        <div className="control_feature">
            <p className='text-center'>Feature Books</p>
            <div className='d-flex justify-content-center'>
                <ButtonGroup>
                    {radios.map((radio, idx) => (
                        <div key={idx} className="mx-5">
                            <ToggleButton
                                id={`radio-${idx}`}
                                type="radio"
                                variant="outline-secondary"
                                name="radio"
                                value={radio.value}
                                checked={statusFeature === radio.value}
                                onChange={(e) => setStatusFeature(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        </div>

                    ))}
                </ButtonGroup>
            </div>
            <div className="list-book-by-feature">
                <div className='row'>
                    {handleShowListBookByFeature()}
                </div>
            </div>
        </div>
    );
}