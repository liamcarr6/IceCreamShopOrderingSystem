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



class Address {
  constructor(firstLine, secondLine, thirdLine, city, postcode) {
    this.firstLine = firstLine;
    this.secondLine = secondLine;
    this.thirdLine = thirdLine
    this.city = city;
    this.postcode = postcode
  }
}

class OrderInformation {
  constructor(firstName, lastName, address, telephoneNumber, deliveryType) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.telephoneNumber = telephoneNumber
    this.address = address;
    this.deliveryType = deliveryType
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
class CheckoutCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: this.props.basketFromOrderCreator,
      checkoutButtonState: false,
      isDelivery: "delivery",
      orderInfo: new OrderInformation("", "", new Address("", "", "", "", ""), "", ""),
      latLngOfShop: "",
      latLngOfCustomer: ""
    }

    //methods bindings
    this.generateOptions = this.generateOptions.bind(this)
    this.makeAddressForm = this.makeAddressForm.bind(this)
    this.onDeliveryRadioChange = this.onDeliveryRadioChange.bind(this)
    this.renderItemInBasket = this.renderItemInBasket.bind(this)
    this.calculateDelivery = this.calculateDelivery.bind(this)
    this.calculateTotalBasketPrice = this.calculateTotalBasketPrice.bind(this)

    this.onQuantityDropdownChange = this.onQuantityDropdownChange.bind(this)
    this.goToPayment = this.goToPayment.bind(this)

    this.setPostcode = this.setPostcode.bind(this)
    this.setCity = this.setCity.bind(this)
    this.setLineOne = this.setLineOne.bind(this)
    this.setLineTwo = this.setLineTwo.bind(this)
    this.setLineThree = this.setLineThree.bind(this)

    this.setFirstName = this.setFirstName.bind(this)
    this.setSecondName = this.setSecondName.bind(this)
    this.setTelephone = this.setTelephone.bind(this)

    this.calculateLatLongOfCustomer = this.calculateLatLongOfCustomer.bind(this)
    this.calculateLatLongOfShop = this.calculateLatLongOfShop.bind(this)
  }

  calculateLatLongOfShop () {
    var anHttpRequest = new XMLHttpRequest();

    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
       
     var json = JSON.parse(anHttpRequest.responseText);
     var results = json.results;
     let value = results[0].geometry.location

      this.setState({
        latLngOfShop: value
      }) 
    }.bind(this)

    anHttpRequest.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=NE250DN&key=AIzaSyCtm2q6b--0Sj-tPVXVf54WvZpvGPAGo4M", false);

    anHttpRequest.send(null);
  }

   calculateLatLongOfCustomer (aUrl) {
    var anHttpRequest = new XMLHttpRequest();

    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
      var json = JSON.parse(anHttpRequest.responseText);
      var results = json.results;
      let value = results[0].geometry.location

      this.setState({
        latLngOfCustomer: value
      })  

    }.bind(this)

    anHttpRequest.open("GET", aUrl, false);

    anHttpRequest.send(null);
  }

  generateOptions() {
    var arr = [];
    for (let i = 0; i <= 99; i++) {
      arr.push(<option key={i} value={i}>{i}</option>)
    }
    return arr;
  }


  onDeliveryRadioChange(event) {
    let valueToSet = event.target.value

    this.setState({
      isDelivery: valueToSet
    })
  }

  onQuantityDropdownChange(e, basketItem) {
    if (e.target.value == 0) {
      this.setState(prevState => ({
        basket: prevState.basket.filter(value => value !== basketItem)
      }));
    } else {
      basketItem.quantity = e.target.value
      this.setState({
        basket: [...this.state.basket]
      })
    }
  }

  calculateTotalBasketPrice() {
    var sum = 0;

    for (var i = 0; i < this.state.basket.length; i++) {
      sum = (this.state.basket[i].price * this.state.basket[i].quantity) + sum
    }

    return sum
  }

  setFirstName(event) {
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.firstName = event;
      return { orderInfo };
    })
  }

  setSecondName(event) {
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.setSecondName = event;
      return { orderInfo };
    })
  }

  setTelephone(event) {
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.telephoneNumber = event;
      return { orderInfo };
    })
  }

  setPostcode(event) {
    this.calculateLatLongOfCustomer("https://maps.googleapis.com/maps/api/geocode/json?address=" + event + "&key=AIzaSyCtm2q6b--0Sj-tPVXVf54WvZpvGPAGo4M")
    this.calculateLatLongOfShop()
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.address.postcode = event;
      return { orderInfo };
    })
  }

  setCity(event) {
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.address.city = event;
      return { orderInfo };
    })
  }

  setLineOne(event) {
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.address.firstLine = event;
      return { orderInfo };
    })
  }

  setLineTwo(event) {
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.address.secondLine = event;
      return { orderInfo };
    })
  }

  setLineThree(event) {
    this.setState(prevState => {
      let orderInfo = Object.assign({}, prevState.orderInfo);
      orderInfo.address.thirdLine = event;
      return { orderInfo };
    })
  }


  makeAddressForm() {
    if (this.state.isDelivery == "delivery") {
      return (<div>
        <div className="col-12">

          <div className="col-12 no-margin-div basket-title-border">
            <h5 className="header-font">Address Info</h5>

          </div>
        </div>

        <div className="col-12 margin-for-div padding-for-contact">
          <div id="postcode_lookup_field"></div>
        </div>

        <div className="col-12 margin-for-div">
          <div className="container">
            <div className="row">
              <div className="col-12 no-margin-div">
                <label>Address Line One*</label>
              </div>
              <div className="col-12 no-margin-div">
                <input onChange={event => this.setLineOne(event.target.value)} className="form-control max-width-div" id="first_line" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 margin-for-div">
          <div className="container">
            <div className="row">
              <div className="col-12 no-margin-div">
                <label>Address Line Two</label>
              </div>
              <div className="col-12 no-margin-div">
                <input onChange={event => this.setLineTwo(event.target.value)} className="form-control max-width-div" id="second_line" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 margin-for-div">
          <div className="container">
            <div className="row">
              <div className="col-12 no-margin-div">
                <label>Address Line Three</label>
              </div>
              <div className="col-12 no-margin-div">
                <input onChange={event => this.setLineThree(event.target.value)} className="form-control max-width-div" id="third_line" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 margin-for-div">
          <div className="container">
            <div className="row">
              <div className="col-12 no-margin-div">
                <label>City</label>
              </div>
              <div className="col-12 no-margin-div">
                <input onChange={event => this.setCity(event.target.value)} className="form-control" id="post_town" type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 margin-for-div">
          <div className="container">
            <div className="row">
              <div className="col-12 no-margin-div">
                <label>Postcode*</label>
              </div>
              <div className="col-12 no-margin-div">
                <input onChange={event => this.setPostcode(event.target.value)} className="form-control" id="postcode" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>)
    } else {
      return (
        <div></div>
      )
    }
  }


  renderItemInBasket(item) {

    return (
      <div className="basket-item-border">
        <div className="nopadding">
          <div className="container nopadding ">
            <div className="row container nopadding nopadding">
              <div className="col-4 nopadding">
                <h6 className="item-in-basket-margin item-in-basket-margin header-font">{item.iceCream.name}</h6>
              </div>
              <div className="col-3 my-auto nopadding text-left">
                <p className="item-in-basket-margin">{item.size.name}</p>
                <p className="item-in-basket-margin">{item.type.name}</p>
              </div>
              <div className="col-2 text-center my-auto">
                <select onChange={(e) => {
                  this.onQuantityDropdownChange(e, item)
                }} value={item.quantity} className="form-select" aria-label="Default select example">
                  {this.generateOptions()}
                </select>
              </div>
              <div class="col-3 my-auto text-right nopadding">
                <h6>{"£" + (item.size.value * item.quantity).toFixed(2)}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  goToPayment(event) {

   
    let lngOfCustomer = this.state.latLngOfCustomer.lng
    let latOfCustomer = this.state.latLngOfCustomer.lat
    let lngOfShop = this.state.latLngOfShop.lng
    let latOfShop = this.state.latLngOfShop.lat

    let distanceFromShop = distance(latOfCustomer,lngOfCustomer,latOfShop,lngOfShop,"M")

    var isAValidOrder = true
    var dateOfOrder = new Date()

    if(dateOfOrder.getHours()==17 && dateOfOrder.getMinutes()>45) {
      alert("We are now closed for orders. Ordering times are 11am-5.45pm.")
      isAValidOrder = false
    }

    if(dateOfOrder.getHours()>=18) {
      alert("We are now closed for orders. Ordering times are 11am-5.45pm.")
      isAValidOrder = false
    }

    if(dateOfOrder.getHours()<11) {
      alert("We are now closed for orders. Ordering times are 11am-5.45pm.")
      isAValidOrder = false
    }

    if (this.state.isDelivery == "delivery") {

      if (distanceFromShop == 0 || distanceFromShop =="undefined") {
        alert("Please put in a real postcode!")
        isAValidOrder = false
    }

      if(distanceFromShop>5) {
        alert("Postode too far away! Either enter a closer address or collect!")
        isAValidOrder = false
      }

      if (this.state.orderInfo.address.firstLine === "") {
        alert("Fill in first line of address form!")
        isAValidOrder = false
      }
      if (this.state.orderInfo.address.postcode === "") {
        alert("Fill in the postcode of the address form!")
        isAValidOrder = false
      }

      if (this.state.basket.length <= 0) {
        alert("Basket is empty! Go back to order!")
        isAValidOrder = false
      }

      if (this.state.orderInfo.firstName === "") {
        alert("Fill in the first name field!")
        isAValidOrder = false
      }

      if (this.state.orderInfo.telephoneNumber === "") {
        alert("Fill in the telephone field!")
        isAValidOrder = false
      }

    } else {
      if (this.state.isDelivery == "collection") {
        if (this.state.orderInfo.firstName === "") {
          alert("Fill in the first name field!")
          isAValidOrder = false
        }

        if (this.state.orderInfo.telephoneNumber === "") {
          alert("Fill in the telephone field!")
          isAValidOrder = false
        }

        if (this.state.basket.length <= 0) {
          alert("Basket is empty! Go back to order!")
          isAValidOrder = false
        }
      }

      if (isAValidOrder) {
        //go to payment !
      }
    }
  }

  calculateDelivery() {
    if (this.state.isDelivery === "delivery") {
      return 2;
    } else {
      return 0;
    }
  }

  /*render method renders components, starting by calling render list method*/
  render() {
    return (
      <div className="container">
        <div className="col-12 margin-for-div">
          <div className="container">
            <div className="row">
              <div className="col-12 no-margin-div ">
                <h2 className="header-font">Checkout</h2>
                <p>Have an account? <a href="url">Login!</a> Want an account? <a href="url">Register!</a> </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="container">
              <div className="row">

                <div id="deliveryTypeRadio" className="margin-for-button-group col-12">
                  <label class=" make-clickable" onChange={(event) => this.onDeliveryRadioChange(event)} >
                    <input checked={this.state.isDelivery === "delivery"} value="delivery" type="radio" name="options1" autocomplete="off" /> Delivery
                      </label>
                  <label className="make-clickable radio-margin-left" onChange={(event) => this.onDeliveryRadioChange(event)} >
                    <input className="radio-margin-left" checked={this.state.isDelivery === "collection"} value="collection" type="radio" name="options2" autocomplete="off" /> Collection
                    </label>

                </div>

                <div className="col-12">

                  <div className="col-12 no-margin-div basket-title-border">
                    <h5 className="header-font">Contact Info</h5>

                  </div>
                </div>

                <div className="col-6 margin-for-div padding-for-contact">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 no-margin-div">
                        <label >First Name*</label>
                      </div>
                      <div className="col-12 no-margin-div">
                        <input onChange={event => this.setFirstName(event.target.value)} className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 margin-for-div padding-for-contact">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 no-margin-div">
                        <label>Last Name</label>
                      </div>
                      <div className="col-12 no-margin-div">
                        <input onChange={event => this.setSecondName(event.target.value)} className="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 margin-for-div larger-margin-for-telephone">
                  <div className="container">
                    <div className="row">
                      <div className="col-12 no-margin-div">
                        <label>Telephone Number*</label>
                      </div>
                      <div className="col-12 no-margin-div">
                        <input onChange={event => this.setTelephone(event.target.value)} className="max-width-div form-control" id="telephone_number" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 margin-for-div nopadding">
                  {this.makeAddressForm()}
                </div>

              </div>
            </div>
          </div>

          <div className="col-1"></div>

          <div className="col-4 nopadding ">
            <h5 className="header-font">Your Order</h5>
            {this.state.basket.map(item => this.renderItemInBasket(item))}
            <div className="basket-item-border">
              <div className="nopadding">
                <div className="container nopadding ">
                  <div className="row container nopadding nopadding">
                    <div className="col-3 nopadding">
                      <p>Subtotal</p>
                    </div>
                    <div className="col-4 my-auto nopadding text-left">

                    </div>
                    <div className="col-2 text-center my-auto">

                    </div>
                    <div class="col-3 my-auto text-right nopadding">
                      <h6 className="label">{"£" + this.calculateTotalBasketPrice().toFixed(2)}</h6>
                    </div>
                  </div>
                  <div className="row container nopadding nopadding">
                    <div className="col-3 nopadding">
                      <p>Delivery</p>
                    </div>
                    <div className="col-4 my-auto nopadding text-left">

                    </div>
                    <div className="col-2 text-center my-auto">

                    </div>
                    <div class="col-3 my-auto text-right nopadding">
                      <h6 className="label">{"£" + this.calculateDelivery().toFixed(2)}</h6>
                    </div>
                  </div>
                  <div className="row container nopadding nopadding">
                    <div className="col-3 nopadding">
                      <p className="label">Total</p>
                    </div>
                    <div className="col-4 my-auto nopadding text-left">

                    </div>
                    <div className="col-2 text-center my-auto">

                    </div>
                    <div className="col-3 my-auto text-right nopadding">
                      <h6 className="label">{"£" + (this.calculateTotalBasketPrice() + this.calculateDelivery()).toFixed(2)}</h6>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            <div className="col-12 checkout-button-margin">
              <button onClick={(event) => this.goToPayment(event)} className="btn btn-success max-width-div label">Go to Payment</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

/*calls render methods*/
let domContainer = document.querySelector('#container');
ReactDOM.render(<CheckoutCreator />, domContainer);

//generates random id to differentiate each item in order
function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
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
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}

