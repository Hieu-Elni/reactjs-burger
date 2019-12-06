
import React from 'react';
import  './BuildControls.css'
import BuildControlItem from './BuildControlItem/BuildControlItem'
const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Chese', type: 'cheese'},
    {label:'Meat', type: 'meat'},
]



const buildControls = (props) => (
    <div className="BuildControls">
         <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(control => (
                <BuildControlItem 
                key={control.label} 
                label={control.label} 
                onAddingControls = {() =>props.handleOnAdd(control.type)}
                onRemoveControls = {() => props.handleOnRemove(control.type)}
                disableControls = {props.disable[control.type]}
                // dat () => here vi click vao 1 phan tu riêng biệt, dat o parent
                />
            ))
        }
        <button className="OrderButton" disabled={!props.purchasable} 
        onClick={props.openModalPur}>{props.isAuth ? 'Order now' : 'Sign In'}</button>
    </div>
)

export default buildControls;