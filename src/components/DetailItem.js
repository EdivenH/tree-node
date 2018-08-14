import React, { Component } from 'react';

const request = require('superagent')

class DetailItem extends Component{
    constructor(props) {
        super(props);
        this.state = {...props, preMoney: 0, showInput: false}
        this.input = ''
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.id !== prevState.id){
            return {...prevState, ...nextProps}
        }
        else if(nextProps.totalMoney !== prevState.totalMoney){
            return {...prevState, totalMoney: nextProps.totalMoney}
        }
        return null
    }

    handleFocus = () =>{
        this.setState(prevState => ({
            preMoney: prevState.money
        }))
    }
    handleBlur = (e) => {
        let value
        const acount = e.target.value
        const maxValue = (+this.state.totalMoney) + (+this.state.preMoney)
        if(!e.target.value){
            value = +this.state.money + +e.target.value
        }else if(e.target.value > maxValue){
            value = maxValue
        }else{
            value = +this.state.money + (+e.target.value)
        }
        this.input.value = ''
        this.setState(prevState => ({
            money: value,          
            showInput: !prevState.showInput
        }), () => {
            const money = (+this.state.money) - (+this.state.preMoney)
            this.props.onChangeMoney(money)
            console.log(money)

            request.post('/account/coin/assign-coin')
            .send({
                fromDepartmentId: money>0?this.state.parentID:this.state.id,
                toDepartmentId: money>0?this.state.id:this.state.parentID,
                amount: acount < 0 ? -acount : acount,
                type: money > 0?1:2
            })
            .set('accept', 'json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .then(res => {
                const detail = JSON.parse(res.text).res_data
                console.log('detail==>', detail)
                request.post('/account/coin/coin-log-department')
                    .send({
                        departmentId: this.state.parentID
                    })
                    .set('accept', 'json')
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .then(res => {
                        const log = JSON.parse(res.text).res_data
                        console.log('log==>', log)

                        this.props.onGetLog(log)
                    })
                    .then(error => {
                        console.log(error)
                    })
              })
              .then(error => {
                  console.log(error)
              })
        })
        
    }
    handleEnter = (e) => {
        e.keyCode === 13 &&
        this.input.blur()
    }
    handleShowInput = () => {
        this.setState(prevState => ({
            showInput: !prevState.showInput
        }), () => {
            this.input.focus()
        })
    }
    handleChangeMoney = (e) => {

        // this.setState({
        //     money: e.target.value
        // })
    }
    render(){
        return (
            <div className='children-item'>
                <div className='children-item_info'>
                    <span>{this.state.department_name}</span>
                    <span>拥有代币:{this.state.money}</span>
                </div>
                <div className='children-item_money'>
                    {this.state.showInput? 
                        (
                            <label>
                            <input
                                ref={ele => {this.input = ele}}
                                className='input-money'
                                type='text'
                                // value={this.state.money}
                                placeholder={'回收代币请输入 负值!'}
                                onChange={this.handleChangeMoney}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                onKeyDown={this.handleEnter} />
                            </label>
                        ):
                        <button className='button-money'
                            onClick={this.handleShowInput}>{'分配'}</button>
                    }

                </div>
                <style jsx='true'>{`
                    .children-item{
                        flex: 0 1 24%;
                        max-width: 25%;
                        min-height: 100px;
                        text-align: center;
                        padding: 8px 0;
                        margin-bottom: 10px;
                        box-shadow: 1px 0 0 0 #e8e8e8, 0 1px 0 0 #e8e8e8, 
                            1px 1px 0 0 #e8e8e8, 1px 0 0 0 #e8e8e8 inset, 0 1px 0 0 #e8e8e8 inset;
                        
                        .children-item_info{
                            height: 65px;
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            & >button{
                                position: absolute;
                                right: 5px;
                                bottom: 3px;
                                background: rgb(190, 200, 200);
                                color: rgba(0, 0, 0, 0.65);
                                outline: 0;
                                border: 1px solid;
                                border-color: #fff;
                                border-radius: 5px;
                                
                            }
                        }
                        .children-item_money{
                            height: 35px;
                            .input-money{
                                width: 90%;
                                height: 35px;
                                line-height: 1.5;
                                padding: 0;
                                border: none;
                            }
                            .button-money{
                                height: 100%;
                                width: 90%;
                                padding: 0;
                                border: 1px solid #d9d9d9;
                                background: #fff;
                                color: rgba(0, 0, 0, 0.65);
                                border-radius: 4px;
                                outline: 0;
                                &:hover{
                                    color: #18aeff;
                                }
                            }
                        }
                        
                    }
                `}</style>
            </div>
        )
    }
}

export default DetailItem