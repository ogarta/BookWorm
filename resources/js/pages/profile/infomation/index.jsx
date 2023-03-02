import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
    const user = useSelector((state) => state.userResducer.user);
    if (!user) {
        return <></>;
    }
    return (
        <>
            <div className="profile">
                <div className="profile__title">
                    <h2>My Account</h2>
                    <h5>Personal Information</h5>
                    <hr></hr>
                </div>
                <div className="profile__info">
                    <div
                        className="profile__info__fullname"
                        style={{ display: "flex" }}
                    >
                        <div className="profile__info__firstname">
                            <label>First Name</label>
                            <br />
                            <input
                                className="input"
                                type="text"
                                value={user.first_name}
                            />
                        </div>
                        <div
                            className="profile__info__lastname"
                            style={{ marginLeft: "20px" }}
                        >
                            <label>Last Name</label>
                            <br />
                            <input
                                className="input"
                                type="text"
                                value={user.last_name}
                            />
                        </div>
                    </div>
                    <div className="profile__address">
                        <label>Email address</label>
                        <br />
                        <input
                            className="input"
                            type="text"
                            value={user.email}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
