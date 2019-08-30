import React from 'react';
import Popper from "./index";


function HowToUse() {
    return (
        <div className="popoverWrapper">
            <Popper
                element={<div className="button">Popper</div>}
                elementClass="popperClass"
                popperContentClass="popperContent"
                placementValue="bottom"
                trigger="click"
                containerWidth={200}
            >
                A smart popover component for React. Contribute to 
                littlebits/react-popover development by creating an account
                 on GitHub.
                 
            </Popper>
        </div>
    );

}

export default HowToUse;
