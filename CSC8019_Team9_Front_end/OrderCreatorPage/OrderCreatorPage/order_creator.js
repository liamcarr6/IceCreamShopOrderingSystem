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

  // a class for storing the data that is automatically generated on the page
};
var Subheading = function Subheading(heading, contents) {
  _classCallCheck(this, Subheading);

  this.heading = heading; //this is the heading, e.g new/popular/classic/dairy
  this.contents = contents; //this is the contents, an array of the ice creams in that heading
};

//item in an order that is pushed to the basket (which is an array of all items in order)


var ItemInOrder = function ItemInOrder(iceCream, quantity, price, size, type) {
  _classCallCheck(this, ItemInOrder);

  this.price = price;
  this.iceCream = iceCream;
  this.quantity = quantity;
  this.size = size;
  this.type = type;
  this.id = generateID();
};

/*React component class, similar to Java*/

/*
. list of headings is a list of all subheadings (values to be turned into visual elements)
. quantity is the current quantity of the item being looked at in the modal (popup)
. basket is the current items that have been added to the order
. current price is the current price of the item being looked at in the modal (popup)
. addToOrderButtonState is a boolean for controlling whether button is disabled
*/


var OrderTypeChooser = function (_React$Component) {
  _inherits(OrderTypeChooser, _React$Component);

  function OrderTypeChooser(props) {
    _classCallCheck(this, OrderTypeChooser);

    var _this = _possibleConstructorReturn(this, (OrderTypeChooser.__proto__ || Object.getPrototypeOf(OrderTypeChooser)).call(this, props));

    _this.state = {
      listOfHeadings: [new Subheading("New", [ICECREAM.HONEYCOMB, ICECREAM.RUM_AND_RAISIN, ICECREAM.CHERRY]), new Subheading("Classic", [ICECREAM.CHOCOLATE, ICECREAM.MINT, ICECREAM.STRAWBERRY, ICECREAM.PLAIN_VANILLA, ICECREAM.SALTED_CARAMEL]), new Subheading("Dairy-Free", [ICECREAM.PLAIN_VANILLA])],
      quantity: 1,
      basket: [],
      currentPrice: 1.75,
      addToOrderButtonState: false

      //methods bindings

    };_this.renderList = _this.renderList.bind(_this);
    _this.iceCreamToDiv = _this.iceCreamToDiv.bind(_this);
    _this.createDialogFromIcecream = _this.createDialogFromIcecream.bind(_this);
    _this.renderListOfSizes = _this.renderListOfSizes.bind(_this);
    _this.renderListOfDietaryTypes = _this.renderListOfDietaryTypes.bind(_this);
    _this.renderIndividualSizes = _this.renderIndividualSizes.bind(_this);
    _this.renderIndividualDietaryType = _this.renderIndividualDietaryType.bind(_this);

    _this.increment = _this.increment.bind(_this);
    _this.decrement = _this.decrement.bind(_this);
    _this.clearQuantity = _this.clearQuantity.bind(_this);
    _this.onChangeSize = _this.onChangeSize.bind(_this);
    _this.onChangeType = _this.onChangeType.bind(_this);
    _this.calculateTotalBasketPrice = _this.calculateTotalBasketPrice.bind(_this);

    _this.hideModal = _this.hideModal.bind(_this);

    _this.getSizeRadioValue = _this.getSizeRadioValue.bind(_this);
    _this.getTypeRadioValue = _this.getTypeRadioValue.bind(_this);

    _this.renderStickyBar = _this.renderStickyBar.bind(_this);
    _this.renderIndividualStickyBarOption = _this.renderIndividualStickyBarOption.bind(_this);

    _this.generateOptions = _this.generateOptions.bind(_this);
    _this.renderItemInBasket = _this.renderItemInBasket.bind(_this);
    _this.onQuantityDropdownChange = _this.onQuantityDropdownChange.bind(_this);
    _this.checkout = _this.checkout.bind(_this);
    return _this;
  }

  //adds sticky script to sticky bar


  _createClass(OrderTypeChooser, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var script = document.createElement("script");

      script.src = "sticky_bar.js";
      script.async = true;

      document.body.appendChild(script);
    }

    //clear quantity clears all the values set in the modal (quantity,price,button state)

  }, {
    key: "clearQuantity",
    value: function clearQuantity(event) {
      event.preventDefault();
      this.setState({
        quantity: 1,
        currentPrice: 1.75,
        addToOrderButtonState: false
      });

      //this clears all the check boxes
      $(':radio').prop('checked', false);
    }

    //increments quantity in modal by one, then calculates price in modal by multiplying by value of current size

  }, {
    key: "increment",
    value: function increment(iceCreamId) {
      this.setState({
        quantity: this.state.quantity + 1,
        currentPrice: (this.state.quantity + 1) * this.getSizeRadioValue(iceCreamId).split(">")[1]
      });
    }

    //decrement quantity in modal by one, then calculates price in modal by multiplying by value of current size

  }, {
    key: "decrement",
    value: function decrement(iceCreamId) {
      if (this.state.quantity > 1) {
        this.setState({
          quantity: this.state.quantity - 1,
          currentPrice: (this.state.quantity - 1) * this.getSizeRadioValue(iceCreamId).split(">")[1]
        });
      }
    }

    //when size radio button is changed, so is price value. Also sets state to not-disabled if a dietary type is also checked

  }, {
    key: "onChangeSize",
    value: function onChangeSize(iceCreamId) {
      this.setState({
        currentPrice: this.state.quantity * this.getSizeRadioValue(iceCreamId).split(">")[1]
      });

      if (this.getTypeRadioValue(iceCreamId) != undefined) {
        this.setState({
          addToOrderButtonState: true
        });
      }
    }

    //Sets state to not-disabled if a size is also checked

  }, {
    key: "onChangeType",
    value: function onChangeType() {
      if (this.getTypeRadioValue() != undefined) {
        this.setState({
          addToOrderButtonState: true
        });
      }
    }

    //adds to basket

  }, {
    key: "addToOrder",
    value: function addToOrder() {}

    //renders the list of subheadings (value), calling the iceCreamToDiv method on each one

  }, {
    key: "renderList",
    value: function renderList(subheading) {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h4",
          { id: subheading.heading, className: "gap-from-navbar heading-font" },
          subheading.heading
        ),
        React.createElement(
          "div",
          { className: "row gap-from-heading" },
          subheading.contents.map(function (iceCream) {
            return _this2.iceCreamToDiv(iceCream);
          })
        )
      );
    }

    //creates the representation of the ice creams, also used createDialogFromIcecream to generate modal

  }, {
    key: "iceCreamToDiv",
    value: function iceCreamToDiv(iceCream) {
      return React.createElement(
        "div",
        { className: "col-sm-4" },
        React.createElement(
          "div",
          { onClick: this.clearQuantity, className: " my-custom-card shadow p-3 mb-5 bg-white rounded make-clickable", "data-toggle": "modal", "data-target": '#' + iceCream.id },
          React.createElement(
            "div",
            { className: "row card-body" },
            React.createElement(
              "div",
              { className: "col-sm-8 " },
              React.createElement(
                "h5",
                { className: "card-title" },
                iceCream.name
              ),
              React.createElement(
                "p",
                { className: "card-text ellipsis" },
                iceCream.description
              ),
              React.createElement(
                "p",
                { className: "card-text" },
                "£" + SIZE.SMALL.value
              )
            ),
            React.createElement("img", { className: "col-sm-4", src: iceCream.image, alt: "sans" })
          )
        ),
        this.createDialogFromIcecream(iceCream)
      );
    }

    //hides modal when addToOrder click, also adds values to basket

  }, {
    key: "hideModal",
    value: function hideModal(iceCream) {
      $('#' + iceCream.id).modal('hide');

      var sizeId = this.getSizeRadioValue(iceCream.id).split(">")[0];
      var typeId = this.getTypeRadioValue(iceCream.id);
      var price = this.state.currentPrice / this.state.quantity;
      var quantity = this.state.quantity;

      //this is a workaround but it regains the objects from their id  as objects cannot be stored in css value
      var modifiedSizeId = sizeId.replaceAll("-", "_");
      var modifiedTypeId = typeId.replaceAll("-", "_");

      var size = SIZE[modifiedSizeId.toUpperCase()];
      var type = TYPE[modifiedTypeId.toUpperCase()];
      var newOrderItem = new ItemInOrder(iceCream, quantity, price, size, type);

      var modifiedArray = this.state.basket.concat(newOrderItem);
      this.setState({ basket: modifiedArray });
    }

    //gets the value of currently selected size radio button

  }, {
    key: "getSizeRadioValue",
    value: function getSizeRadioValue(iceCreamId) {
      var selectedVal = "";
      var selected = $("#" + iceCreamId + "sizeRadio" + " input[type='radio']:checked");
      if (selected.length > 0) {
        selectedVal = selected.val();
        return selectedVal;
      }
    }

    //gets the value of currently selected dietary type radio button

  }, {
    key: "getTypeRadioValue",
    value: function getTypeRadioValue(iceCreamId) {
      var selectedVal = "";
      var selected = $("#" + iceCreamId + "typeRadio" + " input[type='radio']:checked");
      if (selected.length > 0) {
        selectedVal = selected.val();
        return selectedVal;
      }
    }

    //this bulk of html creates a modal for each ice cream in the subheading contents value.

  }, {
    key: "createDialogFromIcecream",
    value: function createDialogFromIcecream(iceCream) {
      var _this3 = this;

      return React.createElement(
        "div",
        { id: iceCream.id, className: "modal fade", role: "dialog" },
        React.createElement(
          "div",
          { className: "modal-dialog" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                  "div",
                  { className: "row" },
                  React.createElement(
                    "div",
                    { className: "col-12" },
                    React.createElement("img", { className: "img-fluid", src: iceCream.image, alt: "sans" })
                  ),
                  React.createElement(
                    "div",
                    { className: "col-12" },
                    React.createElement(
                      "h1",
                      { className: "title-margin" },
                      iceCream.name
                    ),
                    React.createElement(
                      "p",
                      null,
                      iceCream.description
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-12 collapsable-margin" },
                    React.createElement(
                      "div",
                      { className: "card-group", id: "accordion" },
                      React.createElement(
                        "div",
                        { className: "card card-default" },
                        React.createElement(
                          "div",
                          { className: "card-header" },
                          React.createElement(
                            "div",
                            { className: "container" },
                            React.createElement(
                              "div",
                              { className: "row" },
                              React.createElement(
                                "div",
                                { className: "col-11 fix-values" },
                                React.createElement(
                                  "div",
                                  { className: "container" },
                                  React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                      "div",
                                      { className: "col-12 fix-values" },
                                      React.createElement(
                                        "h6",
                                        { className: "full-div fix-values", "data-toggle": "collapse", "data-target": "#" + iceCream.id + "1" },
                                        "Choice of Size"
                                      )
                                    ),
                                    React.createElement(
                                      "div",
                                      { className: "col-12 fix-values" },
                                      React.createElement(
                                        "p",
                                        { className: "full-div fix-values text-muted small" },
                                        "Required"
                                      )
                                    )
                                  )
                                )
                              ),
                              React.createElement(
                                "div",
                                { className: "col-1" },
                                React.createElement("p", { className: "modal-card-title", "data-toggle": "collapse", "data-target": "#" + iceCream.id + "1" })
                              )
                            )
                          )
                        ),
                        React.createElement(
                          "div",
                          { id: iceCream.id + "1", className: "card-collapse collapse show" },
                          this.renderListOfSizes(iceCream)
                        )
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-12 collapsable-margin" },
                    React.createElement(
                      "div",
                      { className: "card-group", id: "accordion2" },
                      React.createElement(
                        "div",
                        { className: "card card-default" },
                        React.createElement(
                          "div",
                          { className: "card-header" },
                          React.createElement(
                            "div",
                            { className: "container" },
                            React.createElement(
                              "div",
                              { className: "row" },
                              React.createElement(
                                "div",
                                { className: "col-11 fix-values" },
                                React.createElement(
                                  "div",
                                  { className: "container" },
                                  React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                      "div",
                                      { className: "col-12 fix-values" },
                                      React.createElement(
                                        "h6",
                                        { className: "full-div fix-values", "data-toggle": "collapse", "data-target": "#" + iceCream.id + "2" },
                                        "Choice of Dietary Type"
                                      )
                                    ),
                                    React.createElement(
                                      "div",
                                      { className: "col-12 fix-values" },
                                      React.createElement(
                                        "p",
                                        { className: "full-div fix-values text-muted small" },
                                        "Required"
                                      )
                                    )
                                  )
                                )
                              ),
                              React.createElement(
                                "div",
                                { className: "col-1" },
                                React.createElement("p", { className: "modal-card-title", "data-toggle": "collapse", "data-target": "#" + iceCream.id + "2" })
                              )
                            )
                          )
                        ),
                        React.createElement(
                          "div",
                          { id: iceCream.id + "2", className: "card-collapse show collapse" },
                          this.renderListOfDietaryTypes(iceCream)
                        )
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-12" },
                    React.createElement(
                      "p",
                      { className: "small-font text-muted FHRS-margin" },
                      "Cavallo (Northumberland) has a FHRS rating of 5. This information was updated on 14/03/2021. The current rating is on their page on the FSA Website. Allergies, intolerances and dietary requirements: before ordering, please contact the restaurant directly and ask to speak to the Manager who can help cater for your needs. For more information please see Costas Nutrition and Allergen Guide here."
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                  "div",
                  { className: "row" },
                  React.createElement(
                    "div",
                    { className: "container col-4" },
                    React.createElement(
                      "div",
                      { className: "row" },
                      React.createElement(
                        "div",
                        { className: "col-3 d-flex justify-content-center fix-values" },
                        React.createElement(
                          "button",
                          { onClick: function onClick() {
                              return _this3.decrement(iceCream.id);
                            }, type: "button", className: "btn add-buttons btn-block" },
                          "-"
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "col-4 d-flex justify-content-center" },
                        React.createElement(
                          "span",
                          { className: "align-middle my-div-fix" },
                          this.state.quantity
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "col-3 d-flex justify-content-center fix-values" },
                        React.createElement(
                          "button",
                          { onClick: function onClick() {
                              return _this3.increment(iceCream.id);
                            }, type: "button", className: "btn add-buttons btn-block" },
                          "+"
                        )
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-8  align-self-center fix-values" },
                    React.createElement(
                      "button",
                      { onClick: function onClick() {
                          return _this3.hideModal(iceCream);
                        }, type: "button", className: "btn btn-block btn-dark", disabled: !this.state.addToOrderButtonState },
                      React.createElement(
                        "span",
                        null,
                        "Add ",
                        this.state.quantity,
                        " to Order"
                      ),
                      React.createElement(
                        "span",
                        { className: "my-div-fix-2" },
                        "£" + this.state.currentPrice.toFixed(2)
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }

    //this returns an individual radio button based on element passed to it.

  }, {
    key: "renderIndividualDietaryType",
    value: function renderIndividualDietaryType(dietaryType, icecream) {
      var _this4 = this;

      return React.createElement(
        "div",
        { className: "form-check", onChange: function onChange() {
            return _this4.onChangeSize(icecream.id);
          } },
        React.createElement("input", { className: "form-check-input", type: "radio", name: "flexRadioDefault2",
          id: "flexRadioDefault2", value: dietaryType.name }),
        React.createElement(
          "label",
          { className: "form-check-label", htmlFor: "flexRadioDefault2" },
          dietaryType.name
        )
      );
    }

    //this returns an individual radio button based on element passed to it.

  }, {
    key: "renderIndividualSizes",
    value: function renderIndividualSizes(size, icecream) {
      var _this5 = this;

      return React.createElement(
        "div",
        { className: "form-check", onChange: function onChange() {
            return _this5.onChangeSize(icecream.id);
          } },
        React.createElement("input", { className: "form-check-input", type: "radio", name: "flexRadioDefault",
          id: "flexRadioDefault2", value: SIZE[size].name + ">" + SIZE[size].value }),
        React.createElement(
          "label",
          { className: "form-check-label", htmlFor: "flexRadioDefault" },
          SIZE[size].name
        )
      );
    }

    //creates container for all size radio items, then maps all sizes to radio buttons.

  }, {
    key: "renderListOfSizes",
    value: function renderListOfSizes(icecream) {
      var _this6 = this;

      //code will automatically render sizes as options
      return React.createElement(
        "div",
        { className: "card-body", id: icecream.id + "sizeRadio" },
        Object.keys(SIZE).map(function (size) {
          return _this6.renderIndividualSizes(size, icecream);
        })
      );
    }

    //creates container for all dietary type radio items, then maps all sizes to dietary type buttons.

  }, {
    key: "renderListOfDietaryTypes",
    value: function renderListOfDietaryTypes(icecream) {
      var _this7 = this;

      //code will automatically render sizes as options
      return React.createElement(
        "div",
        { className: "card-body", id: icecream.id + "typeRadio" },
        icecream.types.map(function (dietaryType) {
          return _this7.renderIndividualDietaryType(dietaryType, icecream);
        })
      );
    }

    //renders the sticky bar and the modal that pops up on basket button click

  }, {
    key: "renderStickyBar",
    value: function renderStickyBar() {
      var _this8 = this;

      return React.createElement(
        "div",
        { id: "navbar", className: "navbar-holder" },
        React.createElement(
          "div",
          { className: "grey-border" },
          React.createElement(
            "div",
            { className: "subnavbar-holder" },
            this.state.listOfHeadings.map(function (value) {
              return _this8.renderIndividualStickyBarOption(value);
            }),
            React.createElement(
              "div",
              { className: "right-button" },
              React.createElement(
                "button",
                { id: "basket-btn", className: "btn btn-dark right-button", "data-toggle": "modal", "data-target": "#basket-modal", href: "javascript:void(0)" },
                React.createElement("i", {
                  className: "fas fa-shopping-basket" })
              )
            )
          ),
          React.createElement(
            "div",
            { id: "basket-modal", className: "modal fade", role: "dialog" },
            React.createElement(
              "div",
              { className: "modal-dialog custom-basket-modal" },
              React.createElement(
                "div",
                { className: "modal-content" },
                React.createElement(
                  "div",
                  { className: "modal-body" },
                  React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                      "div",
                      { className: "row" },
                      React.createElement(
                        "div",
                        { className: "col-12" },
                        React.createElement(
                          "h1",
                          null,
                          "Your order"
                        ),
                        React.createElement(
                          "p",
                          null,
                          "From Cavallo"
                        ),
                        this.state.basket.map(function (basketItem) {
                          return _this8.renderItemInBasket(basketItem);
                        })
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "modal-footer" },
                  React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                      "div",
                      { className: "row" },
                      React.createElement(
                        "div",
                        { className: "col-12" },
                        React.createElement(
                          "button",
                          { onClick: function onClick() {
                              return _this8.checkout();
                            }, type: "button", className: "btn btn-block btn-dark" },
                          React.createElement(
                            "span",
                            null,
                            "Checkout"
                          ),
                          React.createElement(
                            "span",
                            { className: "my-div-fix-2" },
                            "£" + this.calculateTotalBasketPrice().toFixed(2)
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }

    //renders the links for the sticky bar (e.g new, classic, and so forth)

  }, {
    key: "renderIndividualStickyBarOption",
    value: function renderIndividualStickyBarOption(subheading) {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { className: "align-text-left", href: "#" + subheading.heading },
          subheading.heading
        )
      );
    }

    //simply generates the 0-99 of the basket dropdown

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

    //barebones algorithm for summing the items in the basket 

  }, {
    key: "calculateTotalBasketPrice",
    value: function calculateTotalBasketPrice() {
      var sum = 0;

      for (var i = 0; i < this.state.basket.length; i++) {
        sum = this.state.basket[i].price * this.state.basket[i].quantity + sum;
      }

      return sum;
    }

    //when the quantity dropdown in the basket changes, this changes the basket values

  }, {
    key: "onQuantityDropdownChange",
    value: function onQuantityDropdownChange(e, basketItem) {
      if (e.target.value == 0) {
        this.setState(function (prevState) {
          return {
            basket: prevState.basket.filter(function (value) {
              return value !== basketItem;
            }) };
        });
      } else {
        basketItem.quantity = e.target.value;
        this.setState({
          basket: [].concat(_toConsumableArray(this.state.basket))
        });
      }
    }

    //method renders each item that has been added to the basket

  }, {
    key: "renderItemInBasket",
    value: function renderItemInBasket(basketItem) {
      var _this9 = this;

      return React.createElement(
        "div",
        { className: "container basket-margin" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-2" },
            React.createElement(
              "select",
              { onChange: function onChange(e) {
                  _this9.onQuantityDropdownChange(e, basketItem);
                }, value: basketItem.quantity, className: "form-select", "aria-label": "Default select example" },
              this.generateOptions()
            )
          ),
          React.createElement(
            "div",
            { className: "col-8" },
            React.createElement(
              "h6",
              { className: "margin-for-basket bold-item" },
              basketItem.iceCream.name
            ),
            React.createElement(
              "p",
              { className: "margin-for-basket" },
              basketItem.size.name
            ),
            React.createElement(
              "p",
              { className: "margin-for-basket" },
              basketItem.type.name
            )
          ),
          React.createElement(
            "div",
            { className: "col-2" },
            React.createElement(
              "p",
              null,
              "£" + (basketItem.price * basketItem.quantity).toFixed(2)
            )
          )
        )
      );
    }
  }, {
    key: "checkout",
    value: function checkout() {}

    /*render method renders components, starting by calling render list method*/

  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      return React.createElement(
        "div",
        null,
        this.renderStickyBar(),
        React.createElement(
          "div",
          { className: "grid-holder font" },
          this.state.listOfHeadings.map(function (value) {
            return _this10.renderList(value);
          })
        )
      );
    }
  }]);

  return OrderTypeChooser;
}(React.Component);

/*calls render methods*/


var domContainer = document.querySelector('#order_creator');
ReactDOM.render(React.createElement(OrderTypeChooser, null), domContainer);

//generates random id to differentiate each item in order
function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}