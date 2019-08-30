
//Constant 
import { PLACEMENT, px } from "./Placement";

const PopperPlacement = (el, containerWidth, placementValue) => {

    let caretStyle = null;
    let containerStyle = null

    //Get Coordinates of elements
    const elOffset = el.getBoundingClientRect();

    const _left = elOffset.left;
    const _top = elOffset.top;
    const _height = elOffset.height;
    const _width = elOffset.width;
    const _caretSize = 14;
    const _popperFullSize = containerWidth;
    const _popperHalfSize = _popperFullSize / 2;

    const popperStyleForBottom = () => {

        const _elLeftOffset = Math.floor(_left + _width / 2 - _caretSize);
        const _popperLeft = Math.floor(_elLeftOffset - _popperHalfSize + _caretSize);

        const _elRightOffset = Math.floor(window.innerWidth - _left - _width);
        const _popperRight = Math.floor(_elRightOffset);

        const _popperTop = Math.floor(_top + _height);

        if (_elLeftOffset < _popperHalfSize) {
            const caretPos = Math.floor(_width / 2 - _caretSize);
            containerStyle = { left: `${_left}${px}`, top: `${_popperTop}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { left: `${caretPos}${px}` };

        } else if (_elRightOffset < _popperHalfSize) {
            const caretPos = Math.floor(_width / 2 - _caretSize);
            containerStyle = { right: `${_popperRight}${px}`, top: `${_popperTop}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { right: `${caretPos}${px}` };

        } else {
            const caretPos = Math.floor(_popperHalfSize - 14);
            containerStyle = { left: `${_popperLeft}${px}`, top: `${_popperTop}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { left: `${caretPos}${px}` };
        }
    }

    const popperStyleForTop = () => {

        const _elLeftOffset = Math.floor(_left + _width / 2 - _caretSize);
        const _popperLeft = Math.floor(_elLeftOffset - _popperHalfSize + _caretSize);

        const _elRightOffset = Math.floor(window.innerWidth - _left - _width);
        const _popperRight = Math.floor(_elRightOffset);

        const _popperbottom = Math.floor(window.innerHeight - _top);

        if (_elLeftOffset < _popperHalfSize) {
            const caretPos = Math.floor(_width / 2 - _caretSize);
            containerStyle = { left: `${_left}${px}`, bottom: `${_popperbottom}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { left: `${caretPos}${px}` };

        } else if (_elRightOffset < _popperHalfSize) {
            const caretPos = Math.floor(_width / 2 - _caretSize);
            containerStyle = { right: `${_popperRight}${px}`, bottom: `${_popperbottom}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { right: `${caretPos}${px}` };

        } else {
            const caretPos = Math.floor(_popperHalfSize - 14);
            containerStyle = { left: `${_popperLeft}${px}`, bottom: `${_popperbottom}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { left: `${caretPos}${px}` };
        }
    }
    const popperStyleForLeft = () => {

        const _elTopOffset = Math.floor(_top + _height);
        const _popperTop = Math.floor(_top - 20);
        const _caretTop = Math.floor(_height / 2 + 20 - (_caretSize * 2) / 2);

        const _popperBottom = Math.floor(window.innerHeight - _elTopOffset - 20);
        const _popperLeft = Math.floor(_left - _popperFullSize);
        const _caretBottom = Math.floor(_height / 2 + 20 - (_caretSize * 2) / 2);

        const wndowHeight = Math.floor(window.innerHeight / 2);

        if (_elTopOffset < wndowHeight) {

            containerStyle = { left: `${_popperLeft}${px}`, top: `${_popperTop}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { top: `${_caretTop}${px}` };

        } else {

            containerStyle = { left: `${_popperLeft}${px}`, bottom: `${_popperBottom}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { bottom: `${_caretBottom}${px}` };
        }
    }
    const popperStyleForRight = () => {
        const _elTopOffset = Math.floor(_top + _height);
        const _popperTop = Math.floor(_top - 20);
        const _caretTop = Math.floor(_height / 2 + 20 - (_caretSize * 2) / 2);

        const _popperBottom = Math.floor(window.innerHeight - _elTopOffset - 20);
        const _popperLeft = Math.floor(_left + _width);
        const _caretBottom = Math.floor(_height / 2 + 20 - (_caretSize * 2) / 2);

        const wndowHeight = Math.floor(window.innerHeight / 2);

        if (_elTopOffset < wndowHeight) {

            containerStyle = { left: `${_popperLeft}${px}`, top: `${_popperTop}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { top: `${_caretTop}${px}` };

        } else {

            containerStyle = { left: `${_popperLeft}${px}`, bottom: `${_popperBottom}${px}`, width: `${_popperFullSize}${px}` };
            caretStyle = { bottom: `${_caretBottom}${px}` };
        }
    }

    switch (placementValue) {

        case PLACEMENT.TOP:
            popperStyleForTop();
            break;
        case PLACEMENT.LEFT:
            popperStyleForLeft();
            break;
        case PLACEMENT.RIGHT:
            popperStyleForRight();
            break;
        default:
            popperStyleForBottom();
            break;
    }

    return {
        caretStyle,
        containerStyle
    }
}

export default PopperPlacement;