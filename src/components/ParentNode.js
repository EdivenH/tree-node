import React, {Component}from 'react';
import {RowLine, ButtonSyle, InputStyle} from '../static/js/style'
import {objArrDeepCopy} from '../tools/tools'


import sourceData from '../tools/data'

import ChildNode from './ChildNode'

const shortid = require('shortid')


export default class Container extends Component{
    constructor(props) {
        super(props)

        this.handleRequire = this.handleRequire.bind(this)
        this.handleChangeLabel = this.handleChangeLabel.bind(this)
        this.handleAdd = this.handleAdd.bind(this)

        this.state = {
            data: {},
            childrens: [],
        }
    }

    handleRequire(){

    }
    handleChangeLabel(value, index){
        const childrens = this.state.childrens
        childrens[index].label = value
    }
    handleAdd(){
        const obj = {
            childrens: [],
            label: '',
        }
        this.setState(pre => (
            this.state.childrens.push(obj)
        ))
    }

    componentWillMount() {

        this.setState({
            data: sourceData,
            childrens: sourceData.childrens,
        })
    }
    handleRemoveChild = (index) => {

        this.setState(() => (
            this.state.childrens.splice(index, 1)
        ))
    }
    // componentDidMount() {
    //     this.state.data.childrens = this.state.childrens
    // }

    render(){
        
        const childrens = this.state.childrens
        const element = (childrens && childrens.length>0)?
            childrens.map((val, index) => {
                return(
                    <ParentNode data={val} index={index} changeLabel={this.handleChangeLabel} removeChild={this.handleRemoveChild} key={shortid.generate()}/>
                )
            }):null

        return (
            <div className="node-container">
                {element}
                <div className="node-add">
                    <div className="row-line" style={RowLine}></div>
                    <div className="button-container">
                        <button onClick={this.handleAdd} style={ButtonSyle}>+</button>
                    </div> 
                </div>
            </div>
        )
    }

}

class ParentNode extends Component{
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeLabel = this.handleChangeLabel.bind(this)
        this.handleAdd = this.handleAdd.bind(this)

        this.state = {
            data: this.props.data,
            childrens: [],
            label: '',
            index: this.props.index
        }
    }

    handleChange(e){
        this.setState({
            label: e.target.value
        })

        this.props.changeLabel(e.target.value, this.state.index)
    }
    handleChangeLabel(value, index){
        const childrens = this.state.childrens
        console.log(childrens)
        childrens[index].label = value
    }
    handleAdd(){
        const obj = {
            childrens: [],
            label: '',
        }
        this.setState(pre => (
            this.state.childrens.push(obj)
        ))
    }
    handleChangeHeight(){
        console.log('parentHandle')

    }
    handleRemoveChild = (index) => {

        this.setState(() => (
            this.state.childrens.splice(index, 1)
        ))
    }
    handleRemoveThis = () => {
        this.props.removeChild(this.state.index)
    }
    
    componentWillMount(){
        this.setState({
            childrens: this.state.data.childrens || [],
            label: this.state.data.label
        })
    }
    componentDidUpdate(prevProps, prevState) {

        console.log("parent")
        
    }

    render(){
        
        const childrens = this.state.childrens

        return(
            <div className="parent-node">
                <div className="node-del" 
                    onClick={this.handleRemoveThis}>x</div>
                <div className="row-line" style={RowLine}></div>
                <div className="node-input">
                    <input type="text"
                        value={this.state.label}
                        onChange={this.handleChange}
                        placeholder="请输入部门名称"
                        style={InputStyle}/>
                </div>
                <div className="panel">
                    {(childrens && childrens.length>0)?
                        childrens.map((val, index) => {
                            return (
                                <ChildNode data={val} index={index} changeLabel={this.handleChangeLabel} removeChild={this.handleRemoveChild} 
                                changeHeight={this.handleChangeHeight} key={shortid.generate()}/>
                            )
                        }):
                        (
                            <div className="child-node">
                                <div className="row-line" style={RowLine}></div>
                                <div className="button-container">
                                    <button onClick={this.handleAdd} style={ButtonSyle}>+</button>
                                </div> 
                            </div>
                        )
                    }
                    {(childrens && childrens.length>0)?
                        (<div className="node-add">
                            <div className="row-line" style={RowLine}></div>
                            <div className="button-container">
                                <button onClick={this.handleAdd} style={ButtonSyle}>+</button>
                            </div> 
                        </div>):null
                    }
                </div>
                <style jsx='true'>{
                    `   .node-add{
                            position: relative;
                            display: flex;
                        }
                        .parent-node{
                            position: relative;
                            display: flex;
                            padding: 10px 0;
                        }
                        .child-node{
                            position: relative;
                            display: flex;
                            
                        }
                        .node-del{
                            position: absolute;
                            height: 15px;
                            width: 15px;
                            left: 15px;
                            font-size: 12px;
                            margin-top: -10px;
                            text-align: center;
                            cursor: pointer;
                            opacity: 0;
                        }
                        .child-node:hover > .node-del{
                            opacity: 1;
                        }
                    `
                }</style>
            </div>
        )
    }
}

function calHeight(height, childrens){
    let result = height

    if(childrens && childrens.length>0){
        
        result += 42* childrens.length
        childrens.map(val => {
            calHeight(result, val.childrens)
        })
    }

    return result

}