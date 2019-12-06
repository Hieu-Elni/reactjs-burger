import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    // let transformedIngredients = Object.keys(props.ingredients)
    // .map(igKey => {
    //     return  [...Array(props.ingredients[igKey])].map((_,i) =>
    //         <BurgerIngredient key={igKey+i} type ={igKey} />
    //     )
    // })              // [ 0:[],1:[], 2:[]]
    // .reduce((acc, ele) => {
    //     return acc.concat(ele);
    // }, []);         

  //  console.log(transformedIngredients);  / [ {}, {}]
  let transformedIngredients;
       
       transformedIngredients = props.ingredients && props.ingredients.map((ing, i)=>{
            return <BurgerIngredient key={i} type ={ing.type} />
        });

    // console.log('trans',transformedIngredients);

    if( props.ingredients ===null ||transformedIngredients.length === 0) {
        transformedIngredients = <p>Please select ingredient</p>
    }
    return(

        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;
