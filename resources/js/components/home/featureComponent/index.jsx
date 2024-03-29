import { isEmpty } from "lodash";
import React from "react";
import { useEffect, useState } from "react";
import { ToggleButton, ButtonGroup } from "react-bootstrap";
import homeApi from "../../../api/homePageApi";
import ItemCardComponent from "../../bookCard";
import SpinerWaiting from "../../spinerWaiting";
import "./style.scss";

export default function Feature() {
    const [listRecommend, setListRecommend] = useState({});
    const [listPopular, setListPopular] = useState({});
    const [statusFeature, setStatusFeature] = useState("1");
    const [listFeature, setListFeature] = useState({});

    const radios = [
        { name: "Recommend", value: "1" },
        { name: "Popular", value: "2" },
    ];

    useEffect(() => {
        const fetchListBookFeature = async () => {
            const response = await Promise.all([
                homeApi.getListTopBookRecommended(),
                homeApi.getListTopBookPopular(),
            ]);
            setListRecommend(response[0]);
            setListPopular(response[1]);
        };
        fetchListBookFeature();
    }, []);

    useEffect(() => {
        setListFeature(statusFeature === "1" ? listRecommend : listPopular);
    }, [statusFeature]);

    const handleShowListBookByFeature = () => {
        const rows = listFeature.data ? listFeature.data : listRecommend.data;
        return (
            rows &&
            rows.map((item, index) => {
                return (
                    <div
                        className="col-xs-12 col-sm-6 col-lg-4 col-xl-3 my-3 d-flex justify-content-center"
                        key={index}
                    >
                        <ItemCardComponent dataBook={item} />
                    </div>
                );
            })
        );
    };

    return (
        <>
            <div className="control_feature m-0">
                <p className="text-center" id="title">
                    Feature Books
                </p>
                <div className="d-flex justify-content-center">
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <div key={idx} className="mx-5">
                                <ToggleButton
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="outline-secondary"
                                    name="radio"
                                    style={{
                                        fontSize: "1.3rem",
                                        fontWeight: "bold",
                                    }}
                                    value={radio.value}
                                    checked={statusFeature === radio.value}
                                    onChange={(e) =>
                                        setStatusFeature(e.currentTarget.value)
                                    }
                                >
                                    {radio.name}
                                </ToggleButton>
                            </div>
                        ))}
                    </ButtonGroup>
                </div>
            </div>
            <div className="bookworm__feature row mt-3">
                {isEmpty(listRecommend) ? (
                    <SpinerWaiting type="grow" number={3} />
                ) : (
                    handleShowListBookByFeature()
                )}
            </div>
        </>
    );
}
