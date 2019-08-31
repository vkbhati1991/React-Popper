
import React, { Component, Fragment as PopperWrpper } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { PLACEMENT } from "./Placement";

window.openArray = [];
class PopperContent extends Component {

    constructor(props) {
        super(props);
        this.elem = document.createElement('div');
        const { caretStyle, containerStyle } = this.props.setElemStyle(props.placementValue);
        this.state = {
            caretStyle,
            containerStyle
        }

        this.popper = React.createRef();

    }

    static propTypes = {
        placementValue: PropTypes.string,
        children: PropTypes.any,
        popperContentClass: PropTypes.string,
        setElemStyle: PropTypes.any,
        containerWidth: PropTypes.number,

    }

    componentDidMount() {
        document.body.appendChild(this.elem);
        const place = this.getPopperPlacement();
        const { caretStyle, containerStyle } = this.props.setElemStyle(place);
        
        this.setState({
            caretStyle,
            containerStyle
        });

    }

    componentWillUnmount() {
        document.body.removeChild(this.elem);
    }

    getPopperPlacement = () => {

        let placement;

        const _popper = this.popper.current;
        const _el = this.props.el;

        if (!_popper || !_el) return;

        const el = _el.getBoundingClientRect();
        const popper = _popper.getBoundingClientRect();

        switch (this.props.placementValue) {
            case PLACEMENT.TOP:
                placement = el.top > popper.height ? PLACEMENT.TOP : PLACEMENT.BOTTOM;
                break;

            case PLACEMENT.BOTTOM:
                const elBottom = window.innerHeight - el.top - el.height;
                placement = elBottom > popper.height ? PLACEMENT.BOTTOM : PLACEMENT.TOP;
                break;

            case PLACEMENT.LEFT:
                placement = el.left > popper.width ? PLACEMENT.LEFT : PLACEMENT.RIGHT;
                break;

            case PLACEMENT.RIGHT:
                const elRight = window.innerWidth - el.width - el.left;
                placement = elRight > popper.width ? PLACEMENT.RIGHT : PLACEMENT.LEFT;
                break;

            default:
                placement = PLACEMENT.BOTTOM;

        }

        return placement;
    }

    renderPopperContent = () => {
        const { popperContentClass, children } = this.props;
        const popperClassName = `popperBody ${this.getPopperPlacement()}`
        const caretClassName = `caret ${this.getPopperPlacement()}`
        return (
            <PopperWrpper>
                <div ref={this.popper} style={this.state.containerStyle} className={popperClassName}>
                    <div style={this.state.caretStyle} className={caretClassName}></div>
                    <div className={popperContentClass}>{children}</div>
                </div>
            </PopperWrpper>
        )
    }

    render() {
        return ReactDOM.createPortal(
            this.renderPopperContent(),
            this.elem,
        );
    }
}
export default PopperContent;