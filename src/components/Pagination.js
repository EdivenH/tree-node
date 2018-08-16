import React, { Component } from 'react';

class Pagination extends Component{
    constructor(props) {
        super(props);
        this.state = {...this.props}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.total !== prevState.total){
            return {...prevState, ...nextProps}
        }
        return null
    }

    handleBlur = e => {
        let value
        if(e.target.value > this.state.total){
            value = this.state.total
        }else if(e.target.value < 1){
            value = 1
        }
        this.setState({
            currentID: value
        }, () => {this.props.onChangeID(this.state.currentID)})
    }
    handleChange = e => {
        this.setState({
            currentID: e.target.value
        })
    }

    handleSwitchLeft = () => {
        this.state.currentID !== 1 &&
        this.setState(prevState => ({
            currentID: +prevState.currentID - 1
        }), () => {this.props.onChangeID(this.state.currentID)})
    }
    handleSwitchRight = () => {
        this.state.currentID !== this.state.total &&
        this.setState(prevState => ({
            currentID: +prevState.currentID + 1
        }), () => {this.props.onChangeID(this.state.currentID)})
    }
    render(){
        return (
            
            <ul className='Pagination Pagination-simple'>
                <li>
                    <i className='arrow arrow-left' onClick={this.handleSwitchLeft}></i>
                </li>
                <li className='pagination-index'>
                    <input
                        className='input-area'
                        type='text' 
                        value={this.state.currentID}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur} />
                    <span className='split'>/</span>
                    <span>{this.state.total}</span>
                </li>
                <li>
                    <i className='arrow arrow-right' onClick={this.handleSwitchRight}></i>
                </li>

                <style jsx>{`
                    .Pagination{
                        list-style-type: none;
                        padding: 0;
                        height: 24px;
                        margin: 0;

                        & > li{
                            float: left;
                            height: 24px;
                        }
                        .arrow{
                            display :inline-block;
                            position: relative;
                            width: 24px;
                            height: 100%;
                            cursor: pointer;

                            &-right{
                                margin-left: 20px;
                            }
                            &-left{
                                margin-right: 20px;
                            }
                            &-right::after{
                                display: inline-block;
                                content: '';
                                height: 6px;
                                width: 6px;
                                border-width: 1px 1px 0 0;
                                border-color: #c7c7cc;
                                border-style: solid;
                                transform: rotate(45deg);
                                position: absolute;
                                top: 50%;
                                margin-top: -3px;
                            }
                            &-left::after{
                                display: inline-block;
                                content: '';
                                height: 6px;
                                width: 6px;
                                border-width: 0 0 1px 1px;
                                border-color: #c7c7cc;
                                border-style: solid;
                                transform: rotate(45deg);
                                position: absolute;
                                top: 50%;
                                right: 0;
                                margin-top: -3px;
                            }

                        }
                        .input-area{
                            height: 100%;
                            box-sizing: border-box;
                            border: 1px solid #d9d9d9;
                            padding: 0;
                            border-radius: 4px;
                            outline: none;
                            text-align: center;
                            transition: border-color .3s;
                            margin-right: 8px;
                            padding: 0 8px;
                            width: 60px;
                        }
                        .input-area:hover{
                            border: 1px solid #1890ff
                        }
                        .split{
                            margin: 0 10px 0 5px;
                        }
                    }
                    .pagination-index{
                        color: rgba(0, 0, 0, 0.65);
                    }
                `}</style>
            </ul>
        )
    }
    
}

export default Pagination