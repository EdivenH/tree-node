import React, { Component } from 'react';
import {RowLine, ButtonSyle, InputStyle, ColLine} from '../static/js/style'
import NodeContainer from './NodeContainer'

import {requestFetch} from '../tools'

class NodeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            department_name: this.props.nodes.department_name,
            focusLabel: ''
        }
    }
    handleChangethisLabel = (index, e) => {
        const value = e.target.value
        this.setState({
            department_name: value
        })
        this.props.changeLabel(index, value)
    }
    handleDelthisNode = (index) => {
        this.props.deleteNode(index)
    }
    handleInputFocus = (e) => {
        const focusLabel = e.target.value
        this.setState({
            focusLabel
        })
    }
    handleInputBlur = () => {
        const label = this.state.department_name
        const focusLabel = this.state.focusLabel
        if(focusLabel && focusLabel !== label){
            const option = {
                departmentId: this.props.nodes.id,
                name: label,
            }
            requestFetch('/account/department/department-update', option)
        }else if(!focusLabel && label){
            let option = {
                parent_id: this.props.parentId,
                department_name: label,
                department_msg: 'default',
                department_code: '0'
            }
            option = {
                departmentStr: JSON.stringify(option)
            }
            requestFetch('/account/department/department-insert', option)
        }
    }
    handleKeyDown = (e) => {
        e.keyCode === 13 && 
        this.handleInputBlur()
    }
    render() {
        return (
            <div className="node-item">
                <div className="col-line"
                    style={{
                        ...ColLine,
                        height: '100%',
                        top: '17px',
                        left: '-1px'
                    }}>
                </div>
                <div className="node-del"
                    onClick={() => {
                        const childID = this.props.childID
                        this.handleDelthisNode(childID)
                    }}>x</div>
                <div className="row-line"
                    style={RowLine}></div>
                <div className="input">
                    <input 
                        type="text"
                        style={InputStyle}
                        value={this.state.department_name}
                        onChange={(e) => {
                            const childID = this.props.childID
                            this.handleChangethisLabel(childID, e)
                        }}
                        onBlur={this.handleInputBlur}
                        onFocus={this.handleInputFocus}
                        onKeyDown={this.handleKeyDown}
                    />
                </div>
                <NodeContainer nodes={this.props.nodes.childrens||[]} parentId={this.props.nodes.id}/>
            </div>
        );
    }
}

export default NodeItem
