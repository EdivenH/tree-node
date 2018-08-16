import React, { Component } from 'react';
import NodeContainer from './NodeContainer'
import LoadingContainer from '../components/Loading'
import NodeDetail from './NodeDetail'

const request = require('superagent')


class Department extends Component{
    constructor(props) {
        super(props);
        this.state = {
            departments: {},
            departmentDetail: {
                id: -1,
                parent_id: 0,
                departments_msg: ''
            }
        }
    }
    
    componentDidMount(){
        // const data ={
        //     id: 0, 
        //     department_name:'超级管理员', 
        //     parent_id: 0, 
        //     money: 10000,
        //     department_msg: '我是超级管理员',
        //     department_code: '007',
        //     childrens: [
        //         {id:1, 
        //         department_name: '总部1', 
        //         parent_id: 0, 
        //         money: 100,
        //         department_msg: '我是总部1',
        //         department_code: '0071',
        //         childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部2', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部2',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部3', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部3',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部4', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部4',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部5', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部5',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部5', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部5',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部5', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部5',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部5', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部5',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部5', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部5',
        //             department_code: '0071',
        //             childrens: [
        //         ]},
        //         {id:1, 
        //             department_name: '总部5', 
        //             parent_id: 0, 
        //             money: 0,
        //             department_msg: '我是总部5',
        //             department_code: '0071',
        //             childrens: [
        //         ]}
                
        //     ]
        // }

        // setTimeout(() => {
        //     this.setState({
        //         departments: {...data, isFetch: true},
        //         departmentDetail: {...data}

        //     })
        // }, 2000);


        request.post('/account/department/department-list-all')
        .set('accept', 'json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .then(res => {
          const data = JSON.parse(res.text).res_data
          setTimeout(() => {
            this.setState({
                departments: {...data, isFetch: true},
                departmentDetail: {...data}
            })
          }, 500);

        })
        .catch(err => {
          console.log('数据请求错误===>', err)
        })

    }

    handleShowDetail = (detail) => {
        this.setState({
            departmentDetail: detail
        })
    }
    render(){
        return (
            <React.Fragment>
                {!this.state.departments.isFetch ? 
                    <LoadingContainer />:
                    (
                        <div className='department-content'>
                            <div className='department-panel'>
                                <div className='department-panel-container'>
                                    <NodeContainer {...this.state.departments} 
                                        onShowDetail={this.handleShowDetail}
                                    />
                                </div>
                            </div>
                            <div className='department-detail'>
                                <NodeDetail {...this.state.departmentDetail} />
                            </div>
                        </div>

                    )
                }
            
                <style jsx='true'>
                    {`

                        .department-content{
                            width: 1000px;
                            min-width: 650px;
                            box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
                            border-radius: 4px 0 0 4px;
                            background-color: #F9FAFC;
                            overflow: hidden;
                        }
                        .department-content:after{
                            content: '';
                            display: block;
                            clear: both;
                        }
                        .department-panel{
                            width: 260px;
                            float: left;
                            margin: 8px -130px 0 0;
                            max-height: 650px;
                            min-height: 560px;
                            padding-right: 130px;
                            overflow: auto;
                            box-sizing: content-box;
                            padding-bottom: 1000px;
                            margin-bottom: -1000px;
                        }
                        .department-panel-container{
                            height: 100%;
                        }
                        .department-detail{
                            border-left: 1px dotted #DCE1E6;
                            margin-left: 260px;
                            min-height: 560px;
                        }
                    `}
                </style>
            </React.Fragment>
        )
    }
}

export default Department