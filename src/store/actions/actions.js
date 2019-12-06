import * as Types from './actionTypes';
import axios from '../../axios-order';
export const addIngredients = (typeIngr) => {
    return {
        type: Types.ADD_INGREDIENT,
        typeIngr
    };
}

export const removeIngredients = (typeIngr) => {
    return {
        type: Types.REMOVE_INGREDIENT,
        typeIngr
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: Types.SET_INGREDIENTS,
        ingredients
    };
}


export const initIngredientsActions = () => {
    return (dispatch) => {
        axios.get( '/ingredients.json' )
            .then( response => {
                dispatch(setIngredients(response.data))
            })
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            })
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: Types.FETCH_INGREDIENTS_FAILED,
    };
}



