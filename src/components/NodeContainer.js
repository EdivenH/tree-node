import React, { Component } from 'react';
import NodeItem from './NodeItem'
import {RowLine, ButtonSyle, InputStyle, ColLine} from '../static/js/style'

const shortId = require('shortid')


class NodeContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: this.props.nodes
        }
    }

    handleAdd = () => {

        const node = {
            id: shortId.generate(),
            label: '',
            nodeChild: []
        }

        this.setState((preState) => {
            preState.nodes.push(node)
            return {nodes: preState.nodes}
        })
        
    }
    handleDel = (index) => {

        this.setState((preState) => {
            preState.nodes.splice(index, 1)
            return {nodes: preState.nodes}
        })
    }
    handleChangeLabel = (index, value) => {
        const nodes = this.props.nodes
        nodes[index].label = value
    }
    static getDerivedStateFromProps(props, state){
        console.log(this)
        
        return null
    }
    
    render() {
        const nodes = this.props.nodes
        // let height
        // (nodes && nodes.length > 0) ?
        // height = nodes.length * 42 : height = 0
        return (
            <div className="node-container">
                {/* <div className="col-line"
                    style={{
                        ...ColLine,
                        height: '100%',
                        top: '17px',
                        left: '-1px'
                    }}>
                </div> */}
                {nodes && nodes.length > 0 ?
                    nodes.map((val, index) => (
                        <NodeItem nodes={val} 
                            childID={index}
                            // addNode={this.handleAdd}
                            deleteNode={this.handleDel}
                            changeLabel={this.handleChangeLabel}
                            key={val.id}
                        />
                    )): null
                }
                <div className="node-item node-item_button">
                    <div className="row-line"
                        style={RowLine}>
                    </div>
                    <div className="add-button">
                        <button onClick={this.handleAdd}
                             style={ButtonSyle}>+</button>
                    </div>
                </div>
                <style jsx="true">
                    {`
                        .node-container{
                            position: relative;
                        }
                        .node-item{
                            position: relative;
                            display: flex;
                            padding-bottom: 10px;
                        }
                        .node-item_button{
                            padding-bottom: 0;
                        }
                        .add-button{
                            height: 32px;
                            width: 32px;
                        }
                        .node-del{
                            position: absolute;
                            margin-top: -10px;
                            left: 16px;
                            cursor: pointer;
                            display: none;
                        }
                        .node-item:hover > .node-del{
                            display: block;
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default NodeContainer