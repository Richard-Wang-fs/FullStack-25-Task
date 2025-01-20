const commoditiesName = ["Apple", "Banana", "Orange", "Strawberry", "Grape", "Pineapple", "Watermelon", "Mango", "Lemon", "Peach", "Plum", "Persimmon", "Dragon Fruit", "Kiwi"];

class commodity {
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}

class commodityInCart {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.amount = price*quantity;
    }
    printToConsole () {
        console.log(`Name:${this.name} Price:${this.price} Quantity:${this.quantity} Amount:${this.amount}`)
    }
}

let allCommodities = [];

let addedCommodities = [];

let amount = 0;

function getPrice(name) {
    let commo = allCommodities.find(c => c.name === name);
    if (commo) {
        return commo.price;
    }
    return null
}

class shoppingCart {
    constructor() {
        this.commodities = new Map();
        this.amount = 0;
    }
    addCommodity (name) {
        if (this.commodities.has(name)) {
            this.commodities.set(name, this.commodities.get(name)+1); // 如果商品已存在，则增加数量
        } else 
            if (this.commodities.size >= 5) {
                alert("MORE THAN 5 ITEMS!");
            } else {
                this.commodities.set(name, 1); // 如果商品不存在，则添加新项
            }
            
        }
    removeCommodity (name) {
        if (this.commodities.has(name)) {
            this.commodities.set(name, this.commodities.get(name)-1);
            if (this.commodities.get(name) === 0){
                this.commodities.delete(name);
            }
        } else {
            console.log(`${name} not in cart`);
        }
    }
    checkCommodity(name) {
        if (this.commodities.has(name)){
            console.log(`Find commodity:`)
            let comm = new commodityInCart(name, getPrice(name), this.commodities.get(name))
            comm.printToConsole();

        }
    }
    printAllCommodities() {
        if (this.commodities.size > 0) {
            console.log(`Shopping Cart List:`);
            for (let [name, qua] of this.commodities) {
                let comm = new commodityInCart(name, getPrice(name), qua)
                comm.printToConsole();
            }
        } else {
            console.log(`The cart is empty!`)
        }
       
    }

}



function generateAllCommodities() {
    let commodities = [...commoditiesName];
    for (;commodities.length > 0;) {
        let randomIndex = Math.floor(Math.random() * commodities.length)
        allCommodities.push(new commodity(commodities[randomIndex], Math.floor(Math.random()*9+1)))
        commodities.splice(randomIndex, 1)
    }
}

function generateShowcaseList() {
    const showcaseList = document.getElementById("showcaseList");
    showcaseList.innerHTML = ""; 

    allCommodities.forEach((commo, index) => {
        let backgroundColor = 'aqua'
        if (index%2==1){
            backgroundColor = "withe"
        }
        
        const itemDiv = document.createElement("li");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
            <li style = "background-color: ${backgroundColor}">
                <span>${commo.name} - $${commo.price}</span>
                <button style="float: right" onclick="addToCart('${commo.name}', ${commo.price})">add</button>
            </li>
        `;
        showcaseList.appendChild(itemDiv);
    });
}

const cart = new shoppingCart();

function addToCart (name, price) {
    addedCommodities.push(name);
    amount += price;
    cart.addCommodity(name);

}

function removeLastItem() {
    if (addedCommodities.length > 0) {
        lastItemName = addedCommodities[addedCommodities.length-1];
        addedCommodities.pop();
    
        cart.removeCommodity(lastItemName);
         amount -= getPrice(lastItemName)
    }
}

function listItems() {
    cart.printAllCommodities();
}

window.onload = function() {
    generateAllCommodities();
    generateShowcaseList();
}
