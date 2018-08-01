import fetch from 'cross-fetch';
const request = require('superagent');

export default {
    nodes: [
        {
            id: 0,
            parent_id: 0,
            department_name: '总部1号',
            childrens:[]
        },
        // {
        //     id: 1,
        //     label: '总部2号',
        //     height: 0,
        //     nodeChild:[]
        // }
    ]
}

const money = {
    label: '总部1部',
    id: 0,
    total: 100,
    remain: 100,
    nodeChild: [
        {
            id: 1,
            label: '财务部',
            total: 0
        }
    ]
}
// /account/department/department-list-all
// function requestFetch(url, option={method: 'GET'}){
//     fetch(url, option)
//       .then(response => {
//         if(response.status >= 400){
//           throw new Error('Bad response from server!!')
//         }
//         return response.json()
//       })
//       .catch(error => console.log(error))
//       .then(response => {
//         console.log("response==>", response)
//         return response
//       })
// }

function requestFetch(url, option) { 
    request.post(url)
        .send(option)
        .set('accept', 'json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
            return res
          })
 }
export {money, requestFetch}