import React from "react";

import "./footer.less";

class Footer extends React.Component {
    render () {

        let year = new Date().getFullYear();

        return (

            <div className="g-footer">

                <div className="section"> CopyRight &copy; 2016 - {year}</div>

            </div>

        )

    }
}

export default Footer;