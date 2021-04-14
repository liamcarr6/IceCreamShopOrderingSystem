'use strict';
/*run this :npx babel --watch src --out-dir . --presets react-app/prod
in project folder to activate JSX preprocessor(converts this code to javascript)
*/

//uncomment out to make eslint check for errors, comment to allow project to run


//a modal = a popup basically

// a list of all sizes
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
}

// a list of all ice creams
var ICECREAM = {
  HONEYCOMB: { id: "honeycomb", name: "Honeycomb", types: [TYPE.DAIRY], description: "Sweet honeycomb ice cream made with locally sourced honey.", image: "IceCreamPics/honeycomb-ice-cream.JPG" },
  RUM_AND_RAISIN: { id: "rum", name: "Rum and Raisin", types: [TYPE.DAIRY], description: "An indulgent ice cream coated in West Indes Rum (3%).", image: "IceCreamPics/rum-and-raisin-ice-cream.jpg" },
  CHERRY: { id: "cherry", name: "Cherry", types: [TYPE.DAIRY], description: "Rich cherry ice cream made with the freshest local produce.", image: "IceCreamPics/cherry-ice-cream.jpg" },
  SALTED_CARAMEL: { id: "salted", name: "Salted Caramel", types: [TYPE.DAIRY], description: "Mouth-Watering salted caramel ice cream.", image: "IceCreamPics/salted-caramel-ice-cream.jpg" },
  PLAIN_VANILLA: { id: "vanilla", name: "Plain Vanilla", types: [TYPE.DAIRY, TYPE.NON_DAIRY], description: "Smooth, creamy, vanilla ice cream made with completeley natural ingredients.", image: "IceCreamPics/vanilla-ice-cream.jpg" },
  CHOCOLATE: { id: "chocolate", name: "Chocolate", types: [TYPE.DAIRY], description: "A delectable chocolate ice cream filled with chunks of Swiss chocolate.", image: "IceCreamPics/chocolate-ice-cream.jpg" },
  STRAWBERRY: { id: "strawberry", name: "Strawberry", types: [TYPE.DAIRY], description: "Tangy strawberry ice cream made from hand-picked strawberries.", image: "IceCreamPics/strawberry-ice-cream.jpeg" },
  MINT: { id: "mint", name: "Mint", types: [TYPE.DAIRY], description: "A refreshing Mint ice cream decorated with Swiss chocolate chips.", image: "IceCreamPics/mint-ice-cream.jpg" },
}

// a class for storing the data that is automatically generated on the page
class Subheading {
  constructor(heading, contents) {
    this.heading = heading; //this is the heading, e.g new/popular/classic/dairy
    this.contents = contents; //this is the contents, an array of the ice creams in that heading
  }
}

//item in an order that is pushed to the basket (which is an array of all items in order)
class ItemInOrder {
  constructor(iceCream, quantity, price, size, type) {
    this.price = price
    this.iceCream = iceCream;
    this.quantity = quantity;
    this.size = size;
    this.type = type;
    this.id = generateID()
  }
}

/*React component class, similar to Java*/

