import React, { Component } from 'react';

import Node from '../components/Node'

const shortid = require('shortid')

const request = require('superagent')

class NodeContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            parent_id: -1,
            department_code: -1,
            showChild: false,
            department_name: '',
            department_msg: '',
            money: 0,
            reName: false,
            newId: -1,
            childrens: [],
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.id !== prevState.id){
            return {...prevState, ...nextProps}
        }
        return null
    }

    handleChangeLabel = (val) => {
        this.setState({
            department_name: val
        }, () => {this.props.onUpdate(val, this.props.index)})
    }
    handleChangeChild = (val, index) => {
        this.setState(() => {
            this.state.childrens[index].department_name = val
        })
    }
    handleAddNode = () => {
        const node = {
            id: shortid.generate(),
            parent_id: this.state.parent_id,
            showChild: false,
            department_code: shortid.generate(),
            department_name: '',
            department_msg: '',
            money: 0,
            reName: true,
            childrens: []
        }
        this.setState(preState => (
            {
                childrens: [...preState.childrens, node],
                showChild: preState.showChild ? preState.showChild: !preState.showChild,
            }
        ))

    }
    handleReNameItem = () => {
        this.setState(preState => (
            {reName: !preState.reName}
        ))
    }
    handleDeleteNode = () => {

    }
    handleShowChild = () => {
        this.setState(preState => (
            {showChild: !preState.showChild}
        ))
    }
    handleDetail = () => {
        const id = this.state.newId === -1? this.state.id: this.state.newId
        request.post('/account/department/department-next-child')
        .send({departmentId: id})
        .set('accept', 'json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .then(res => {
            const detail = JSON.parse(res.text).res_data
            console.log('detail==>', detail)

            this.setState(preState => (
                {showChild: preState.showChild ? preState.showChild: !preState.showChild}
            ), () => {this.handleShowDetail(detail)})
          })
          .then(error => {
              console.log(error)
          })

        
    }
    handleShowDetail = (detail) => {
        this.props.onShowDetail(detail)
    }
    handleNewID = (id) => {
        this.setState({
            newId: id
        })
    }

    render(){
        return (
            <ul className='node-container'>
                <Node 
                    id={this.state.id}
                    department_code={this.state.department_code}
                    parentID={this.state.parent_id}
                    department_name={this.state.department_name}
                    showChild={this.state.showChild}
                    reName={this.state.reName}
                    onChangeLabel={this.handleChangeLabel}
                    onAddNode={this.handleAddNode}
                    onDeleteNode={this.handleDeleteNode}
                    onShowChild={this.handleShowChild}
                    onReNameItem={this.handleReNameItem}
                    onNewID={this.handleNewID}
                    onDetail={this.handleDetail}
                    />
                {this.state.childrens && this.state.childrens.length > 0?
                    (
                        <div className='node-child'
                            style={this.state.showChild?{display: 'block'}: {display: 'none', height: 0}}>
                            {this.state.childrens?
                                this.state.childrens.map((val, index) => (
                                    <NodeContainer {...val }
                                        key={index}
                                        parent_id={this.state.id} 
                                        onShowDetail={this.handleShowDetail}
                                        onUpdate={this.handleChangeChild}
                                        index={index}/>
                                )):null
                            }
                        </div>
                    ):null
                }

                <style jsx='true'>
                    {`
                        .node-container{
                            padding-left: 16px;
                            list-style-type: none;
                            margin-top: 0;
                        }
                       
                    `}
                </style>
            </ul>
        )
    }
}

export default NodeContainer