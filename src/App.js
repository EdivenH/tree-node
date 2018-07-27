import React, { Component } from 'react';
import fetch from 'cross-fetch';
import NodeContainer from './components/NodeContainer'

import data from './tools'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: data.nodes
    }
  }
  componentDidMount(){
    // fetch('123', {
    //   method: 'GET'
    // })
    // .then((response) => {
    //   if(response.status !== 200){
    //     throw new Error('Bad response from server!!')
    //   }
    //   const nodes = response.json()
    //   this.setState({
    //     nodes
    //   })
    // }, (error) => {
    //   throw new Error(error)
    // })
    this.setState({
      nodes: data.nodes
    })
  }
  handleAddNode = () => {

  }
  render() {
    return (
      <div className="node-panel">
        <NodeContainer nodes={this.state.nodes} />
        <style jsx='true'>
          {`
            .node-panel{
              padding: 10px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default App;
