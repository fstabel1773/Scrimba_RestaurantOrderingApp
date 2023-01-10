import { menuArray } from "./data.js"




render();

function render() {
    document.getElementById("offer-section").innerHTML = getOfferHtml();
    // function for rendering order-summary
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
            <button class="add-btn">+</button>
        </div>
        `
    })
    return offerHtml
}