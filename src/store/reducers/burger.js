import * as actionTypes from './../actions/actionTypes';
import uuidv4 from "uuid/v4";


const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.8
}

const initialState  = {
    ingredients: null,
    totalPrice:4,
    error: false,
    selectedIng: false
};

var findIngredientIndexLast = (ingreArr,type) => {
    var index = -1;
    
    if(ingreArr.length >0){
       
        for (let i = ingreArr.length-1; i>=0; i--){
           if(ingreArr[i].hasOwnProperty('type')){
                if(ingreArr[i].type === type) {
                    index = i;
                    break;
                }
              //  console.log(ingreArr.length-1);
           }
           
        }
    }
    return index;
}

const reducerIng = ( state = initialState, action ) => {
    var index =-1;
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            let updateIngrs = []; // const in here is wrong, const is hằng số
            if(state.ingredients === null){
                updateIngrs.push({id: uuidv4(), type: action.typeIngr})
            }else{
                updateIngrs = [...state.ingredients];
                updateIngrs.push({id: uuidv4(), type: action.typeIngr});
            }

            return {
                ...state,
                ingredients: updateIngrs,
                selectedIng: true,
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.typeIngr]
            }

        case actionTypes.REMOVE_INGREDIENT:
             index = findIngredientIndexLast(state.ingredients,action.typeIngr);
             state.ingredients.splice(index,1);
            // console.log(state.ingredients===[])
             if(state.ingredients === null || state.ingredients == ![]){
                 
                 return {
                     ...state,
                     ingredients: null,
                     totalPrice: 4,
                     selectedIng: false,
                 }
             }
            return {
                ...state,
                selectedIng: true,
                ingredients: [...state.ingredients],
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.typeIngr]
            }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                selectedIng: false,
                ingredients: action.ingredients
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                ingredients: [],
                error: true
            }
        
        default: return state;


    }
}

export default reducerIng;