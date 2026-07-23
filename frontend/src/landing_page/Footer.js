// ...existing code...
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="main">
            <div className="footer-inner">
                <div className="footer-col">
                    <a className="footer-brand" href="#">
                        TradeNova
                    </a>
                    <h6 className="text-muted">© 2026 TradeNova. All rights reserved.</h6>

                    <div className="social">
                        <a href="#" className="social-icon" aria-label="twitter" title="Twitter">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.92c-.64.28-1.32.48-2.04.57.73-.44 1.29-1.14 1.55-1.97-.68.4-1.44.69-2.25.85C18.7 4.2 17.56 3.6 16.3 3.6c-1.94 0-3.51 1.57-3.51 3.5 0 .27.03.54.09.8C9.7 7.7 6.7 6.1 4.5 3.7c-.3.52-.48 1.12-.48 1.76 0 1.22.62 2.3 1.56 2.93-.58-.02-1.13-.18-1.61-.45v.05c0 1.7 1.2 3.12 2.8 3.44-.29.08-.6.12-.92.12-.22 0-.43-.02-.64-.06.43 1.35 1.67 2.33 3.14 2.36-1.15.9-2.6 1.44-4.18 1.44-.27 0-.54-.02-.8-.05 1.53.98 3.34 1.55 5.28 1.55 6.34 0 9.82-5.25 9.82-9.81v-.45c.67-.48 1.25-1.08 1.71-1.77-.62.28-1.28.47-1.96.55z" /></svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="facebook" title="Facebook">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.92v-7.02H8.02v-2.9h2.28V9.41c0-2.26 1.34-3.51 3.39-3.51.98 0 2.01.18 2.01.18v2.21h-1.13c-1.12 0-1.47.69-1.47 1.4v1.67h2.5l-.4 2.9h-2.1v7.02c4.78-.79 8.44-4.93 8.44-9.92z" /></svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="linkedin" title="LinkedIn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.5H9.03V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.54v6.2zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.15.92-2.07 2.06-2.07s2.06.92 2.06 2.07c0 1.14-.92 2.07-2.06 2.07zM6.9 20.45H3.77V9h3.13v11.45z" /></svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="instagram" title="Instagram">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.5-2.7a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2zM12 10.5A1.5 1.5 0 1 1 10.5 12 1.5 1.5 0 0 1 12 10.5z" /></svg>
                        </a>
                    </div>
                </div>

                <div className="footer-col">
                    <h5>Account</h5>
                    <ul>
                        <li>Open demat account</li>
                        <li>Minor demat account</li>
                        <li>NRI demat account</li>
                        <li>HUF demat account</li>
                        <li>Commodity</li>
                        <li>Dematerialisation</li>
                        <li>Fund transfer</li>
                        <li>MTF</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h5>Company</h5>
                    <ul>
                        <li>About</li>
                        <li>Philosophy</li>
                        <li>Press &amp; media</li>
                        <li>Careers</li>
                        <li>TradeNova Cares (CSR)</li>
                        <li>TradeNova.tech</li>
                        <li>Open source</li>
                        <li>Referral program</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h5>Support</h5>
                    <ul>
                        <li>Contact us</li>
                        <li>Support portal</li>
                        <li>How to file a complaint?</li>
                        <li>Status of your complaints</li>
                        <li>Bulletin</li>
                        <li>Circular</li>
                        <li>Z-Connect blog</li>
                        <li>Downloads</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h5>Quick Links</h5>
                    <ul>
                        <li>Upcoming IPOs</li>
                        <li>Brokerage charges</li>
                        <li>Market holidays</li>
                        <li>Economic calendar</li>
                        <li>Calculators</li>
                        <li>Markets</li>
                        <li>Sectors</li>
                        <li>Gift Nifty</li>
                    </ul>
                </div>
            </div>

            <div className="footer-disclaimer">
                <p>
                    TradeNova Broking Ltd.: Member of NSE, BSE, MCX &amp; MSEI – SEBI Registration no.: INZ000031633. CDSL/NSDL: Depository services through TradeNova Broking Ltd. – SEBI Registration no.: IN-DP-431-2019. Registered Address: TradeNova Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P. Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any  pertaining to securities broking please write to complaints<a style={{ textDecoration: 'none' }} href="#">complaints@tradenova.com.</a>, for DP related queries dp<a style={{ textDecoration: 'none' }} href="#">@tradenova.com.</a>
                </p>

                <p>
                    Procedure to file a complaint on <a style={{ textDecoration: 'none' }} href="#">SEBI SCORES</a> Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.
                </p>

                <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>

                <p>
                  <a style={{ textDecoration: 'none' }} href="#">Attention investors:</a>   Stock brokers can accept securities as margins from clients only by way of pledge in the depository system. Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge.
                </p>
            </div>
        </div>
    );
}

export default Footer;
