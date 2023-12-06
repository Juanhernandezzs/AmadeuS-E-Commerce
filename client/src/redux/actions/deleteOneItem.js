import { DELETE_ONE_ITEM } from ".";

const deleteOneItem = ( _id ) => {
    
    return ( dispatch ) => {
        return dispatch({
            type: DELETE_ONE_ITEM,
            payload: _id
        })
    }    
}

export default deleteOneItem
