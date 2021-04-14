const DELIVERY = 1
const COLLECTION = 2
const EAT_IN = 3

const ORDER_TYPE_CHOOSER = 1
const ORDER_CREATOR = 2
const CHECKOUT_CREATOR = 3

class ReactParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            basket: [],
            reactComponent: ORDER_TYPE_CHOOSER
        };

        //method for controlling state from children
        this.changeToOrderCreator = this.changeToOrderCreator.bind(this)
        this.changeToCheckoutCreator = this.changeToCheckoutCreator.bind(this)
        this.createBasket = this.createBasket.bind(this)
    }

    changeToOrderCreator() {
        this.setState({
            reactComponent: ORDER_CREATOR
        })
    }

    changeToCheckoutCreator() {
        this.setState({
            reactComponent: CHECKOUT_CREATOR
        })
    }

    createBasket(newBasket) {
        this.setState({
            basket: newBasket
        })
    }


    render() {
        if (this.state.reactComponent == ORDER_TYPE_CHOOSER) {
            return (<div>
                <OrderTypeChooser changeToOrderCreator={this.changeToOrderCreator} />
            </div>)
        } else if (this.state.reactComponent == ORDER_CREATOR) {
            return (<div>
                <OrderCreator createBasket={this.createBasket} changeToCheckoutCreator={this.changeToCheckoutCreator} />
            </div>)
        } else if (this.state.reactComponent == CHECKOUT_CREATOR) {
            return (<div>
                <CheckoutCreator basketFromOrderCreator = {this.state.basket} />
            </div>)
        }
    }
}

let domContainer = document.querySelector('#react_parent');
ReactDOM.render(<ReactParent />, domContainer);