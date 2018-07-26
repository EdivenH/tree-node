import React, {Component}from 'react';

const shortid = require('shortid')

const total = {
    label: '财务部',
    money: 100,
    remainMoney: 100,
    childrens: []
}
const data = React.createContext(total);

export default class MoneyContainer extends Component{
    constructor(props) {
        super(props)
        this.handleChangeMoney = this.handleChangeMoney.bind(this)
        this.state = {
            data: total,
            money: total.money,
            remainMoney: total.remainMoney,
            childrens: total.childrens
        }
    }
    handleChangeMoney(value){
        this.setState({
            remainMoney: this.state.remainMoney - value
        })
    }
    render(){
        return(

            <div className="money-container">
                <MoneyHeader data={this.state.data} />
                    
                <ChildContainer data={this.state.data} changeMoney={this.handleChangeMoney}/>
                <style jsx='true' >{
                `   
                    .money-container, .money-head, .money-child-node{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .money-head-content{
                        border: 1px solid black;
                        padding: 10px;
                    }
                    .money-child{
                        border-top: 1px solid black;
                        display: flex;
                        justify-content: flex-start;
                    }
                    .money-container .col-line{
                        height: 20px;
                        width: 0px;
                        border-left: 1px solid black;
                    }
                    .money-child .node-panel{
                        border: 1px solid black;
                        margin: 0 16px;
                    }
                `
                }</style>
            </div>

        )
    }

}

const MoneyHeader = (props) =>{
    const money = props.data.money
    const remainMoney = props.data.remainMoney
    return(
        <div className="money-head">
            <div className="money-head-content">
                <label>{'$'+ money}</label>
                <label>{'未分配:' + remainMoney}</label>
            </div>
            <div className="col-line"></div>
        </div>
    )
}

class ChildContainer extends Component{
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChangeConnect = this.handleChangeConnect.bind(this)
        this.state = {
            childrens: this.props.data.childrens
        }
    }
    handleAdd(){
        const obj = {
            label: '',
            money: 0,
            remainMoney: this.props.data.remainMoney,
            childrens: []
        }
        //const height = calHeight(42, this.state.childrens, 1)

        this.setState({
            childrens: [...this.state.childrens, obj],
        })

    }
    handleChangeConnect(value){
        console.log('==>', value)
    }
    render(){
        const childrens = this.state.childrens
        return(
            <div className="money-child">
                {(childrens && childrens.length>0)?
                    childrens.map(val => (
                        <ChildNode  data={val} changeMoney={this.handleChangeConnect} key={shortid.generate()}/>
                    )):null
                }
                <div className="money-child-node">
                    <div className="col-line"></div>
                    <div className="add-button">
                        <button onClick={this.handleAdd}>+</button>
                    </div>
                </div>
            </div>
        )
    }
}

class ChildNode extends Component{
    constructor(props) {
        super(props)
        this.handleLabelChange = this.handleLabelChange.bind(this)
        this.handleMoneyChange = this.handleMoneyChange.bind(this)
        this.state = {
            label: this.props.data.label,
            money: this.props.data.money,
            remainMoney: this.props.data.remainMoney
        }

    }
    handleLabelChange(e){
        this.setState({
            label: e.target.value
        })
    }
    handleMoneyChange(e){
        if(e.target.value > this.state.remainMoney){
            this.setState(pre => ({
                money: pre.remainMoney
            }), ()=>this.props.changeMoney(this.state.money))
        }else{
            this.setState({
                money: e.target.value
            }, ()=>this.props.changeMoney(this.state.money))
        }
        
    }

    render(){
        return(
            <div className="money-child-node">
                <div className="col-line"></div>
                <div className="node-panel">
                    <label>
                    <input type="text"
                        value={this.state.label}
                        onChange={this.handleLabelChange}
                        placeholder="请输入部门名称"/>
                    </label>
                    <div>
                        <label>
                            <input type="text"
                                
                                onChange={this.handleMoneyChange}
                                placeholder="请输入虚拟币数量"/>
                            </label>
                        <span className="money-per">
                            {this.state.remainMoney}
                        </span>
                    </div>

                </div>
            </div>
        )
    }
}