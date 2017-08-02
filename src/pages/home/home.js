
import React from "react";
import ReactDom from "react-dom";

import Footer from "footer/footer";

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render () {

        return (
            <div className="page-home">

                <div className="section">

                    <div className="inner">

                        <div className="title">截图网址</div>

                        <div className="content content-input">

                            <input type="text"/>

                            <button className="btn">截图</button>

                        </div>

                    </div>

                </div>

                <div className="section" style={{display:"none"}}>

                    <div className="inner">

                        <img src="" alt=""/>

                    </div>

                </div>

                <Footer />

            </div>
        )

    }

}

ReactDom.render(<Home/>,document.getElementById('g-container'))