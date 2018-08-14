import React, { Component } from 'react';

import {SettingPanelStyle, SettingBackStyle, InputStyle, dropStyle} from '../static/js/style'
import folderImage from '../static/images/item-folder-blue.png'


const request = require('superagent')

class Node extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            id: -1,
            department_code: -1,
            department_name: '',
            showSetting: false,
            showChild: false,
            reName: false,
            preLabel: ''
        }
        this.input = ''
        this.item = ''
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        return {...prevState, ...nextProps}
    }
    handleShowSetting = () => {
        this.setState(prevState => ({
            showSetting: !prevState.showSetting
        }))
    }
    handleKeyDown = (e) => {
        e.keyCode === 13 &&
        this.handleBlur()
    }
    handleLabel = (e) => {
        this.props.onChangeLabel( e.target.value)
    }
    handleReName = () => {
        this.props.onReNameItem()
        this.setState(prevState => ({
            //reName: !prevState.reName,
            showSetting: !prevState.showSetting
        }), () => {
            this.input.focus()
            this.input.select()
        })
    }
    handleBlur = () => {
        // this.setState(prevState => ({
        //     reName: !prevState.reName,
        // }))
        this.props.onReNameItem()
        if(this.state.preLabel && this.state.preLabel !== this.state.department_name){
            const option = {
                departmentId: this.state.id,
                name: this.state.department_name,
            }

            request.post('/account/department/department-update')
            .send(option)
            .set('accept', 'json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                console.log('updateres==>', res)
                console.log('updateerr==>', err)
              })
        }else if(!this.state.preLabel && this.state.department_name){

            console.log('this.props.parentID==>', this.props.parentID)
            let option = {
                parent_id: this.props.parentID,
                department_name: this.state.department_name,
                department_msg: 'default',
                department_code: '0'
            }
            option = {
                departmentStr: JSON.stringify(option)
            }
            request.post('/account/department/department-insert')
            .send(option)
            .set('accept', 'json')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .then(res => {
                const id = JSON.parse(res.text).res_data
                console.log('res id==>', id)
                this.props.onNewID(id)

              })
              .then(error => {
                  console.log(error)
              })
        }


    }
    handleFocus = (e) => {
        this.setState({
            preLabel: e.target.value
        })
    }
    handleDrop = () => {
        console.log('state.id==>', this.state.id)
        this.props.onShowChild(this.state.id)
    }
    handleClick = () => {
        const ele = document.querySelectorAll('.node-item')

        ele.forEach(val => {
            val.classList.contains('active') &&
            val.classList.remove('active')
        })

        this.item.classList.add('active')       
    }
    handleAddNode = () => {
        this.setState(prevState => (
            {showSetting: !prevState.showSetting}
        ), () => {this.props.onAddNode()})
    }
    render(){
        return (
            <li className='node-item'
            ref={ele => {this.item = ele}}
            onClick={this.handleClick}>
                <i 
                    style={this.props.showChild?dropStyle:
                        {...dropStyle, ...{borderTopColor: 'transparent', borderLeftColor: '#939599'}}
                    }
                    className='item-icon item-icon_drop'
                    onClick={this.handleDrop}>
                </i>
                <i className='item-icon item-icon_folder'
                    onClick={this.handleDrop}></i>
                <span className='node-item_span'
                    onClick={this.props.onDetail}>
                    {this.state.reName?
                        (
                            <input
                            ref={ele => {this.input = ele}}
                            style= {InputStyle}
                            className='node-item-input'
                            type='text'
                            value={this.state.department_name}
                            onChange={this.handleLabel}
                            onBlur={this.handleBlur}
                            onFocus={this.handleFocus}
                            onKeyDown={this.handleKeyDown}
                            />
                        ):
                        this.state.department_name
                    }
                </span>

                <i
                    className='item-setting'
                    onClick={this.handleShowSetting}>
                    ...
                </i>
                {this.state.showSetting?
                    (
                        <React.Fragment>
                        <div className='node-setting_show'
                            style={SettingPanelStyle}>
                        <span>部门ID:{this.state.department_code}</span>
                        <span onClick={this.handleReName}>部门重命名</span>
                        <span onClick={this.handleAddNode}>增加子部门</span>
                        <span>删除部门</span>
                        </div>
                        <div className='node-setting_background'
                            style={SettingBackStyle}
                            onClick={this.handleShowSetting}></div>
                        </React.Fragment>

                    ):null
                }

                <style jsx='true'>
                {`
                    .node-item{
                        position: relative;
                        height: 28px;
                        line-height: 28px;
                        vertical-align: middle;
                        font-size: 14px;
                        border-radius: 5px;
                        max-width: 260px;
                    }
                    .node-item.active {
                        background: #4a77ac;
                        color: #ffffff;
                    }
                    .node-item:hover{
                        background: #edf1f5;
                    }
                    .node-item.active:hover{
                        background: #4a77ac;
                    }
                    .item-icon{
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        margin: 0 6px;
                    }
                    .item-icon_folder{
                        background: url(${folderImage}) no-repeat;
                        background-size:  cover
                    }
                    .node-item .item-setting{
                        position: absolute;
                        right: 12px;
                        transform: rotate(90deg);
                        cursor: pointer;
                    }
                    .node-item_span{
                        cursor: default;
                        width: 60%;
                    }
                    .node-setting_show span{
                        line-height: 16px;
                    }
                `}
                </style>
            </li>
        )
    }
}

export default Node