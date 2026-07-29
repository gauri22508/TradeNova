import React from 'react';

function CreateTicket() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8">

                </div>
                <div className="col-12 col-md-4">
                    <table className="table table-bordered  mb-0" style={{ borderCollapse: 'collapse'  , border: '1px solid #dee2e6' }}>
                        <thead >
                            <tr>
                                <th className="fs-6  py-3 ps-3 text-muted" style={{ backgroundColor: '#f5f7fa' }} scope="col">Quick links</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color:"387ed1" , fontSize:"16px" }}  href="#">1. Track account opening</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color:"387ed1" , fontSize:"16px" }}  href="#">3. Track Segment activation</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color:"387ed1" , fontSize:"16px" }}  href="#">3. Intraday margins</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color:"387ed1" , fontSize:"16px" }}  href="#">4. Kite user manual</a></td>
                            </tr>
                            <tr>
                                <td className="py-3 ps-3"><a style={{ textDecoration: 'none', lineHeight: '1.4', color:"387ed1" , fontSize:"16px" }}  href="#">5. Learn how to create a ticket</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default CreateTicket;
