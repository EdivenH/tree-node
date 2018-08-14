export const ADD_NODE = 'ADD_NODE'
export const CHANGE_NAME = 'CHANGE_NAME'
export const DELETE_NODE = 'DELETE_NODE'
export const VISIBILITY_NODE = 'VISIBILITY_NODE'
export const DRAG_NODE = 'DRAG_NODE'

export const changeName = text => {
    return {
        type: CHANGE_NAME,
        text
    }
}

export const addNode = () => {
    return {
        type: ADD_NODE
    }
}

export const deleteNode = nodeID => {
    return {
        type: DELETE_NODE,
        nodeID
    }
}

export const visibilityNode = nodeID => {
    return {
        type: VISIBILITY_NODE,
        nodeID
    }
}

export const dragNode = () => {
    return {
        type: DRAG_NODE
    }
}