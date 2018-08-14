import { combineReducers } from 'redux'

import {ADD_NODE, CHANGE_NAME, DELETE_NODE, VISIBILITY_NODE, DRAG_NODE} from '../actions'


const childrens = (state = [], active) => {
    switch(active.type){
        case ADD_NODE:
            const item = {
                id: 0,
                label: '',
                parentID: active.parentID,
                visible: true,
                childrens: []
            }
            return [...state, item]

        case CHANGE_NAME:
            return  state.map(val => (
                        val.id === active.nodeID?
                        {...val, label: active.text}:
                        val
                    ))

        case DELETE_NODE:
            return state.map(val => (
                val.id === active.nodeID?
                {...val, delete: true}:
                val
            ))

        case VISIBILITY_NODE:
            return state.map(val => (
                val.id === active.nodeID?
                {...val, visible: !val.visible}:
                val
            ))

        default:
            return state
    }
}


export default combineReducers({
    childrens
})
