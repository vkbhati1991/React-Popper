
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
        contentClass: PropTypes.string,
        placement: PropTypes.string,
        trigger: PropTypes.string,
        width: PropTypes.number
    }

    static defaultProps = {
        elementClass: "popperClass",
        contentClass: "popperBody",
        placement: "bottom",
        trigger: "click",
        width: 200
    }

    componentDidMount() {
        if (this.props.trigger === "click") {
            document.addEventListener("click", this.handleOutside);
        } else {
            document.addEventListener("mousemove", this.handleOutside);
        }

    }

    componentWillUnmount() {
        if (this.props.trigger === "click") {
            document.removeEventListener("click", this.handleOutside);
        } else {
            document.removeEventListener("mousemove", this.handleOutside);
        }
    }
    handleOutside = (event) => {
        const cn = this.container.current;
        const el = this.elem.current;
        if (!cn || !el) return;

        const elArray = window.popperRef.filter((e) => e && e.contains(event.target));
        const isNotClose = elArray.length > 0 || (cn && cn.elem && cn.elem.contains(event.target)) || (el && el.contains(event.target))
        if (isNotClose) return;

        this.setState({ isOpen: false });
        window.popperRef.length = 0;
    }

    openPopper = () => {
        this.setState({ isOpen: !this.state.isOpen }, () => {
            window.popperRef.push(this.container.current && this.container.current.elem);
        });
    }

    setElemStyle = (placement) => {
        const el = this.elem.current;

        if (!el) return;

        return PopperPlacement(el, this.props.width, placement);

    }

    renderElem = () => {
        if (this.props.trigger === "hover") {
            return (
                <span
                    ref={this.elem}
                    className={this.props.elementClass}
                    onMouseEnter={this.openPopper}
                >
                    {this.props.element}
                </span>
            )
        }

        return (
            <span
                ref={this.elem}
                className={this.props.elementClass}
                onClick={this.openPopper}
            >
                {this.props.element}
            </span>
        )
    }

    render() {
        return (
            <PopperWrpper>
                {this.renderElem()}
                {this.state.isOpen && <PopperContent
                    ref={this.container}
                    children={this.props.children}
                    wdth={this.props.width}
                    contentClass={this.props.contentClass}
                    placement={this.props.placement}
                    setElemStyle={this.setElemStyle}
                    el={this.elem.current}
                />}
            </PopperWrpper>
        )
    }
}

export default Popper;