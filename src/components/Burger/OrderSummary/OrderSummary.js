import React from 'react';

import Aux from '../../../Hoc/AuxComponent';
import Button from '../../UI/Button/Button';
// import { withRouter } from 'react-router-dom';

const orderSummary = (props) => {
    // function continueClick() {
       
    //         for (let i in ingredientsSummary) {
    //             queryParams.push(encodeURIComponent(ingredientsSummary[i].type)+ '=' + encodeURIComponent(ingredientsSummary[i].qty));
    //         }
    //         queryString = queryParams.join('&');
    //     props.history.push({
    //        pathname: '/checkout',
    //        search: '?' +queryString
    //     });
    //  }
    const ingredientsSummary =[];
   
       props.ingredients && props.ingredients.reduce((curr,obj) => {
       
            if(!curr[obj.type]){
                curr[obj.type] = {type:obj.type, qty:0};
                ingredientsSummary.push(curr[obj.type]);
            }
            curr[obj.type].qty += 1;
            return curr;
        },{});
    
     let ingredientsShow;
     if(ingredientsSummary){
        ingredientsShow =  ingredientsSummary.map((s,i) => (
             <li key={i}> 
               <span style={{textTransform:'capitalize'}}>
               {i}: {s.type}  {s.qty}
                </span>
                
             </li>
         ))
     }
    
   
    return(
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with followwing ingredients:</p>
        <ul>
            {ingredientsShow}
        </ul>
        <p><strong>Total: {props.price.toFixed(2)}</strong></p>
        <p>Continue checkout</p>
        <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        {/* <Button btnType="Success" clicked={continueClick}>Continue</Button> */}
    </Aux>
    )
};

export default orderSummary;