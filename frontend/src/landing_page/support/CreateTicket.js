import React from 'react';

function CreateTicket() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8">
                    <div className="accordion" id="accordionExampleY">
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header" id="headingOneY">
                                <button data-bs-toggle="collapse" className="accordion-button collapsed fw-bold" type="button"
                                    data-bs-target="#collapseOneY" aria-expanded="false" aria-controls="collapseOneY">
                                    <i className="fas fa-question-circle fa-sm me-2 opacity-70"></i> Account Opening
                                </button>
                            </h2>
                            <div id="collapseOneY" className="accordion-collapse collapse" aria-labelledby="headingOneY"
                                data-bs-parent="#accordionExampleY">
                                <div className="accordion-body py-3">
                                    <ul className="ps-3 pb-2">
                                        <li> <code> Resident individual</code></li>
                                        <li> <code> Minor</code></li>
                                        <li> <code> Non Resident indian(NRI)</code></li>
                                        <li> <code> Glossary</code></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header" id="headingTwoY">
                                <button data-bs-toggle="collapse" className="accordion-button collapsed fw-bold" type="button"
                                    data-bs-target="#collapseTwoY" aria-expanded="false" aria-controls="collapseTwoY">
                                    <i className="fas fa-question-circle fa-sm me-2 opacity-70"></i>  Your Zerodha Account
                                </button>
                            </h2>
                            <div id="collapseTwoY" className="accordion-collapse collapse" aria-labelledby="headingTwoY"
                                data-bs-parent="#accordionExampleY">
                                <div className="accordion-body py-3">
                                    <ul className="ps-3 pb-2">
                                        <li> <code> Your Profile</code> </li>
                                        <li> <code>Account Modification</code> </li>
                                        <li> <code>Nomination</code> </li>
                                        <li> <code>Transfer and conversion of securities</code> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header" id="headingThreeY">
                                <button data-bs-toggle="collapse" className="accordion-button collapsed fw-bold" type="button"
                                    data-bs-target="#collapseThreeY" aria-expanded="false" aria-controls="collapseThreeY">
                                    <i className="fas fa-question-circle fa-sm me-2 opacity-70"></i>  Kite
                                </button>
                            </h2>
                            <div id="collapseThreeY" className="accordion-collapse collapse" aria-labelledby="headingThreeY"
                                data-bs-parent="#accordionExampleY">
                                <div className="accordion-body py-3">
                                    <ul className="ps-3 pb-2">
                                        <li> <code> IPO</code> </li>
                                        <li> <code> Trading FAQs</code> </li>
                                        <li> <code> Charts and orders</code> </li>
                                        <li> <code> Alerts and Nudges</code> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header" id="headingFourY">
                                <button data-bs-toggle="collapse" className="accordion-button collapsed fw-bold" type="button"
                                    data-bs-target="#collapseFourY" aria-expanded="false" aria-controls="collapseFourY">
                                    <i className="fas fa-question-circle fa-sm me-2 opacity-70"></i> Funds
                                </button>
                            </h2>
                            <div id="collapseFourY" className="accordion-collapse collapse" aria-labelledby="headingFourY"
                                data-bs-parent="#accordionExampleY">
                                <div className="accordion-body py-3">
                                    <ul className="ps-3 pb-2">
                                        <li><code> Add money</code></li>
                                        <li><code>Withdraw money</code></li>
                                        <li><code>Add bank accounts</code></li>
                                        <li><code>eMandates</code></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header" id="headingFiveY">
                                <button data-bs-toggle="collapse" className="accordion-button collapsed fw-bold" type="button"
                                    data-bs-target="#collapseFiveY" aria-expanded="false" aria-controls="collapseFiveY">
                                    <i className="fas fa-question-circle fa-sm me-2 opacity-70"></i> Coin
                                </button>
                            </h2>
                            <div id="collapseFiveY" className="accordion-collapse collapse" aria-labelledby="headingFiveY"
                                data-bs-parent="#accordionExampleY">
                                <div className="accordion-body py-3">
                                    <ul className="ps-3 pb-2">
                                        <li><code> Mutual funds</code></li>
                                        <li><code>FD</code></li>
                                        <li><code>Features on coin</code></li>
                                        <li><code>General</code></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <table className="table table-bordered mb-5" style={{ borderCollapse: 'collapse', border: '1px solid #dee2e6' }}>
                        <thead>
                            <tr>
                                <th className="fs-6 py-3 ps-3 text-muted" style={{ backgroundColor: '#f5f7fa' }} scope="col">Quick links</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color: '#387ed1', fontSize: '16px' }} href="#">1. Track account opening</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color: '#387ed1', fontSize: '16px' }} href="#">2. Track Segment activation</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color: '#387ed1', fontSize: '16px' }} href="#">3. Intraday margins</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color: '#387ed1', fontSize: '16px' }} href="#">4. Kite user manual</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color: '#387ed1', fontSize: '16px' }} href="#">5. Learn how to create a ticket</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;
