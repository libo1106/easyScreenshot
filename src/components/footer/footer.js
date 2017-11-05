import React from "react";

import "./footer.less";

class Footer extends React.Component {
    render () {

        let year = new Date().getFullYear();

        return (

            <div className="g-footer">

                <div className="section">
                    <span className="item copyright">CopyRight &copy; 2016 - {year}</span>
                    <span className="item powerby">Engine by Puppeteer</span>
                </div>

            </div>

        )

    }
}

export default Footer;