import React, { Component } from 'react';
import DetailItem from '../components/DetailItem'
import Pagination from '../components/Pagination'

const request = require('superagent')

class NodeDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            parent_id: -1,
            department_name: '',
            department_msg: '',
            money: 0,
            dataLog: [],
            dataLogCurrentID: 1,
            datalogTotal: 0,
            childrens: []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.id !== prevState.id){
            return {...prevState, ...nextProps}
        }
        return null
    }

    componentDidMount(){
        request.post('/account/coin/coin-log-department')
        .send({
            departmentId: this.state.id
        })
        .set('accept', 'json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .then(res => {
            const log = JSON.parse(res.text).res_data

            this.setState({
                dataLog: log,
                datalogTotal: Math.ceil(log.length / 4)
            })
        })
        .then(error => {
            console.log(error)
        })
    }

    handleChangeMoney = (value) => {
        this.setState(prevState => (
            {money: prevState.money - value}
        ))
    }
    handleGetLog = (log) => {
        this.setState({
            dataLog: log,
            datalogTotal: Math.ceil(log.length / 4)
        })
    }
    handleChangeID = (index) => {
        console.log('GetIndex==>', index)
        this.setState({
            dataLogCurrentID: index
        })
    }
    render(){
        return (
            <div className='department-detail-container'>
                <div className='department-detail-container-header'>
                    <p>{this.state.department_name}</p>
                    <p>{this.state.department_msg}</p>
                    <div className='department_money'>
                        <span>{'代币: '}</span>
                        <span>{this.state.money}</span>
                    </div>
                </div>
                <div className='department-detail-container-content'>
                    {this.state.childrens.length === 0 ? 
                        <span>{'请先添加子部门'}</span> :
                        (
                            this.state.childrens.map((val, index) => ( 
                                <DetailItem {...val} 
                                    key={index}
                                    parentID={this.state.id}
                                    totalMoney={this.state.money}
                                    onChangeMoney={this.handleChangeMoney}
                                    onGetLog={this.handleGetLog} />
                            ))
                        )
                    }
                </div>
                <div className='department-detail-container-log'>
                    {
                        this.state.dataLog.length > 0 ?
                        (
                            <React.Fragment>
                                <ul className='log-content-ul'>
                                    {

                                        this.state.dataLog.filter((val, index) => {

                                            return (index >= (+this.state.dataLogCurrentID - 1) * 4 && index < (+this.state.dataLogCurrentID) * 4)
                                        }).map(val => (
                                            <li>
                                                <span className='log-remark'>{val.remark}</span>
                                                <span className='log-time'>{val.create_time}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                                
                                <div className='log-pagination'>
                                <Pagination currentID={1} total={this.state.datalogTotal} 
                                    onChangeID={this.handleChangeID}/>
                                </div>
                            </React.Fragment>
                        ): null
                    }



                </div>
                
                <style jsx='true'>
                    {`
                        .department-detail-container{
                            width: 100%;
                            display: flex;
                            flex-direction: column;

                            &-header{
                                flex: 0 0 100px;
                                position: relative;
                                text-align: center;
                                border-bottom: 1px solid #e8e8e8;
                                border-radius: 2px 2px 0 0;
                                & > p{
                                    margin:0;
                                    font-size: 14px;
                                    color: rgba(0, 0, 0, 0.45);
                                }
                                & > p:first-child{
                                    height: 50px;
                                    line-height: 50px;
                                    font-size: 24px;
                                    color: rgba(0, 0, 0, 0.85);
                                }
                                .department_money{
                                    position: absolute;
                                    right:8px;
                                    bottom: 5px;
                                    font-size: 14px;
                                    font-weight: bold;
                                    color: rgba(0, 0, 0, 0.65);
                                }
                            }
                            &-content{
                                flex: 1 1 auto;
                                min-height: 260px;
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-between;
                                align-items: center;
                                border-bottom: 1px solid #e8e8e8;
                                border-radius: 2px 2px 0 0;
                                padding: 8px 8px 0 8px;
                                margin-bottom: -10px;
                            }
                            &-log{
                                flex: 0 0 200px;
                                display: flex;
                                flex-direction: column;
                                font-size: 12px;
                                color: rgba(0, 0, 0, 0.65);

                                .log-content-ul{
                                    flex: 1;
                                    list-style-type: none;
                                    padding: 0 0 0 8px;
                                    margin: 12px 0 0 24px;

                                    & > li{
                                        margin: 8px 0;
                                    }

                                    .log-remark{
                                        display: inline-block;
                                        max-width: 500px;
                                        padding-right: 24px;
                                        overflow: hidden;
                                        text-overflow:ellipsis;
                                        white-space: nowrap;
                                    }
                                    .log-time{
                                        float: right;
                                        margin-right: 24px;
                                    }
                                }
                                .log-pagination{
                                    height: 24px;
                                    display: flex;
                                    justify-content: flex-end;
                                }
                            }
                        }
                    `}
                </style>
            </div>
        )
    }
    
}

export default NodeDetail