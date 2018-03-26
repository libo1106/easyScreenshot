import './home.less';
import React from "react";

import Footer from "components/footer/footer";

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: '',
            screenshot: '',
            fetching: true,
            message: '',
        };

        this.handler = {
            handlerSubmit: this._onSubmit.bind(this),
            handlerChange: this._onChange.bind(this),
            handlerLoad: this._onLoadImg.bind(this),
            handlerError: this._onErrorImg.bind(this)
        };
    }

    render () {

        let { handlerSubmit, handlerChange, handlerLoad, handlerError } = this.handler;
        let { screenshot, message } = this.state;

        return (
            <div className="page-home">

                <div className="section">

                    <div className="inner">

                        <div className="title">截图网址</div>

                        <div className="content content-input">

                            <form onSubmit={handlerSubmit}>

                                <div className="row">

                                    <div className="col col-10">
                                        <input name="url" type="text" onChange={handlerChange} placeholder="https://www.google.com/"/>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col col-5 col-base">
                                        <button className="btn" type="submit">开始截图</button>
                                    </div>

                                    <div className="col col-5 col-advance">
                                        <button className="btn" disabled="disabled">高级模式</button>
                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

                <Message msg={message}/>

                <Screenshot
                    url={screenshot}
                    handlerLoad={handlerLoad}
                    handlerError={handlerError}
                />

                <Footer />

            </div>
        )

    }

    _onSubmit (evt) {

        console.log('submit!!');

        let {url} = this.state;

        // 自动补齐 http:// 协议头
        if (!/^https?:\/\//.test(url)) {
            url = `http://${url}`;
        }

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

function Message (props) {

    let msg = props.msg;

    if (msg === '') {
        return null;
    }

    return (
        <div className="section content-msg">
            <p>{msg}</p>
        </div>
    )

}

function Screenshot (props) {

    let {url, handlerLoad, handlerError} = props;

    if (url === '') {
        return null;
    }

    return (
        <div className="section">

            <div className="inner">

                <img className="img-screenshot" src={url} onLoad={handlerLoad} onError={handlerError}/>

            </div>

        </div>
    )

}