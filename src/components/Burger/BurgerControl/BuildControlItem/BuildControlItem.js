
import React from 'react';
import './BuildControlItem.css';
const buildControlItem = (props) => (
    <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button className="Less" onClick={props.onRemoveControls} disabled={props.disableControls}>Less</button>
        <button className="More" onClick={props.onAddingControls}>More</button>
    </div>
)

export default buildControlItem;