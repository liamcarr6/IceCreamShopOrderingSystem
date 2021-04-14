'use strict';

/*constants for state*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DELIVERY = 1;
var COLLECTION = 2;
var EAT_IN = 3;

//constants for states
var ORDER_TYPE_CHOOSER = 1;
var ORDER_CREATOR = 2;
var CHECKOUT_CREATOR = 3;

/*React component class, similar to Java*/

var OrderTypeChooser = function (_React$Component) {
    _inherits(OrderTypeChooser, _React$Component);

    function OrderTypeChooser(props) {
        _classCallCheck(this, OrderTypeChooser);

        var _this = _possibleConstructorReturn(this, (OrderTypeChooser.__proto__ || Object.getPrototypeOf(OrderTypeChooser)).call(this, props));

        _this.state = {
            selected: DELIVERY,
            latLngOfShop: "",
            latLngOfCustomer: ""
        };

        _this.calculateLatLongOfCustomer = _this.calculateLatLongOfCustomer.bind(_this);
        _this.calculateLatLongOfShop = _this.calculateLatLongOfShop.bind(_this);
        _this.setPostcode = _this.setPostcode.bind(_this);
        return _this;
    }

    /*regex checks for html that uses links, and deactivates the links (so tabs don't referesh entire page*/


    _createClass(OrderTypeChooser, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            document.querySelectorAll("a[href^='#']").forEach(function (node) {
                node.addEventListener('click', function (e) {
                    e.preventDefault();
                });
            });
        }
    }, {
        key: "calculateLatLongOfShop",
        value: function calculateLatLongOfShop() {
            var anHttpRequest = new XMLHttpRequest();

            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) var json = JSON.parse(anHttpRequest.responseText);
                var results = json.results;
                var value = results[0].geometry.location;

                this.setState({
                    latLngOfShop: value
                });
            }.bind(this);

            anHttpRequest.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=NE250DN&key=AIzaSyCtm2q6b--0Sj-tPVXVf54WvZpvGPAGo4M", false);

            anHttpRequest.send(null);
        }
    }, {
        key: "calculateLatLongOfCustomer",
        value: function calculateLatLongOfCustomer(aUrl) {
            var anHttpRequest = new XMLHttpRequest();

            anHttpRequest.onreadystatechange = function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) var json = JSON.parse(anHttpRequest.responseText);
                var results = json.results;
                var value = results[0].geometry.location;

                this.setState({
                    latLngOfCustomer: value
                });
            }.bind(this);

            anHttpRequest.open("GET", aUrl, false);

            anHttpRequest.send(null);
        }
    }, {
        key: "setPostcode",
        value: function setPostcode(event) {
            this.calculateLatLongOfCustomer("https://maps.googleapis.com/maps/api/geocode/json?address=" + event + "&key=AIzaSyCtm2q6b--0Sj-tPVXVf54WvZpvGPAGo4M");
            this.calculateLatLongOfShop();
        }
    }, {
        key: "goToNextPage",
        value: function goToNextPage() {
            var isAValidOrder = true;
            var lngOfCustomer = this.state.latLngOfCustomer.lng;
            var latOfCustomer = this.state.latLngOfCustomer.lat;
            var lngOfShop = this.state.latLngOfShop.lng;
            var latOfShop = this.state.latLngOfShop.lat;
            var dateOfOrder = new Date();

            var distanceFromShop = distance(latOfCustomer, lngOfCustomer, latOfShop, lngOfShop, "M");
            console.log(distanceFromShop);

            if (dateOfOrder.getHours() == 17 && dateOfOrder.getMinutes() > 45) {
                alert("We are now closed for orders. Ordering times are 11am-5.45pm.");
                isAValidOrder = false;
            }

            if (dateOfOrder.getHours() >= 18) {
                alert("We are now closed for orders. Ordering times are 11am-5.45pm.");
                isAValidOrder = false;
            }

            if (dateOfOrder.getHours() < 11) {
                alert("We are now closed for orders. Ordering times are 11am-5.45pm.");
                isAValidOrder = false;
            }

            if (this.state.selected == DELIVERY) {

                if (distanceFromShop == 0 || distanceFromShop == "undefined") {
                    alert("Please put in a real postcode!");
                    isAValidOrder = false;
                }

                if (distanceFromShop > 5) {
                    alert("Postode too far away! Either enter a closer address or collect!");
                    isAValidOrder = false;
                }
            }

            if (isAValidOrder) {
                this.props.changeToOrderCreator;
            }
        }

        /*render method renders components. This will change when the state is changed by clicking the 
        on-click buttons. This will in turn change the contents of  the box, and the appearance of the
        tabs*/

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.state.selected == DELIVERY) {
                return React.createElement(
                    "div",
                    { "class": "nested-view-width mx-auto" },
                    React.createElement(
                        "ul",
                        { "class": "nav nav-tabs" },
                        React.createElement(
                            "li",
                            { "class": "left-tab nav-item delivery-collection" },
                            React.createElement(
                                "a",
                                { "class": "nav-link delivery-collection delivery-collection-tabs text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: DELIVERY });
                                    } },
                                React.createElement("i", { "class": "fas fa-truck" }),
                                " Delivery"
                            )
                        ),
                        React.createElement(
                            "li",
                            { "class": "middle-tab nav-item deactive-tab" },
                            React.createElement(
                                "a",
                                { "class": "deactive-tab nav-link text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: COLLECTION });
                                    } },
                                React.createElement("i", { "class": "fas fa-hand-holding" }),
                                " Collection"
                            )
                        ),
                        React.createElement(
                            "li",
                            { "class": "right-tab nav-item deactive-tab" },
                            React.createElement(
                                "a",
                                { "class": "deactive-tab nav-link  text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: EAT_IN });
                                    } },
                                React.createElement("i", { "class": "fas fa-utensils" }),
                                " Eat-In"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "tab-box delivery-collection tab-box-text" },
                        React.createElement(
                            "h5",
                            { "class": "delivery-collection delivery-font" },
                            "CONTACT-FREE DELIVERY"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Our deliveries are carried out in a way that guarantees the safety of our customers and drivers. All orders will need to be paid online by credit/debit card."
                        ),
                        React.createElement(
                            "div",
                            { "class": "input-group mb-3" },
                            React.createElement("input", { onChange: function onChange(event) {
                                    return _this2.setPostcode(event.target.value);
                                }, type: "text", "class": "form-control", placeholder: "Postcode", "aria-label": "Postcode", "aria-describedby": "basic-addon2" }),
                            React.createElement(
                                "div",
                                { "class": "input-group-append" },
                                React.createElement(
                                    "button",
                                    { onClick: function onClick(event) {
                                            return _this2.goToNextPage(event);
                                        }, "class": "btn btn-outline-secondary", type: "button" },
                                    "Start my Order"
                                )
                            )
                        )
                    )
                );
            } else if (this.state.selected == COLLECTION) {
                return React.createElement(
                    "div",
                    { "class": "nested-view-width mx-auto" },
                    React.createElement(
                        "ul",
                        { "class": "nav nav-tabs" },
                        React.createElement(
                            "li",
                            { "class": "left-tab nav-item deactive-tab" },
                            React.createElement(
                                "a",
                                { "class": "deactive-tab nav-link text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: DELIVERY });
                                    } },
                                React.createElement("i", { "class": "fas fa-truck" }),
                                " Delivery"
                            )
                        ),
                        React.createElement(
                            "li",
                            { "class": "middle-tab nav-item delivery-collection" },
                            React.createElement(
                                "a",
                                { "class": "nav-link delivery-collection delivery-collection-tabs text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: COLLECTION });
                                    } },
                                React.createElement("i", { "class": "fas fa-hand-holding" }),
                                " Collection"
                            )
                        ),
                        React.createElement(
                            "li",
                            { "class": "right-tab nav-item deactive-tab" },
                            React.createElement(
                                "a",
                                { "class": "deactive-tab nav-link text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: EAT_IN });
                                    } },
                                React.createElement("i", { "class": "fas fa-utensils" }),
                                " Eat-In"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "tab-box delivery-collection tab-box-text" },
                        React.createElement(
                            "h5",
                            { "class": "delivery-collection" },
                            "CONTACT-FREE COLLECTION"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Our restaurant is operating contact-free collection following government guidelines and regulations. Click below to place your order."
                        ),
                        React.createElement(
                            "div",
                            { "class": "input-group mb-3" },
                            React.createElement(
                                "div",
                                { "class": "input-group-append" },
                                React.createElement(
                                    "button",
                                    { onClick: function onClick(event) {
                                            return _this2.goToNextPage(event);
                                        }, "class": "btn btn-outline-secondary", type: "button" },
                                    "Start my Order"
                                )
                            )
                        )
                    )
                );
            } else {
                return React.createElement(
                    "div",
                    { "class": "nested-view-width mx-auto" },
                    React.createElement(
                        "ul",
                        { "class": "nav nav-tabs" },
                        React.createElement(
                            "li",
                            { "class": "left-tab nav-item deactive-tab" },
                            React.createElement(
                                "a",
                                { "class": "deactive-tab nav-link text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: DELIVERY });
                                    } },
                                React.createElement("i", { "class": "fas fa-truck" }),
                                " Delivery"
                            )
                        ),
                        React.createElement(
                            "li",
                            { "class": "middle-tab nav-item deactive-tab" },
                            React.createElement(
                                "a",
                                { "class": "deactive-tab nav-link text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: COLLECTION });
                                    } },
                                React.createElement("i", { "class": "fas fa-hand-holding" }),
                                " Collection"
                            )
                        ),
                        React.createElement(
                            "li",
                            { "class": "right-tab nav-item delivery-collection" },
                            React.createElement(
                                "a",
                                { "class": "nav-link delivery-collection delivery-collection-tabs text-center", href: "#", onClick: function onClick() {
                                        return _this2.setState({ selected: EAT_IN });
                                    } },
                                React.createElement("i", { "class": "fas fa-utensils" }),
                                " Eat-In"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "tab-box delivery-collection tab-box-text" },
                        React.createElement(
                            "h5",
                            { "class": "delivery-collection" },
                            "Eat-In"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Unforunately due to current circumstances we cannot allow customer's to eat on the premises. Collection and delivery are still available."
                        )
                    )
                );
            }
        }
    }]);

    return OrderTypeChooser;
}(React.Component);

/*calls render methods*/


var domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(OrderTypeChooser, null), domContainer);

function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344;
        }
        if (unit == "N") {
            dist = dist * 0.8684;
        }
        return dist;
    }
}