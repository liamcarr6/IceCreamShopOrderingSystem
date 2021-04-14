'use strict';
/*run this :npx babel --watch src --out-dir . --presets react-app/prod
in project folder to activate JSX preprocessor(converts this code to javascript)
*/

//uncomment out to make eslint check for errors, comment to allow project to run


//a modal = a popup basically

// a list of all sizes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SIZE = {
  SMALL: { value: 1.75, name: "Small", code: "S" },
  MEDIUM: { value: 2.25, name: "Medium", code: "M" },
  LARGE: { value: 2.75, name: "Large", code: "L" },
  EXTRA_LARGE: { value: 3.50, name: "Extra-Large", code: "XL" },
  EXTRA_EXTRA_LARGE: { value: 5.75, name: "Extra-Extra-Large", code: "XXL" }
};

// a list of all dietary types
var TYPE = {
  DAIRY: { name: "Dairy" },
  NON_DAIRY: { name: "Non-Dairy" }

  // a list of all ice creams
};var ICECREAM = {
  HONEYCOMB: { id: "honeycomb", name: "Honeycomb", types: [TYPE.DAIRY], description: "Sweet honeycomb ice cream made with locally sourced honey.", image: "IceCreamPics/honeycomb-ice-cream.JPG" },
  RUM_AND_RAISIN: { id: "rum", name: "Rum and Raisin", types: [TYPE.DAIRY], description: "An indulgent ice cream coated in West Indes Rum (3%).", image: "IceCreamPics/rum-and-raisin-ice-cream.jpg" },
  CHERRY: { id: "cherry", name: "Cherry", types: [TYPE.DAIRY], description: "Rich cherry ice cream made with the freshest local produce.", image: "IceCreamPics/cherry-ice-cream.jpg" },
  SALTED_CARAMEL: { id: "salted", name: "Salted Caramel", types: [TYPE.DAIRY], description: "Mouth-Watering salted caramel ice cream.", image: "IceCreamPics/salted-caramel-ice-cream.jpg" },
  PLAIN_VANILLA: { id: "vanilla", name: "Plain Vanilla", types: [TYPE.DAIRY, TYPE.NON_DAIRY], description: "Smooth, creamy, vanilla ice cream made with completeley natural ingredients.", image: "IceCreamPics/vanilla-ice-cream.jpg" },
  CHOCOLATE: { id: "chocolate", name: "Chocolate", types: [TYPE.DAIRY], description: "A delectable chocolate ice cream filled with chunks of Swiss chocolate.", image: "IceCreamPics/chocolate-ice-cream.jpg" },
  STRAWBERRY: { id: "strawberry", name: "Strawberry", types: [TYPE.DAIRY], description: "Tangy strawberry ice cream made from hand-picked strawberries.", image: "IceCreamPics/strawberry-ice-cream.jpeg" },
  MINT: { id: "mint", name: "Mint", types: [TYPE.DAIRY], description: "A refreshing Mint ice cream decorated with Swiss chocolate chips.", image: "IceCreamPics/mint-ice-cream.jpg" }

  //item in an order that is pushed to the basket (which is an array of all items in order)
};
var ItemInOrder = function ItemInOrder(iceCream, quantity, price, size, type) {
  _classCallCheck(this, ItemInOrder);

  this.price = price;
  this.iceCream = iceCream;
  this.quantity = quantity;
  this.size = size;
  this.type = type;
  this.id = generateID();
};

var Address = function Address(firstLine, secondLine, thirdLine, city, postcode) {
  _classCallCheck(this, Address);

  this.firstLine = firstLine;
  this.secondLine = secondLine;
  this.thirdLine = thirdLine;
  this.city = city;
  this.postcode = postcode;
};

var OrderInformation = function OrderInformation(firstName, lastName, address, telephoneNumber, deliveryType) {
  _classCallCheck(this, OrderInformation);

  this.firstName = firstName;
  this.lastName = lastName;
  this.telephoneNumber = telephoneNumber;
  this.address = address;
  this.deliveryType = deliveryType;
};

/*React component class, similar to Java*/

