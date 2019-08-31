import React from 'react';
import Popper from "./index";


function HowToUse() {
    return (
        <div className="popoverWrapper">
            <Popper
                element={<div className="button">Popper3</div>}
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
            <div className="popperItem">
                <Popper
                    element={<div className="button">Popper</div>}
                    elementClass="popperClass"
                    popperContentClass="popperContent"
                    placementValue="bottom"
                    trigger="click"
                    containerWidth={200}
                >
                    <Popper
                        element={<div className="button">Popper1</div>}
                        elementClass="popperClass"
                        popperContentClass="popperContent"
                        placementValue="bottom"
                        trigger="click"
                        containerWidth={200}
                    >

                        <Popper
                            element={<div className="button">Popper2</div>}
                            elementClass="popperClass"
                            popperContentClass="popperContent"
                            placementValue="bottom"
                            trigger="click"
                            containerWidth={200}
                        >

                            <Popper
                                element={<div className="button">Popper3</div>}
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
                        </Popper>
                    </Popper>
                </Popper>
            </div>
        </div>
    );

}

export default HowToUse;
