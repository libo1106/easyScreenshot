import './home.less';
import React from "react";
import ReactDom from "react-dom";

import Footer from "footer/footer";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            screenshot: '',
            fetching: true,
            message: '',
        }
    }

    render () {

        let handlerSubmit = this._onSubmit.bind(this);
        let handlerChange = this._onChange.bind(this);
        let handlerLoad = this._onLoadImg.bind(this);
        let handlerError = this._onErrorImg.bind(this);

        let { screenshot, message } = this.state;

        return (
            <div className="page-home">

                <div className="section">

                    <div className="inner">

                        <div className="title">截图网址</div>

                        <div className="content content-input">

                            <form onSubmit={handlerSubmit}>

                                <div className="row">

                                    <div className="col col-8">
                                        <input name="url" type="text" onChange={handlerChange}/>
                                    </div>

                                    <div className="col col-2">
                                        <button className="btn" type="submit">截图</button>
                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

                { message !== '' ?
                    (
                        <div className="section">
                            <p>{message}</p>
                        </div>
                    )
                    : null
                }

                { screenshot !== '' ?
                    (
                        <div className="section">

                            <div className="inner">

                                <img className="img-screenshot" src={screenshot} onLoad={handlerLoad} onError={handlerError}/>

                            </div>

                        </div>
                    )
                    : null
                }

                <Footer />

            </div>
        )

    }

    _onSubmit (evt) {

        console.log('submit!!');

        let {url} = this.state;

        this.setState({
            screenshot: `/api/screenshot?url=${url}`,
            message: '努力截图中'
        });

        evt.preventDefault();

    }

    _onChange (evt) {

        console.log('change!!')

        this.setState({
            url: evt.target.value,
            screenshot: ''
        })

    }

    _onLoadImg () {
        this.setState({
            fetching: false,
            message: ''
        })
    }

    _onErrorImg () {
        this.setState({
            fetching: false,
            message: '截图失败'
        })
    }

}

ReactDom.render(<Home/>,document.getElementById('g-container'))