import React from 'react';

const Action = (props) => (
    <div>
        <button 
            className= "big-button"
            onClick={props.handlePick}
            disabled={!props.hasOptions} 
        > 
        Random Option Generator
        </button>
    </div>
);

export default Action;