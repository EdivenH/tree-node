import React, { Component } from 'react';
import {RowLine, ButtonSyle, InputStyle, ColLine} from '../static/js/style'
import NodeContainer from './NodeContainer'


class NodeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.nodes.label
        }
    }
    handleChangethisLabel = (index, e) => {
        const value = e.target.value
        this.setState({
            label: value
        })
        this.props.changeLabel(index, value)
    }
    handleDelthisNode = (index) => {
        this.props.deleteNode(index)
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
                        value={this.state.label}
                        onChange={(e) => {
                            const childID = this.props.childID
                            this.handleChangethisLabel(childID, e)
                        }}
                    />
                </div>
                <NodeContainer nodes={this.props.nodes.nodeChild}/>
            </div>
        );
    }
}

export default NodeItem
