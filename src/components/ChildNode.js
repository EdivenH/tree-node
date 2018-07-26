import React, {Component}from 'react';
import {RowLine, ButtonSyle, InputStyle, ColLine} from '../static/js/style'

const shortid = require('shortid')

export default class ChildNode extends Component{
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeHeight = this.handleChangeHeight.bind(this)
        this.handleChangeLabel = this.handleChangeLabel.bind(this)
        this.handleAdd = this.handleAdd.bind(this)


        this.state = {
            data: this.props.data,
            childrens: this.props.data.childrens || [],
            label: this.props.data.label,
            height: 0,
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

        childrens[index].label = value
    }
    handleAdd(){
        const obj = {
            childrens: [],
            label: '',
        }
        //const height = calHeight(42, this.state.childrens, 1)
        console.log('this add==>', this.state.childrens)
        this.setState(pre => (
            this.state.childrens.push(obj)
        ))

    }

    handleChangeHeight(){
        console.log('child')
        console.log('this.state.childrens==>', this.state.childrens)
        const Sigle = 32  + 10
        const height = calHeight(Sigle, this.state.childrens)
        console.log(height)
        this.setState({
            height: height
        })

    }
    handleRemoveChild = (index) => {

        this.setState(() => (
            this.state.childrens.splice(index, 1)
        ))
    }
    handleRemoveThis = () => {
        this.props.removeChild(this.state.index)
    }

    static getDerivedStateFromProps(props, state){
        console.log('this FromProps==>', state.childrens)
        return {
            height: calHeight(42, state.childrens)
        }
    }
    // componentWillMount(){
    //     console.log('this mount==>', this.state.childrens)
    //     this.setState({
    //         childrens: this.state.data.childrens || [],
    //         label: this.state.data.label
    //     })
    // }

    render(){
        console.log('this render==>', this.state.childrens)
        const childrens = this.state.childrens

        return(
            <div className="child-node" style={{
                paddingBottom: "10px"
            }}>
                <div className="node-del" 
                    onClick={this.handleRemoveThis}>x</div>
                <div className="col-line" style={ColLine}></div>
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
                                <ChildNode data={val} 
                                    index={index} 
                                    changeLabel={this.handleChangeLabel} 
                                    changeHeight={this.handleChangeHeight} 
                                    changeParent={this.handleAddParent}
                                    removeChild={this.handleRemoveChild}
                                    key={shortid.generate()}/>
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
                </div>
        )
    }
}

function calHeight(height, childrens, add){
    let result = height

    if(childrens && childrens.length>0){
        
        //result += 42* childrens.length
        childrens.forEach(val => {
            result +=42
            result += calHeight(0, val.childrens)
        })
    }
    if(add){
        result +=42
    }
    return result

}