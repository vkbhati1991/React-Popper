
import React, { Component, Fragment as PopperWrpper } from "react";
import PropTypes from "prop-types";
import PopperContent from "./PopperContent";
import PopperPlacement from  "./PopperPlacement";
import "./index.css";

class Popper extends Component {

    static displayName = "Popper";

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.elem = React.createRef();
        this.container = React.createRef();
    }

    static propTypes = {
        element: PropTypes.any,
        children: PropTypes.any,
        elementClass: PropTypes.string,
        popperContentClass: PropTypes.string,
        placementValue: PropTypes.string,
        trigger: PropTypes.string
    }

    static defaultProps = {
        placementValue: "bottom",
        elementClass: "popperClass",
        dropDownClass: "popperBody",
        trigger: "click",
        containerWidth: null
    }

    componentDidUpdate() {
        if (this.state.isOpen && this.props.trigger === "click") {
            document.addEventListener("mousedown", this.handleOutside);
        } else {
            document.removeEventListener("mousedown", this.handleOutside);
        }
    }

    componentWillUnmount() {
        document.addEventListener("mousedown", this.handleOutside);
    }

    handleOutside = (event) => {
        const container = this.container.current;
        const elem = this.elem.current;
        const isClose = (container && container.elem && container.elem.contains(event.target)) || (elem && elem.contains(event.target))
        if (isClose) return;
        this.setState({ isOpen: false });
    }

    openPopper = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    setElemStyle = (placementValue) => {
        const el = this.elem.current;

        if (!el) return;

        return PopperPlacement(el, this.props.containerWidth, placementValue);
       
    }

    render() {
        const { element, children, elementClass, popperContentClass, containerWidth, placementValue } = this.props;
        return (
            <PopperWrpper>
                <span ref={this.elem}
                    className={elementClass}
                    onClick={this.openPopper}

                >{element}
                </span>
                {this.state.isOpen && <PopperContent
                    ref={this.container}
                    children={children}
                    containerWidth={containerWidth}
                    popperContentClass={popperContentClass}
                    placementValue={placementValue}
                    setElemStyle={this.setElemStyle}
                    el={this.elem.current}
                />}
            </PopperWrpper>
        )
    }
}

export default Popper;