/*
. list of headings is a list of all subheadings (values to be turned into visual elements)
. quantity is the current quantity of the item being looked at in the modal (popup)
. basket is the current items that have been added to the order
. current price is the current price of the item being looked at in the modal (popup)
. addToOrderButtonState is a boolean for controlling whether button is disabled
*/


var CheckoutCreator = function (_React$Component) {
  _inherits(CheckoutCreator, _React$Component);

  function CheckoutCreator(props) {
    _classCallCheck(this, CheckoutCreator);

    var _this = _possibleConstructorReturn(this, (CheckoutCreator.__proto__ || Object.getPrototypeOf(CheckoutCreator)).call(this, props));

    _this.state = {
      basket: _this.props.basketFromOrderCreator,
      checkoutButtonState: false,
      isDelivery: "delivery",
      orderInfo: new OrderInformation("", "", new Address("", "", "", "", ""), "", ""),
      latLngOfShop: "",
      latLngOfCustomer: ""

      //methods bindings
    };_this.generateOptions = _this.generateOptions.bind(_this);
    _this.makeAddressForm = _this.makeAddressForm.bind(_this);
    _this.onDeliveryRadioChange = _this.onDeliveryRadioChange.bind(_this);
    _this.renderItemInBasket = _this.renderItemInBasket.bind(_this);
    _this.calculateDelivery = _this.calculateDelivery.bind(_this);
    _this.calculateTotalBasketPrice = _this.calculateTotalBasketPrice.bind(_this);

    _this.onQuantityDropdownChange = _this.onQuantityDropdownChange.bind(_this);
    _this.goToPayment = _this.goToPayment.bind(_this);

    _this.setPostcode = _this.setPostcode.bind(_this);
    _this.setCity = _this.setCity.bind(_this);
    _this.setLineOne = _this.setLineOne.bind(_this);
    _this.setLineTwo = _this.setLineTwo.bind(_this);
    _this.setLineThree = _this.setLineThree.bind(_this);

    _this.setFirstName = _this.setFirstName.bind(_this);
    _this.setSecondName = _this.setSecondName.bind(_this);
    _this.setTelephone = _this.setTelephone.bind(_this);

    _this.calculateLatLongOfCustomer = _this.calculateLatLongOfCustomer.bind(_this);
    _this.calculateLatLongOfShop = _this.calculateLatLongOfShop.bind(_this);
    return _this;
  }

  _createClass(CheckoutCreator, [{
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
    key: "generateOptions",
    value: function generateOptions() {
      var arr = [];
      for (var i = 0; i <= 99; i++) {
        arr.push(React.createElement(
          "option",
          { key: i, value: i },
          i
        ));
      }
      return arr;
    }
  }, {
    key: "onDeliveryRadioChange",
    value: function onDeliveryRadioChange(event) {
      var valueToSet = event.target.value;

      this.setState({
        isDelivery: valueToSet
      });
    }
  }, {
    key: "onQuantityDropdownChange",
    value: function onQuantityDropdownChange(e, basketItem) {
      if (e.target.value == 0) {
        this.setState(function (prevState) {
          return {
            basket: prevState.basket.filter(function (value) {
              return value !== basketItem;
            })
          };
        });
      } else {
        basketItem.quantity = e.target.value;
        this.setState({
          basket: [].concat(_toConsumableArray(this.state.basket))
        });
      }
    }
  }, {
    key: "calculateTotalBasketPrice",
    value: function calculateTotalBasketPrice() {
      var sum = 0;

      for (var i = 0; i < this.state.basket.length; i++) {
        sum = this.state.basket[i].price * this.state.basket[i].quantity + sum;
      }

      return sum;
    }
  }, {
    key: "setFirstName",
    value: function setFirstName(event) {
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.firstName = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "setSecondName",
    value: function setSecondName(event) {
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.setSecondName = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "setTelephone",
    value: function setTelephone(event) {
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.telephoneNumber = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "setPostcode",
    value: function setPostcode(event) {
      this.calculateLatLongOfCustomer("https://maps.googleapis.com/maps/api/geocode/json?address=" + event + "&key=AIzaSyCtm2q6b--0Sj-tPVXVf54WvZpvGPAGo4M");
      this.calculateLatLongOfShop();
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.address.postcode = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "setCity",
    value: function setCity(event) {
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.address.city = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "setLineOne",
    value: function setLineOne(event) {
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.address.firstLine = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "setLineTwo",
    value: function setLineTwo(event) {
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.address.secondLine = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "setLineThree",
    value: function setLineThree(event) {
      this.setState(function (prevState) {
        var orderInfo = Object.assign({}, prevState.orderInfo);
        orderInfo.address.thirdLine = event;
        return { orderInfo: orderInfo };
      });
    }
  }, {
    key: "makeAddressForm",
    value: function makeAddressForm() {
      var _this2 = this;

      if (this.state.isDelivery == "delivery") {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement(
              "div",
              { className: "col-12 no-margin-div basket-title-border" },
              React.createElement(
                "h5",
                { className: "header-font" },
                "Address Info"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-12 margin-for-div padding-for-contact" },
            React.createElement("div", { id: "postcode_lookup_field" })
          ),
          React.createElement(
            "div",
            { className: "col-12 margin-for-div" },
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement(
                    "label",
                    null,
                    "Address Line One*"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement("input", { onChange: function onChange(event) {
                      return _this2.setLineOne(event.target.value);
                    }, className: "form-control max-width-div", id: "first_line", type: "text" })
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-12 margin-for-div" },
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement(
                    "label",
                    null,
                    "Address Line Two"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement("input", { onChange: function onChange(event) {
                      return _this2.setLineTwo(event.target.value);
                    }, className: "form-control max-width-div", id: "second_line", type: "text" })
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-12 margin-for-div" },
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement(
                    "label",
                    null,
                    "Address Line Three"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement("input", { onChange: function onChange(event) {
                      return _this2.setLineThree(event.target.value);
                    }, className: "form-control max-width-div", id: "third_line", type: "text" })
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-6 margin-for-div" },
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement(
                    "label",
                    null,
                    "City"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement("input", { onChange: function onChange(event) {
                      return _this2.setCity(event.target.value);
                    }, className: "form-control", id: "post_town", type: "text" })
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-6 margin-for-div" },
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement(
                    "label",
                    null,
                    "Postcode*"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12 no-margin-div" },
                  React.createElement("input", { onChange: function onChange(event) {
                      return _this2.setPostcode(event.target.value);
                    }, className: "form-control", id: "postcode", type: "text" })
                )
              )
            )
          )
        );
      } else {
        return React.createElement("div", null);
      }
    }
  }, {
    key: "renderItemInBasket",
    value: function renderItemInBasket(item) {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "basket-item-border" },
        React.createElement(
          "div",
          { className: "nopadding" },
          React.createElement(
            "div",
            { className: "container nopadding " },
            React.createElement(
              "div",
              { className: "row container nopadding nopadding" },
              React.createElement(
                "div",
                { className: "col-4 nopadding" },
                React.createElement(
                  "h6",
                  { className: "item-in-basket-margin item-in-basket-margin header-font" },
                  item.iceCream.name
                )
              ),
              React.createElement(
                "div",
                { className: "col-3 my-auto nopadding text-left" },
                React.createElement(
                  "p",
                  { className: "item-in-basket-margin" },
                  item.size.name
                ),
                React.createElement(
                  "p",
                  { className: "item-in-basket-margin" },
                  item.type.name
                )
              ),
              React.createElement(
                "div",
                { className: "col-2 text-center my-auto" },
                React.createElement(
                  "select",
                  { onChange: function onChange(e) {
                      _this3.onQuantityDropdownChange(e, item);
                    }, value: item.quantity, className: "form-select", "aria-label": "Default select example" },
                  this.generateOptions()
                )
              ),
              React.createElement(
                "div",
                { "class": "col-3 my-auto text-right nopadding" },
                React.createElement(
                  "h6",
                  null,
                  "£" + (item.size.value * item.quantity).toFixed(2)
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: "goToPayment",
    value: function goToPayment(event) {

      var lngOfCustomer = this.state.latLngOfCustomer.lng;
      var latOfCustomer = this.state.latLngOfCustomer.lat;
      var lngOfShop = this.state.latLngOfShop.lng;
      var latOfShop = this.state.latLngOfShop.lat;

      var distanceFromShop = distance(latOfCustomer, lngOfCustomer, latOfShop, lngOfShop, "M");

      var isAValidOrder = true;
      var dateOfOrder = new Date();

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

      if (this.state.isDelivery == "delivery") {

        if (distanceFromShop == 0 || distanceFromShop == "undefined") {
          alert("Please put in a real postcode!");
          isAValidOrder = false;
        }

        if (distanceFromShop > 5) {
          alert("Postode too far away! Either enter a closer address or collect!");
          isAValidOrder = false;
        }

        if (this.state.orderInfo.address.firstLine === "") {
          alert("Fill in first line of address form!");
          isAValidOrder = false;
        }
        if (this.state.orderInfo.address.postcode === "") {
          alert("Fill in the postcode of the address form!");
          isAValidOrder = false;
        }

        if (this.state.basket.length <= 0) {
          alert("Basket is empty! Go back to order!");
          isAValidOrder = false;
        }

        if (this.state.orderInfo.firstName === "") {
          alert("Fill in the first name field!");
          isAValidOrder = false;
        }

        if (this.state.orderInfo.telephoneNumber === "") {
          alert("Fill in the telephone field!");
          isAValidOrder = false;
        }
      } else {
        if (this.state.isDelivery == "collection") {
          if (this.state.orderInfo.firstName === "") {
            alert("Fill in the first name field!");
            isAValidOrder = false;
          }

          if (this.state.orderInfo.telephoneNumber === "") {
            alert("Fill in the telephone field!");
            isAValidOrder = false;
          }

          if (this.state.basket.length <= 0) {
            alert("Basket is empty! Go back to order!");
            isAValidOrder = false;
          }
        }

        if (isAValidOrder) {
          //go to payment !
        }
      }
    }
  }, {
    key: "calculateDelivery",
    value: function calculateDelivery() {
      if (this.state.isDelivery === "delivery") {
        return 2;
      } else {
        return 0;
      }
    }

    /*render method renders components, starting by calling render list method*/

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "col-12 margin-for-div" },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-12 no-margin-div " },
                React.createElement(
                  "h2",
                  { className: "header-font" },
                  "Checkout"
                ),
                React.createElement(
                  "p",
                  null,
                  "Have an account? ",
                  React.createElement(
                    "a",
                    { href: "url" },
                    "Login!"
                  ),
                  " Want an account? ",
                  React.createElement(
                    "a",
                    { href: "url" },
                    "Register!"
                  ),
                  " "
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-6" },
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { id: "deliveryTypeRadio", className: "margin-for-button-group col-12" },
                  React.createElement(
                    "label",
                    { "class": " make-clickable", onChange: function onChange(event) {
                        return _this4.onDeliveryRadioChange(event);
                      } },
                    React.createElement("input", { checked: this.state.isDelivery === "delivery", value: "delivery", type: "radio", name: "options1", autocomplete: "off" }),
                    " Delivery"
                  ),
                  React.createElement(
                    "label",
                    { className: "make-clickable radio-margin-left", onChange: function onChange(event) {
                        return _this4.onDeliveryRadioChange(event);
                      } },
                    React.createElement("input", { className: "radio-margin-left", checked: this.state.isDelivery === "collection", value: "collection", type: "radio", name: "options2", autocomplete: "off" }),
                    " Collection"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12" },
                  React.createElement(
                    "div",
                    { className: "col-12 no-margin-div basket-title-border" },
                    React.createElement(
                      "h5",
                      { className: "header-font" },
                      "Contact Info"
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-6 margin-for-div padding-for-contact" },
                  React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                      "div",
                      { className: "row" },
                      React.createElement(
                        "div",
                        { className: "col-12 no-margin-div" },
                        React.createElement(
                          "label",
                          null,
                          "First Name*"
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "col-12 no-margin-div" },
                        React.createElement("input", { onChange: function onChange(event) {
                            return _this4.setFirstName(event.target.value);
                          }, className: "form-control", type: "text" })
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-6 margin-for-div padding-for-contact" },
                  React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                      "div",
                      { className: "row" },
                      React.createElement(
                        "div",
                        { className: "col-12 no-margin-div" },
                        React.createElement(
                          "label",
                          null,
                          "Last Name"
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "col-12 no-margin-div" },
                        React.createElement("input", { onChange: function onChange(event) {
                            return _this4.setSecondName(event.target.value);
                          }, className: "form-control", type: "text" })
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12 margin-for-div larger-margin-for-telephone" },
                  React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                      "div",
                      { className: "row" },
                      React.createElement(
                        "div",
                        { className: "col-12 no-margin-div" },
                        React.createElement(
                          "label",
                          null,
                          "Telephone Number*"
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "col-12 no-margin-div" },
                        React.createElement("input", { onChange: function onChange(event) {
                            return _this4.setTelephone(event.target.value);
                          }, className: "max-width-div form-control", id: "telephone_number", type: "text" })
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-12 margin-for-div nopadding" },
                  this.makeAddressForm()
                )
              )
            )
          ),
          React.createElement("div", { className: "col-1" }),
          React.createElement(
            "div",
            { className: "col-4 nopadding " },
            React.createElement(
              "h5",
              { className: "header-font" },
              "Your Order"
            ),
            this.state.basket.map(function (item) {
              return _this4.renderItemInBasket(item);
            }),
            React.createElement(
              "div",
              { className: "basket-item-border" },
              React.createElement(
                "div",
                { className: "nopadding" },
                React.createElement(
                  "div",
                  { className: "container nopadding " },
                  React.createElement(
                    "div",
                    { className: "row container nopadding nopadding" },
                    React.createElement(
                      "div",
                      { className: "col-3 nopadding" },
                      React.createElement(
                        "p",
                        null,
                        "Subtotal"
                      )
                    ),
                    React.createElement("div", { className: "col-4 my-auto nopadding text-left" }),
                    React.createElement("div", { className: "col-2 text-center my-auto" }),
                    React.createElement(
                      "div",
                      { "class": "col-3 my-auto text-right nopadding" },
                      React.createElement(
                        "h6",
                        { className: "label" },
                        "£" + this.calculateTotalBasketPrice().toFixed(2)
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "row container nopadding nopadding" },
                    React.createElement(
                      "div",
                      { className: "col-3 nopadding" },
                      React.createElement(
                        "p",
                        null,
                        "Delivery"
                      )
                    ),
                    React.createElement("div", { className: "col-4 my-auto nopadding text-left" }),
                    React.createElement("div", { className: "col-2 text-center my-auto" }),
                    React.createElement(
                      "div",
                      { "class": "col-3 my-auto text-right nopadding" },
                      React.createElement(
                        "h6",
                        { className: "label" },
                        "£" + this.calculateDelivery().toFixed(2)
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "row container nopadding nopadding" },
                    React.createElement(
                      "div",
                      { className: "col-3 nopadding" },
                      React.createElement(
                        "p",
                        { className: "label" },
                        "Total"
                      )
                    ),
                    React.createElement("div", { className: "col-4 my-auto nopadding text-left" }),
                    React.createElement("div", { className: "col-2 text-center my-auto" }),
                    React.createElement(
                      "div",
                      { className: "col-3 my-auto text-right nopadding" },
                      React.createElement(
                        "h6",
                        { className: "label" },
                        "£" + (this.calculateTotalBasketPrice() + this.calculateDelivery()).toFixed(2)
                      )
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-12 checkout-button-margin" },
              React.createElement(
                "button",
                { onClick: function onClick(event) {
                    return _this4.goToPayment(event);
                  }, className: "btn btn-success max-width-div label" },
                "Go to Payment"
              )
            )
          )
        )
      );
    }
  }]);

  return CheckoutCreator;
}(React.Component);

/*calls render methods*/


var domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(CheckoutCreator, null), domContainer);

//generates random id to differentiate each item in order
function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

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