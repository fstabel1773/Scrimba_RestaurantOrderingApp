import { menuArray } from "./data.js"

let order = [];
let isReadyToPay = false;
let isOrderFinished = false;


document.addEventListener('click', (event) => {
    if (event.target.dataset.id) {
        handleAddBtn(event.target.dataset.id)
    } else if (event.target.dataset.orderId) {
        handleRemoveBtn(event.target.dataset.orderId)
    } else if (event.target.id === "complete-order-btn") {
        handleCompleteOrderBtn()
    } else if (event.target.id === "payment-breakup-btn") {
        handlePaymentBreakUpBtn()
    } else if (event.target.id === "payment-confirm-btn") {
        handlePaymentCompleteBtn()
    } else if (event.target.id === "new-order-btn") {
        handleNewOrderBtn()
    }
})

function handleAddBtn(itemId) {
    menuArray.forEach((item) => {
        if (itemId == item.id) {
           order.push(item)
        }
    })
    render()
}

function handleRemoveBtn(orderId) {
    order = order.filter((item, index) => {
        return index != orderId
    })
    render()
}

function handleCompleteOrderBtn() {
    isReadyToPay = true;
    render()
}

function handlePaymentBreakUpBtn() {
    isReadyToPay = false;
    render()
}

function handlePaymentCompleteBtn() {
    order = [];
    isReadyToPay = false;
    isOrderFinished = true;
    render()
}

function handleNewOrderBtn() {
    isOrderFinished = false;
    render()
}

function getFormData() {
    const paymentData = new FormData(document.getElementById("payment-form"))
    return paymentData.get("name")
}



render();

function render() {
    document.getElementById("offer-section").innerHTML = getOfferHtml();
    document.getElementById("order-section").innerHTML = getOrderHtml();
    document.getElementById("payment-section").innerHTML = getPaymentFormHtml();
};

function getOfferHtml() {
    let offerHtml = ``

    menuArray.forEach((menuItem) => {
        offerHtml+=`
        <div class="menuItem">
            <img class="item-pic" src="${menuItem.image}" alt="${menuItem.name} symbol" >
            <div class="offer-description">
                <h3 class="item item-title">${menuItem.name}</h3>
                <p class="item item-description">${menuItem.ingredients}</p> 
                <p class="item item-prize">$ ${menuItem.price}</p>
            </div>
            <button class="add-btn" data-id="${menuItem.id}">+</button>
        </div>
        `
    })

    if (isOrderFinished === true) {
        offerHtml+=`
            <h3 class="order-confirm">Thank you ${getFormData()}, your order is on it's way!</h3>
            <input type="button" onclick="" class="new-order-btn" id="new-order-btn" value="New Order" />
        `
    }
    return offerHtml
}


function getOrderHtml() {
    let orderHtml = ``

    if (order.length > 0) {
        let totalPrice = 0

        orderHtml = `
            <h3 class="order-section-title">Your order</h3>
        `

        order.forEach((item, index) => {
            orderHtml += `
                <div class="order-item">
                    <h3 class="order-name">${item.name}</h3>
                    <button class="order-section-item-remove-btn" data-order-id="${index}">remove</button>
                    <p class="order-price">$ ${item.price}</p>
                </div>
            `;
            totalPrice += item.price
        })

        orderHtml += `
            <div class="divider"></div>
            <div class="order-item">
                <h3 class="order-name">Total price:<h3>
                <p class="order-price">$ ${totalPrice}</p>
            </div>
            <button id="complete-order-btn">Complete order</button>
        `
    }
    return orderHtml
}

function getPaymentFormHtml() {
    let paymentForm = ``

    if (isReadyToPay === true) {
        paymentForm = `
            <form class="payment-form" id="payment-form">
                <h3>Enter card details</h3>
                <input type="text" name="name" placeholder="Enter your name" />
                <input type="text" name="cardNumber" placeholder="Enter card number" />
                <input type="text" name="cvv" placeholder="CVV" />
                <div class="payment-btns">
                    <input type="submit"  class="payment-confirm-btn" id="payment-confirm-btn" value="Pay" />
                    <input type="button" class="payment-breakup-btn" id="payment-breakup-btn" value="Go back" />
                </div>
            </form>
        `
    }
    return paymentForm
}


/* first attempt 

let order = [...menuArray]


document.addEventListener('click', (event) => {
    if (event.target.dataset.id) {
        handleAddBtn(event.target.dataset.id)
    }
})


function handleAddBtn(itemId) {
    order.forEach((item) => {
        if(itemId == item.id) {
           if(!item.amount) {
                item.amount = 1;
            } else {
                item.amount = item.amount + 1;
            }
        }
    })
    console.log(order)
    render()
}


render();

function render() {
    document.getElementById("offer-section").innerHTML = getOfferHtml();
    document.getElementById("order-section").innerHTML = getOrderHtml();
};

function getOfferHtml() {
    let offerHtml = ``

    menuArray.forEach((menuItem) => {
        offerHtml+=`
        <div class="menuItem">
            <img class="item-pic" src="${menuItem.image}" alt="${menuItem.name} symbol" >
            <div class="offer-description">
                <h3 class="item item-title">${menuItem.name}</h3>
                <p class="item item-description">${menuItem.ingredients}</p> 
                <p class="item item-prize">$ ${menuItem.price}</p>
            </div>
            <button class="add-btn" data-id="${menuItem.id}">+</button>
        </div>
        `
    })
    return offerHtml
}


function getOrderHtml() {
    let orderHtml = ``

    if (!order.filter((item) => {
        return item.amount > 0
        }).length > 0) {
            return orderHtml
    } else {
        orderHtml += `
            <h3>Your order</h3>
        `

        
    }

    order.forEach((menuItem) => {
        let menuItemAmount = ``

        if (menuItem.amount) {
            menuItemAmount = `
            <div>${menuItem.amount} x ${menuItem.name}</div>
            <div> remove </div>
            <div>$ ${menuItem.price}</div>
            `    
        }
        
    })
    return orderHtml
}
*/