/*
. list of headings is a list of all subheadings (values to be turned into visual elements)
. quantity is the current quantity of the item being looked at in the modal (popup)
. basket is the current items that have been added to the order
. current price is the current price of the item being looked at in the modal (popup)
. addToOrderButtonState is a boolean for controlling whether button is disabled
*/
class OrderCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfHeadings: [new Subheading("New", [ICECREAM.HONEYCOMB, ICECREAM.RUM_AND_RAISIN, ICECREAM.CHERRY])
        , new Subheading("Classic", [ICECREAM.CHOCOLATE, ICECREAM.MINT, ICECREAM.STRAWBERRY, ICECREAM.PLAIN_VANILLA, ICECREAM.SALTED_CARAMEL])
        , new Subheading("Dairy-Free", [ICECREAM.PLAIN_VANILLA])],
      quantity: 1,
      basket: [],
      currentPrice: 1.75,
      addToOrderButtonState: false
    }

    //methods bindings

    this.renderList = this.renderList.bind(this);
    this.iceCreamToDiv = this.iceCreamToDiv.bind(this);
    this.createDialogFromIcecream = this.createDialogFromIcecream.bind(this);
    this.renderListOfSizes = this.renderListOfSizes.bind(this);
    this.renderListOfDietaryTypes = this.renderListOfDietaryTypes.bind(this);
    this.renderIndividualSizes = this.renderIndividualSizes.bind(this);
    this.renderIndividualDietaryType = this.renderIndividualDietaryType.bind(this);

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.clearQuantity = this.clearQuantity.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.calculateTotalBasketPrice = this.calculateTotalBasketPrice.bind(this);


    this.hideModal = this.hideModal.bind(this);

    this.getSizeRadioValue = this.getSizeRadioValue.bind(this);
    this.getTypeRadioValue = this.getTypeRadioValue.bind(this);

    this.renderStickyBar = this.renderStickyBar.bind(this);
    this.renderIndividualStickyBarOption = this.renderIndividualStickyBarOption.bind(this);

    this.generateOptions = this.generateOptions.bind(this);
    this.renderItemInBasket = this.renderItemInBasket.bind(this);
    this.onQuantityDropdownChange = this.onQuantityDropdownChange.bind(this)
    this.checkout = this.checkout.bind(this)
  }

  //adds sticky script to sticky bar
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "sticky_bar.js";
    script.async = true;

    document.body.appendChild(script);
  }

  //clear quantity clears all the values set in the modal (quantity,price,button state)
  clearQuantity(event) {
    event.preventDefault();
    this.setState({
      quantity: 1,
      currentPrice: 1.75,
      addToOrderButtonState: false
    })

    //this clears all the check boxes
    $(':radio').prop('checked', false);

  }

  //increments quantity in modal by one, then calculates price in modal by multiplying by value of current size
  increment(iceCreamId) {
    this.setState({
      quantity: (this.state.quantity + 1),
      currentPrice: (this.state.quantity + 1) * this.getSizeRadioValue(iceCreamId).split(">")[1]
    })
  }

  //decrement quantity in modal by one, then calculates price in modal by multiplying by value of current size
  decrement(iceCreamId) {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: (this.state.quantity - 1),
        currentPrice: (this.state.quantity - 1) * this.getSizeRadioValue(iceCreamId).split(">")[1]
      })
    }
  }

  //when size radio button is changed, so is price value. Also sets state to not-disabled if a dietary type is also checked
  onChangeSize(iceCreamId) {
    this.setState({
      currentPrice: (this.state.quantity) * this.getSizeRadioValue(iceCreamId).split(">")[1]
    })

    if (this.getTypeRadioValue(iceCreamId) != undefined) {
      this.setState({
        addToOrderButtonState: true
      })
    }
  }

  //Sets state to not-disabled if a size is also checked
  onChangeType() {
    if (this.getTypeRadioValue() != undefined) {
      this.setState({
        addToOrderButtonState: true
      })
    }
  }

  //adds to basket
  addToOrder() { }

  //renders the list of subheadings (value), calling the iceCreamToDiv method on each one
  renderList(subheading) {
    return (
      <div>
        <h4 id={subheading.heading} className="gap-from-navbar heading-font">{subheading.heading}</h4>
        <div className="row gap-from-heading">
          {subheading.contents.map(iceCream => this.iceCreamToDiv(iceCream))}
        </div>
      </div>
    )
  }

  //creates the representation of the ice creams, also used createDialogFromIcecream to generate modal
  iceCreamToDiv(iceCream) {
    return (
      <div className="col-sm-4">
        <div onClick={this.clearQuantity} className=" my-custom-card shadow p-3 mb-5 bg-white rounded make-clickable" data-toggle="modal" data-target={'#' + iceCream.id}>
          <div className="row card-body">
            <div className="col-sm-8 ">
              <h5 className="card-title">{iceCream.name}</h5>
              <p className="card-text ellipsis">{iceCream.description}</p>
              <p className="card-text">{"£" + SIZE.SMALL.value}</p>
            </div>
            <img className="col-sm-4" src={iceCream.image} alt="sans" />
          </div>
        </div>
        {this.createDialogFromIcecream(iceCream)}
      </div>
    )
  }

  //hides modal when addToOrder click, also adds values to basket
  hideModal(iceCream) {
    $('#' + iceCream.id).modal('hide');

    var sizeId = this.getSizeRadioValue(iceCream.id).split(">")[0]
    var typeId = this.getTypeRadioValue(iceCream.id)
    var price = this.state.currentPrice/this.state.quantity
    var quantity = this.state.quantity

    //this is a workaround but it regains the objects from their id  as objects cannot be stored in css value
    var modifiedSizeId = sizeId.replaceAll("-","_")
    var modifiedTypeId = typeId.replaceAll("-","_")

    var size = SIZE[modifiedSizeId.toUpperCase()]
    var type = TYPE[modifiedTypeId.toUpperCase()]
    let newOrderItem = new ItemInOrder(iceCream,quantity,price,size,type)

    var modifiedArray = this.state.basket.concat(newOrderItem);
    this.setState({ basket: modifiedArray })

  }



  //gets the value of currently selected size radio button
  getSizeRadioValue(iceCreamId) {
    var selectedVal = "";
    var selected = $("#" + iceCreamId + "sizeRadio" + " input[type='radio']:checked");
    if (selected.length > 0) {
      selectedVal = selected.val();
      return selectedVal;
    }
  }

  //gets the value of currently selected dietary type radio button
  getTypeRadioValue(iceCreamId) {
    var selectedVal = "";
    var selected = $("#" + iceCreamId + "typeRadio" + " input[type='radio']:checked");
    if (selected.length > 0) {
      selectedVal = selected.val();
      return selectedVal;
    }
  }

  //this bulk of html creates a modal for each ice cream in the subheading contents value.
  createDialogFromIcecream(iceCream) {
    return (<div id={iceCream.id} className="modal fade" role="dialog">
      <div className="modal-dialog">

        <div className="modal-content">
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <img className="img-fluid" src={iceCream.image} alt="sans" />
                </div>
                <div className="col-12">
                  <h1 className="title-margin">{iceCream.name}</h1>
                  <p>{iceCream.description}</p>
                </div>
                <div className="col-12 collapsable-margin">
                  <div className="card-group" id="accordion">
                    <div className="card card-default">
                      <div className="card-header">
                        <div className="container">
                          <div className="row">
                            <div className="col-11 fix-values">
                              <div className="container">
                                <div className="row">
                                  <div className="col-12 fix-values">
                                    <h6 className="full-div fix-values" data-toggle="collapse" data-target={"#" + iceCream.id + "1"}>
                                      Choice of Size</h6>
                                  </div>
                                  <div className="col-12 fix-values">
                                    <p className="full-div fix-values text-muted small">Required</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-1">
                              <p className="modal-card-title" data-toggle="collapse" data-target={"#" + iceCream.id + "1"}></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id={iceCream.id + "1"} className="card-collapse collapse show">
                        {this.renderListOfSizes(iceCream)}
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-12 collapsable-margin">
                  <div className="card-group" id="accordion2">
                    <div className="card card-default">
                      <div className="card-header">
                        <div className="container">
                          <div className="row">
                            <div className="col-11 fix-values">
                              <div className="container">
                                <div className="row">
                                  <div className="col-12 fix-values">
                                    <h6 className="full-div fix-values" data-toggle="collapse" data-target={"#" + iceCream.id + "2"}>
                                      Choice of Dietary Type</h6>
                                  </div>
                                  <div className="col-12 fix-values">
                                    <p className="full-div fix-values text-muted small">Required</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-1">
                              <p className="modal-card-title" data-toggle="collapse" data-target={"#" + iceCream.id + "2"}></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id={iceCream.id + "2"} className="card-collapse show collapse">
                        {this.renderListOfDietaryTypes(iceCream)}
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-12">
                  <p className="small-font text-muted FHRS-margin">Cavallo (Northumberland) has a FHRS rating of 5. This information
                  was updated on 14/03/2021. The current rating is on their page on the FSA Website.
                  Allergies, intolerances and dietary requirements: before ordering, please contact
                  the restaurant directly and ask to speak to the Manager who can help cater for your
                  needs. For more information please see Costas Nutrition and Allergen Guide here.
                                </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="container">
              <div className="row">
                <div className="container col-4">
                  <div className="row">
                    <div className="col-3 d-flex justify-content-center fix-values">
                      <button onClick={() => this.decrement(iceCream.id)} type="button" className="btn add-buttons btn-block">-</button>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                      <span className="align-middle my-div-fix">{this.state.quantity}</span>
                    </div>
                    <div className="col-3 d-flex justify-content-center fix-values">
                      <button onClick={() => this.increment(iceCream.id)} type="button" className="btn add-buttons btn-block">+</button>
                    </div>
                  </div>
                </div>
                <div className="col-8  align-self-center fix-values">
                  <button onClick={() => this.hideModal(iceCream)} type="button" className="btn btn-block btn-dark" disabled={!this.state.addToOrderButtonState}><span>Add {this.state.quantity} to Order</span><span className="my-div-fix-2">{"£" + this.state.currentPrice.toFixed(2)}</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

  //this returns an individual radio button based on element passed to it.
  renderIndividualDietaryType(dietaryType, icecream) {
    return (
      <div className="form-check" onChange={() => this.onChangeSize(icecream.id)}>
        <input className="form-check-input" type="radio" name="flexRadioDefault2"
          id="flexRadioDefault2" value={dietaryType.name} />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          {dietaryType.name}</label>
      </div>
    )
  }

  //this returns an individual radio button based on element passed to it.
  renderIndividualSizes(size, icecream) {
    return (
      <div className="form-check" onChange={() => this.onChangeSize(icecream.id)}>
        <input className="form-check-input" type="radio" name="flexRadioDefault"
          id="flexRadioDefault2" value={SIZE[size].name + ">" + SIZE[size].value} />
        <label className="form-check-label" htmlFor="flexRadioDefault">
          {SIZE[size].name}
        </label>
      </div>
    )
  }

  //creates container for all size radio items, then maps all sizes to radio buttons.
  renderListOfSizes(icecream) {
    //code will automatically render sizes as options
    return (<div className="card-body" id={icecream.id + "sizeRadio"}>
      {Object.keys(SIZE).map(size => this.renderIndividualSizes(size, icecream))}
    </div>
    )
  }


  //creates container for all dietary type radio items, then maps all sizes to dietary type buttons.
  renderListOfDietaryTypes(icecream) {
    //code will automatically render sizes as options
    return (<div className="card-body" id={icecream.id + "typeRadio"}>
      {icecream.types.map(dietaryType => this.renderIndividualDietaryType(dietaryType, icecream))}
    </div>
    )
  }

  //renders the sticky bar and the modal that pops up on basket button click
  renderStickyBar() {
    return (<div id="navbar" className="navbar-holder">
      <div className="grey-border">
        <div className="subnavbar-holder">
          {this.state.listOfHeadings.map(value => this.renderIndividualStickyBarOption(value))}
          <div className="right-button">
            <button id="basket-btn"  className="btn btn-dark right-button" data-toggle="modal" data-target="#basket-modal" href="javascript:void(0)"><i
              className="fas fa-shopping-basket"></i></button>
          </div>
        </div>

        <div id="basket-modal" className="modal fade" role="dialog">
          <div className="modal-dialog custom-basket-modal">
            <div className="modal-content">
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <h1>Your order</h1>
                      <p>From Cavallo</p>
                      {this.state.basket.map(basketItem => this.renderItemInBasket(basketItem))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <button onClick={this.checkout} type="button" className="btn btn-block btn-dark"><span>Checkout</span><span className="my-div-fix-2">{"£" + this.calculateTotalBasketPrice().toFixed(2)}</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    )
  }

  //renders the links for the sticky bar (e.g new, classic, and so forth)
  renderIndividualStickyBarOption(subheading) {
    return (<div>
      <a className="align-text-left" href={"#" + subheading.heading}>{subheading.heading}</a>
    </div>)
  }

  //simply generates the 0-99 of the basket dropdown
  generateOptions() {
    var arr = [];
    for (let i = 0; i <= 99; i++) {
      arr.push(<option key={i} value={i}>{i}</option>)
    }
    return arr;
  }

  //barebones algorithm for summing the items in the basket 
  calculateTotalBasketPrice() {
    var sum = 0;

    for (var i = 0; i < this.state.basket.length; i++) {
      sum = (this.state.basket[i].price*this.state.basket[i].quantity) + sum
    }

    return sum
  }

  //when the quantity dropdown in the basket changes, this changes the basket values
  onQuantityDropdownChange(e, basketItem) {
    if(e.target.value==0) {
      this.setState(prevState => ({     	
        basket: prevState.basket.filter(value => value !== basketItem)}));
    } else {
      basketItem.quantity = e.target.value
      this.setState({
        basket: [...this.state.basket]
      })
    }
  }

  //method renders each item that has been added to the basket
  renderItemInBasket(basketItem) {
    return (<div className="container basket-margin">
      <div className="row">
        <div className="col-2">
          <select onChange={(e) => {
            this.onQuantityDropdownChange(e, basketItem)
          }} value={basketItem.quantity} className="form-select" aria-label="Default select example">
            {this.generateOptions()}
          </select>
        </div>
        <div className="col-8">
          <h6 className="margin-for-basket bold-item">{basketItem.iceCream.name}</h6>
          <p className="margin-for-basket">{basketItem.size.name}</p>
          <p className="margin-for-basket">{basketItem.type.name}</p>
        </div>
        <div className="col-2">
          <p>{"£" + (basketItem.price * basketItem.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>)
  }

  checkout() {
    this.props.createBasket(this.state.basket)
    $('#' + "basket-modal").modal('hide');
    this.props.changeToCheckoutCreator()
  }

  /*render method renders components, starting by calling render list method*/
  render() {
    return (
      <div>
        {this.renderStickyBar()}
        <div className="grid-holder font">
          {this.state.listOfHeadings.map(value => this.renderList(value))}
        </div>
      </div>
    )
  }
}

/*calls render methods*/
let domContainer = document.querySelector('#container');
ReactDOM.render(<OrderCreator />, domContainer);

//generates random id to differentiate each item in order
function generateID () {
  return '_' + Math.random().toString(36).substr(2, 9);
}