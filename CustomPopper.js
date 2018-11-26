import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import linkUtil from "../../../Components/ObjectForm/Utils/Link";
import ObjectFormWrapper from "../ObjectFormWrapper";
import controlConfig from "../ControlConfig";
import statusCodes from "~/Constants/StatusCodes";
import Loader from "~/Components/Loader";

class CustomPopper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { isOpen } = this.state;

        if (prevState.isOpen === isOpen) {
            return this.getPopperContent();
        }

        if (isOpen) {
            this.registerEventListners();
            this.getPopperContent();
        } else {
            this.unregisterEventListeners();
        }
    }

    componentWillUnmount() {
        this.unregisterEventListeners();
    }

    registerEventListners = () => {
        document.addEventListener("mousedown", this.handleClickOutside);
        window.addEventListener("scroll", this.onScroll);
        const { LinkStyles } = this.props;
        if (LinkStyles && LinkStyles.DialogActionMode === "OnHover") {
            document.addEventListener("mousemove", this.handleDocumentMouseMove);
        }
    }

    unregisterEventListeners = () => {
        document.removeEventListener("mousedown", this.handleClickOutside);
        window.removeEventListener("scroll", this.onScroll);
        document.removeEventListener("mousemove", this.handleDocumentMouseMove);
    }

    handleClickOutside = evt => {
        this.removeAllPopover(this.PopperId, evt);
    };

    handleOnClick = () => {
        this.PopperId = this.addDiv();
        this.setState({
            isOpen: true
        }, () => {
            if (this.state.isOpen && !this.state.response) {
                this.getAjaxData();
            }
        });
    }

    handleDocumentMouseMove = (evt) => {
        const linkContainer = this.link;
        if (linkContainer.contains(evt.target)) {
            return;
        }

        if (this.state.isOpen) {
            this.removeAllPopover(this.PopperId, evt);
        }
    }

    onMouseLeave = () => {
        this.setTime = false;
    }

    handelMouseEnter = () => {

        this.setTime = true;
        setTimeout(() => {
            if (this.setTime) {
                this.handleOnClick();
            }
        }, 300);
    }

    onScroll = (evt) => {
        this.removeAllPopover(this.PopperId, evt);
    }

    removeAllPopover(dialogId, evt) {
        const dialogDiv = document.getElementById(dialogId);
        if (!dialogDiv) {
            return;
        }
        if (!dialogDiv.contains(evt.target)) {
            this.setState({ isOpen: false });
            ReactDOM.unmountComponentAtNode(dialogDiv);
            dialogDiv.parentNode.removeChild(dialogDiv);
        }
    }

    getPopperStyle = () => {
        const elem = this.link;
        //const contentContainer = this.container;
        const elemClient = elem.getBoundingClientRect();
        //link detail
        const top = Math.floor(elemClient.top);
        const left = Math.floor(elemClient.left);
        const elemWidth = Math.floor(elemClient.width);
        const elemHeight = Math.floor(elemClient.height);
        //window size
        const windowWidth = Math.floor(window.innerWidth);
        const windowHeight = Math.floor(window.innerHeight);

        let Top, Bottom, Left, Right, CaretBottom, CaretTop, CaretClass, Caretleft, CaretRight;
        //case 1 left, top
        if (top < windowHeight / 2) {
            Top = `${top + elemHeight - 40}px`;
            CaretTop = `${top + elemHeight - 25}px`;
            Bottom = "auto";
        } else {
            Top = "auto";
            Bottom = `${windowHeight - top - 40}px`;
            CaretBottom = `${windowHeight - top - 25}px`;
        }

        if (left < windowWidth / 2) {
            Left = `${left + elemWidth - 36}px`;
            Right = "auto";
            Caretleft = `${left + elemWidth - 1}px`;
            CaretClass = "leftcaret";
        } else {
            Left = "auto";
            Right = `${windowWidth - left - 36}px`;
            CaretRight = `${windowWidth - left - 1}px`;
            CaretClass = "rightcaret";
        }

        return { Left, Top, Bottom, Right, CaretBottom, CaretTop, CaretClass, Caretleft, CaretRight };
    }

    getStyleClass = () => {
        const { LinkStyles } = this.props;
        const { QuickViewStyle } = LinkStyles;
        if (QuickViewStyle) {

            return `popper-${QuickViewStyle}`;
        }

        return "";
    }

    addDiv() {
        const popperId = "popoverid";//`${Date.now()}`;
        const popoverDiv = document.createElement("div");
        popoverDiv.setAttribute("id", popperId);
        popoverDiv.setAttribute("class", "popoverContainer");
        document.body.appendChild(popoverDiv);

        return popperId;
    }

    getPopperContent = () => {
        const dialogDiv = document.getElementById(this.PopperId);
        if (!dialogDiv) {
            return;
        }
        ReactDOM.render(<PopperBody getData={this.getData} style={this.getPopperStyle()} PopperStyle={this.getStyleClass()} />, document.getElementById(this.PopperId));
    }

    getAjaxData = () => {
        const { url, ajaxActionInfo } = this.props;

        return linkUtil.handleHttpAjaxRequest(url, ajaxActionInfo,
            (response) => {
                return this.setState({ response });
            }
        );
    }

    getFormData = (additionalResponse) => {
        if (!additionalResponse) {
            return;
        }

        return (<ObjectFormWrapper
            controlConfig={controlConfig}
            layoutMetaData={additionalResponse.FormMetaData}
            layoutFieldsData={additionalResponse.Data}
        >
            {
                ({ render }) => (
                    <div className="">
                        {
                            render()
                        }
                    </div>
                )
            }
        </ObjectFormWrapper>);
    }

    getData = () => {
        const { response } = this.state;
        if (!response) {
            return <Loader></Loader>;
        }

        switch (response.Status) {
            case statusCodes.dialogForm:
                return this.getFormData(response.AdditionalResponse);
            case statusCodes.fail:
                return (<div className="popper-message-body" dangerouslySetInnerHTML={{ __html: response.Message }}></div>);
            case statusCodes.component:
                return linkUtil.renderComponent(response.AdditionalResponse, true);
        }
    }

    getPopperAnchor = () => {
        const { LinkStyles, title } = this.props;
        const { DialogActionMode } = LinkStyles;

        if (DialogActionMode === "OnHover") {
            return (<a ref={(n) => { this.link = n; }} onMouseEnter={this.handelMouseEnter} onMouseLeave={this.onMouseLeave} title={title}>{this.getIcon()}<span> {title}</span></a>);
        }

        return (<a ref={(n) => { this.link = n; }} onClick={this.handleOnClick} title={title}>{this.getIcon()}<span> {title}</span></a>);
    }

    getIcon = () => {
        const { icon, title } = this.props;
        if (!icon) { return; }

        return (<i title={title} className={`mr2 f16 ${icon}`}></i>);

    }

    render() {

        return (
            <div className="customPopper right">
                {this.getPopperAnchor()}
            </div>
        );
    }
}

export default CustomPopper;

CustomPopper.propTypes = {
    title: PropTypes.any,
    url: PropTypes.string,
    icon: PropTypes.string,
    ajaxActionInfo: PropTypes.shape({
        request: PropTypes.object,
        onCallback: PropTypes.func,
        updateActionButton: PropTypes.func
    }),
    LinkStyles: PropTypes.object
};

class PopperBody extends React.PureComponent {
    render() {
        const { style, PopperStyle, getData } = this.props;
        const { Left, Top, Right, Bottom, CaretBottom, CaretTop, Caretleft, CaretRight, CaretClass } = style;

        return (
            <div className="popperwrapper">
                <div className={`custopPopper__caret ${CaretClass}`} style={{ left: Caretleft, top: CaretTop, right: CaretRight, bottom: CaretBottom }}></div>
                <div className={`customPopperContent ${PopperStyle}`} style={{ left: Left, top: Top, right: Right, bottom: Bottom }}>
                    <div className="customPopper__content relative" >
                        {getData()}
                    </div>
                </div>
            </div >
        );
    }
}

PopperBody.propTypes = {
    getData: PropTypes.any,
    PopperStyle: PropTypes.any,
    style: PropTypes.any
};