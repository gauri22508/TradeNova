import React from 'react';

function Hero() {
    return (
        <div className="container">
            <div className="bg-white p-4 rounded shadow-sm mt-5 mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="fw-bold mb-0">Support Portal</h1>
                    <button className="btn btn-primary" type="button">My Ticket</button>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                            <input type="text" className="form-control" placeholder="Eg:How do i open my account.." aria-label="Search for help" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
