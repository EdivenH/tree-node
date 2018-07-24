import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import {objArrDeepCopy} from './tools/tools'
import sourceData from './tools/data'

import Node from './components/ParentNode'
import Money from './components/MoneyNode'

import './static/css/index.css'

const Data = sourceData || {childrens: []}

const App = (props) => {
  return(
    <div>
    <Node />
    <Money />
    </div>

  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)





// class App extends Component{
//   constructor(props){
//     super(props)

//     this.state = {
//       data: {}
//     }
//   }
//   componentWillMount(){
//     const extendObj = {
//       expended: false,
//       visibled: true,
//       checked: false
//     }
//     this.setState({
//       data: sourceData && objArrDeepCopy(sourceData, extendObj)
//     })
//   }
//   render(){
//     const data = this.state.data
//     console.log("data==>", data.childrens)
//     return (
//       <div>
//         {data.childrens && data.childrens.map(val => (
//           <NodeParent data={val} key={val.id} />
//         ))}
//         {/* <NodeParent data={data} /> */}
//       </div>
//     )
//   }
// }

// class NodeParent extends Component{
//   constructor(props){
//     super(props)
//     this.handToggle = this.handToggle.bind(this)
//     this.state = {
//       expended: false
//     }
//   }

//   handToggle(){
//     this.setState(pre => (
//       {expended: !pre.expended}
//     ))
//   }
//   render(){
//     const data = this.props.data
//     const expended = this.state.expended
//     const width = '100px'
//     const height = '50px'
//     data.expended = expended

//     console.log("child==>", data)
//     return (
//       <div className={expended?'nodeList open': 'nodeList'}>
//         <div className="node-head" onClick={this.handToggle}>{data.label}</div>
//         {data.childrens && data.expended && data.childrens.map(val => (
//           <NodeParent data={val} key={val.id} />
//         ))}
//       </div>

//       // <div className="container">
//       //   {data.childrens && data.childrens.map(val =>(
//       //     <div key={val.id} className="panel">
//       //       <div className="head">{val.label}</div>
//       //       <NodeParent data={val} />
//       //     </div>
//       //   ))}
//       // </div>
//     )
//   }
// }
