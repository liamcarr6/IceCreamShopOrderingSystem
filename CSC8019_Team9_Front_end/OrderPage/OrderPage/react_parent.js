var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DELIVERY = 1;
var COLLECTION = 2;
var EAT_IN = 3;

var ORDER_TYPE_CHOOSER = 1;
var ORDER_CREATOR = 2;
var CHECKOUT_CREATOR = 3;

var ReactParent = function (_React$Component) {
    _inherits(ReactParent, _React$Component);

    function ReactParent(props) {
        _classCallCheck(this, ReactParent);

        var _this = _possibleConstructorReturn(this, (ReactParent.__proto__ || Object.getPrototypeOf(ReactParent)).call(this, props));

        _this.state = {
            selected: "",
            basket: [],
            reactComponent: ORDER_TYPE_CHOOSER
        };

        //method for controlling state from children
        _this.changeToOrderCreator = _this.changeToOrderCreator.bind(_this);
        _this.changeToCheckoutCreator = _this.changeToCheckoutCreator.bind(_this);
        _this.createBasket = _this.createBasket.bind(_this);
        return _this;
    }

    _createClass(ReactParent, [{
        key: "changeToOrderCreator",
        value: function changeToOrderCreator() {
            this.setState({
                reactComponent: ORDER_CREATOR
            });
        }
    }, {
        key: "changeToCheckoutCreator",
        value: function changeToCheckoutCreator() {
            this.setState({
                reactComponent: CHECKOUT_CREATOR
            });
        }
    }, {
        key: "createBasket",
        value: function createBasket(newBasket) {
            this.setState({
                basket: newBasket
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.reactComponent == ORDER_TYPE_CHOOSER) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(OrderTypeChooser, { changeToOrderCreator: this.changeToOrderCreator })
                );
            } else if (this.state.reactComponent == ORDER_CREATOR) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(OrderCreator, { createBasket: this.createBasket, changeToCheckoutCreator: this.changeToCheckoutCreator })
                );
            } else if (this.state.reactComponent == CHECKOUT_CREATOR) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(CheckoutCreator, { basketFromOrderCreator: this.state.basket })
                );
            }
        }
    }]);

    return ReactParent;
}(React.Component);

var domContainer = document.querySelector('#react_parent');
ReactDOM.render(React.createElement(ReactParent, null), domContainer);