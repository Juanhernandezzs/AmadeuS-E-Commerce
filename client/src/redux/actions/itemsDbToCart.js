import {ITEMS_DB_TO_CART, USER_ERRORS} from './index'


export const itemsDbToCart = ( value ) => {
    return (dispatch) => {
        try {
            return dispatch({
                type: ITEMS_DB_TO_CART,
                payload: value
            })
        } catch (error) {
            return dispatch({
                type: USER_ERRORS,
                payload: console.log(error)
            })
        }
    }
}
