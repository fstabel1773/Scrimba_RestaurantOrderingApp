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
            <h3>Thank you ${getFormData()}, your order is on it's way!</h3>
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
            <h3>Your order</h3>
        `

        order.forEach((item, index) => {
            orderHtml += `
                <h3>${item.name}</h3>
                <button data-order-id="${index}">remove</button>
                <p>${item.price}</p>
            `;
            totalPrice += item.price
        })

        orderHtml += `
            <h3>Total price:<h3>
            <p>${totalPrice}</p>
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
                <input type="text" name="name" placeholder="Enter your name" required />
                <input type="" name="cardNumber" placeholder="Enter card number" pattern="" required />
                <input type="" name="cvv" placeholder="CVV" pattern="" required />
                <div class="payment-btns">
                    <input type="button" onclick="" class="payment-confirm-btn" id="payment-confirm-btn" value="Pay" />
                    <input type="button" onclick="" class="payment-breakup-btn" id="payment-breakup-btn" value="Go back" />
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