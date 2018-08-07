import React, { Component } from 'react';
// import fetch from 'cross-fetch';
import NodeContainer from './components/NodeContainer'
import LoadingContainer from './components/LoadingContainer'
// import MoneyContainer from './components/MoneyContainer'

const request = require('superagent');

// import {money} from './tools'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      nodes: [],
      loaded: false,
      itemCount: 3
    }
  }
  componentDidMount(){

    request.post('/account/department/department-list-all')
    .set('accept', 'json')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .then(res => {
      setTimeout(() => {
        this.setState({
          nodes: JSON.parse(res.text).res_data.childrens,
          loaded: true
        }, console.log('this.state==>', this.state.nodes))
      }, 1000);

    })
    .catch(err => {
      console.log('数据请求错误!', err)
    })

  }

  render() {
    return (
      <div>
        {!this.state.loaded?
          <LoadingContainer itemCount={this.state.itemCount}/>:
          (
            <div className="node-panel">
            <NodeContainer nodes={this.state.nodes || []} parentId={0}/>
            </div>
          )
        }

        <style jsx='true'>
            {`
              .node-panel{
                padding: 10px;
              }
              .node-panel2{
                display: flex;
                justify-content: center;
              }
            `}
        </style>
      </div>

    )
  }
}

export default App;
