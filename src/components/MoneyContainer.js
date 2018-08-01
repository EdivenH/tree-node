import React, { Component } from 'react';

import {money} from '../tools'

class MoneyContainer extends Component{
    constructor(props) {
        super(props);
        this.state = money
    }
    handleChangeLabel = (val, index) => {
        this.setState((preState) => {
            preState.nodeChild[index].label = val
        })
    }
    handleAdd = () => {
        const child = {
            id: 0,
            label: '',
            total: 0
        }

        this.setState((preState) => (
            {nodeChild: [...preState.nodeChild, child]}
        ))
    }

    handleChangeMoney = (val) => {
        this.setState((preState) => (
            {...preState, ...{remain: preState.remain - val}}
        ))
    }

    render(){
        return (
            <div className="money-container">
                <MoneyHead label={this.state.label}
                    total={this.state.total}
                    remain={this.state.remain}/>
                <div className="col-line"></div>
                <div className="money-child-container">
                    {(this.state.nodeChild && this.state.nodeChild.length > 0)? 
                        this.state.nodeChild.map((val, index) => {
                            return (
                                <MoneyChild 
                                    data={val}
                                    index={index}
                                    total={this.state.total}
                                    remain={this.state.remain} 
                                    changeLabel= {this.handleChangeLabel}
                                    changeMoney= {this.handleChangeMoney} />
                            )
                        }):null

                    }
                    <div className="money-child">
                        <button onClick={this.handleAdd}>+</button>
                    </div>
                </div>
                <style jsx='true'>
                    {`

                    `}
                </style>
            </div>
        )
    }
}


const MoneyHead = (props) => {
        return(
            <div className="money-head">
                <div><span>{props.label}</span></div>
                <div><span>{props.total}</span></div>
                <div><span>代币剩余:{props.remain}</span></div>
            </div>
        )
}

class MoneyChild extends Component{
    constructor(props) {
        super(props);
        this.state = {

            label: this.props.data.label,
            total: this.props.data.total,
            id: this.props.data.id,
            index: this.props.index,
            remainRate: 0,
            preMoney: 0
        }
    }
    
    handleChangeThisLabel = (e) => {
        this.setState({
            label: e.target.value,
        }, ()=>{this.props.changeLabel(this.state.label, this.state.index)})
    }
    handleChangeThisMoney = (e) => {
        const value = e.target.value
        console.log("moneyVal==>", value)

        this.setState((preState, porps) => (
            (value > porps.remain)? 
            {
                total: porps.remain,
                remainRate: porps.remain / porps.total
            }:
            {
                total: value,
                remainRate: value / porps.total || 0
            }
        ))
    }
    handleBlurMoney = (e) => {
        console.log(this.state.preMoney)
        this.props.changeMoney(this.state.total - this.state.preMoney)

    }
    handleFocusMoney = (e) => {
        this.setState({
            preMoney: e.target.value
        })

    }
    render(){
        return(
            <div className="money-child">
                <div>
                    <label>
                        <input type="number"
                            value={this.state.total}
                            onChange={this.handleChangeThisMoney}
                            onBlur={this.handleBlurMoney} 
                            onFocus={this.handleFocusMoney}/>
                    </label>
                </div>
                <div>
                    <label>
                        <input type="text"
                            value={this.state.label}
                            onChange={this.handleChangeThisLabel} />
                    </label>
                    <span>{this.state.remainRate}</span>
                </div>
            </div>
        )
    }
}

export default MoneyContainer