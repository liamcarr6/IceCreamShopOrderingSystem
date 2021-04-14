'use strict';

/*constants for state*/
const DELIVERY = 1
const COLLECTION = 2
const EAT_IN = 3


//constants for states
const ORDER_TYPE_CHOOSER = 1
const ORDER_CREATOR = 2
const CHECKOUT_CREATOR = 3

/*React component class, similar to Java*/
class OrderTypeChooser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: DELIVERY,
            latLngOfShop: "",
            latLngOfCustomer: ""
        };

        this.calculateLatLongOfCustomer = this.calculateLatLongOfCustomer.bind(this)
        this.calculateLatLongOfShop = this.calculateLatLongOfShop.bind(this)
        this.setPostcode = this.setPostcode.bind(this)
    }

    /*regex checks for html that uses links, and deactivates the links (so tabs don't referesh entire page*/
    componentDidMount() {
        document.querySelectorAll("a[href^='#']").forEach(node => {
            node.addEventListener('click', e => {
                e.preventDefault();
            });
        })
    }

    calculateLatLongOfShop() {
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

    calculateLatLongOfCustomer(aUrl) {
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

    setPostcode(event) {
        this.calculateLatLongOfCustomer("https://maps.googleapis.com/maps/api/geocode/json?address=" + event + "&key=AIzaSyCtm2q6b--0Sj-tPVXVf54WvZpvGPAGo4M")
        this.calculateLatLongOfShop()
    }

    goToNextPage() {
        var isAValidOrder = true
        let lngOfCustomer = this.state.latLngOfCustomer.lng
        let latOfCustomer = this.state.latLngOfCustomer.lat
        let lngOfShop = this.state.latLngOfShop.lng
        let latOfShop = this.state.latLngOfShop.lat
        var dateOfOrder = new Date()



        let distanceFromShop = distance(latOfCustomer, lngOfCustomer, latOfShop, lngOfShop, "M")
        console.log(distanceFromShop)


        if (dateOfOrder.getHours() == 17 && dateOfOrder.getMinutes() > 45) {
            alert("We are now closed for orders. Ordering times are 11am-5.45pm.")
            isAValidOrder = false
        }

        if (dateOfOrder.getHours() >= 18) {
            alert("We are now closed for orders. Ordering times are 11am-5.45pm.")
            isAValidOrder = false
        }

        if (dateOfOrder.getHours() < 11) {
            alert("We are now closed for orders. Ordering times are 11am-5.45pm.")
            isAValidOrder = false
        }

        if (this.state.selected == DELIVERY) {

            if (distanceFromShop == 0 || distanceFromShop =="undefined") {
                alert("Please put in a real postcode!")
                isAValidOrder = false
            }

            if (distanceFromShop > 5) {
                alert("Postode too far away! Either enter a closer address or collect!")
                isAValidOrder = false
            }
        }

        if(isAValidOrder) {
            this.props.changeToOrderCreator
        }

    }


    /*render method renders components. This will change when the state is changed by clicking the 
    on-click buttons. This will in turn change the contents of  the box, and the appearance of the
    tabs*/
    render() {
        if (this.state.selected == DELIVERY) {
            return <div class="nested-view-width mx-auto">
                <ul class="nav nav-tabs">
                    <li class="left-tab nav-item delivery-collection">
                        <a class="nav-link delivery-collection delivery-collection-tabs text-center" href="#" onClick={() => this.setState({ selected: DELIVERY })} ><i class="fas fa-truck"></i> Delivery</a>
                    </li>
                    <li class="middle-tab nav-item deactive-tab">
                        <a class="deactive-tab nav-link text-center" href="#" onClick={() => this.setState({ selected: COLLECTION })}><i class="fas fa-hand-holding"></i> Collection</a>
                    </li>
                    <li class="right-tab nav-item deactive-tab">
                        <a class="deactive-tab nav-link  text-center" href="#" onClick={() => this.setState({ selected: EAT_IN })}><i class="fas fa-utensils"></i> Eat-In</a>
                    </li>
                </ul>
                <div class="tab-box delivery-collection tab-box-text">
                    <h5 class="delivery-collection delivery-font">CONTACT-FREE DELIVERY</h5>
                    <p>Our deliveries are carried out in a way that guarantees the safety of our customers and drivers. All orders will need to be paid online by credit/debit card.</p>
                    <div class="input-group mb-3">
                        <input onChange={event => this.setPostcode(event.target.value)} type="text" class="form-control" placeholder="Postcode" aria-label="Postcode" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                            <button onClick={(event) => this.goToNextPage(event)} class="btn btn-outline-secondary" type="button">Start my Order</button>
                        </div>
                    </div>
                </div>
            </div>
        } else if (this.state.selected == COLLECTION) {
            return <div class="nested-view-width mx-auto">
                <ul class="nav nav-tabs">
                    <li class="left-tab nav-item deactive-tab">
                        <a class="deactive-tab nav-link text-center" href="#" onClick={() => this.setState({ selected: DELIVERY })}><i class="fas fa-truck"></i> Delivery</a>
                    </li>
                    <li class="middle-tab nav-item delivery-collection">
                        <a class="nav-link delivery-collection delivery-collection-tabs text-center" href="#" onClick={() => this.setState({ selected: COLLECTION })}><i class="fas fa-hand-holding"></i> Collection</a>
                    </li>
                    <li class="right-tab nav-item deactive-tab">
                        <a class="deactive-tab nav-link text-center" href="#" onClick={() => this.setState({ selected: EAT_IN })}><i class="fas fa-utensils"></i> Eat-In</a>
                    </li>
                </ul>
                <div class="tab-box delivery-collection tab-box-text">
                    <h5 class="delivery-collection">CONTACT-FREE COLLECTION</h5>
                    <p>Our restaurant is operating contact-free collection following government guidelines and regulations. Click below to place your order.</p>
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <button onClick={(event) => this.goToNextPage(event)} class="btn btn-outline-secondary" type="button">Start my Order</button>
                        </div>
                    </div>
                </div>
            </div>
        } else {
            return <div class="nested-view-width mx-auto">
                <ul class="nav nav-tabs">
                    <li class="left-tab nav-item deactive-tab">
                        <a class="deactive-tab nav-link text-center" href="#" onClick={() => this.setState({ selected: DELIVERY })}><i class="fas fa-truck"></i> Delivery</a>
                    </li>
                    <li class="middle-tab nav-item deactive-tab">
                        <a class="deactive-tab nav-link text-center" href="#" onClick={() => this.setState({ selected: COLLECTION })}><i class="fas fa-hand-holding" ></i> Collection</a>
                    </li>
                    <li class="right-tab nav-item delivery-collection">
                        <a class="nav-link delivery-collection delivery-collection-tabs text-center" href="#" onClick={() => this.setState({ selected: EAT_IN })}><i class="fas fa-utensils"></i> Eat-In</a>
                    </li>
                </ul>
                <div class="tab-box delivery-collection tab-box-text">
                    <h5 class="delivery-collection">Eat-In</h5>
                    <p>Unforunately due to current circumstances we cannot allow customer's to eat on the premises. Collection and delivery are still available.</p>

                </div>
            </div>
        }

    }
}

/*calls render methods*/
let domContainer = document.querySelector('#container');
ReactDOM.render(<OrderTypeChooser />, domContainer);

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