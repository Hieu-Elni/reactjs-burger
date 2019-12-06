import React from 'react';

import './Order.css';

const Order = (props) => {
    
    let orderIn = props.orders && props.orders.map((order,i) => (
    <span key={i} style={{
            textTransform: "capitalize",
            display: "inline-block",
            margin: "0 8px",
            border: '1px solid #ccc',
            padding: "5px"
    }}> {order.type} (1)</span>
    ))

    return(
        <div className="Order">
        <p>Ingredients:{orderIn}</p>

        <p>Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>

    )
}

export default Order;