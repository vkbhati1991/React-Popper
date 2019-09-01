
import React, { Component, Fragment as PopperWrpper } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { PLACEMENT } from "./Placement";
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
        placement: PropTypes.string,
        children: PropTypes.any,
        contentClass: PropTypes.string,
        setElemStyle: PropTypes.any,
        width: PropTypes.number
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

        let _placement;

        const _popper = this.popper.current;
        const _el = this.props.el;

        if (!_popper || !_el) return;

        const el = _el.getBoundingClientRect();
        const popper = _popper.getBoundingClientRect();

        switch (this.props.placement) {
            case PLACEMENT.TOP:
                _placement = el.top > popper.height ? PLACEMENT.TOP : PLACEMENT.BOTTOM;
                break;

            case PLACEMENT.BOTTOM:
                const elBottom = window.innerHeight - el.top - el.height;
                _placement = elBottom > popper.height ? PLACEMENT.BOTTOM : PLACEMENT.TOP;
                break;

            case PLACEMENT.LEFT:
                _placement = el.left > popper.width ? PLACEMENT.LEFT : PLACEMENT.RIGHT;
                break;

            case PLACEMENT.RIGHT:
                const elRight = window.innerWidth - el.width - el.left;
                _placement = elRight > popper.width ? PLACEMENT.RIGHT : PLACEMENT.LEFT;
                break;

            default:
                _placement = PLACEMENT.BOTTOM;

        }

        return _placement;
    }

    renderPopperContent = () => {
        const { contentClass, children } = this.props;
        const popperClassName = `popperBody ${this.getPopperPlacement()}`
        const caretClassName = `caret ${this.getPopperPlacement()}`
        return (
            <PopperWrpper>
                <div ref={this.popper} style={this.state.containerStyle} className={popperClassName}>
                    <div style={this.state.caretStyle} className={caretClassName}></div>
                    <div className={contentClass}>{children}</div>
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