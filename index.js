
import React, { Component, Fragment as PopperWrpper } from "react";
import PropTypes from "prop-types";
import PopperContent from "./PopperContent";
import PopperPlacement from "./PopperPlacement";
import "./index.css";

window.popperRef = [];
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

    componentDidMount() {
        document.addEventListener("click", this.handleOutside);
    }

    componentWillUnmount() {
        document.addEventListener("mousedown", this.handleOutside);
    }
    handleOutside = (event) => {
        const cn = this.container.current;
        const el = this.elem.current;
        if (!cn || !el) return;
    
        const clickElArray = window.popperRef.filter((e)=> e && e.contains(event.target));

        const isClose = clickElArray.length > 0 || (cn && cn.elem && cn.elem.contains(event.target)) || (el && el.contains(event.target))
        
        if (isClose) return;
        
        this.setState({ isOpen: false });
        window.popperRef.length = 0;
    }

    openPopper = () => {
        this.setState({ isOpen: !this.state.isOpen },()=>{
            window.popperRef.push(this.container.current && this.container.current.elem);
        });
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
                    scoped={"vs-popper"}
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