const btnAddProduct = document.getElementById('btnAddProduct')
const btnEmptyList = document.getElementById('btnEmptyList')
const btnPrintList = document.getElementById('btnPrintList')
const listCurrencies = document.getElementById('listCurrencies')
const listOfItems = document.getElementById('listOfItems')
const inputItemName = document.getElementById('itemName')
const inputItemPrice = document.getElementById('itemPrice')
const inputItemQuantity = document.getElementById('itemQuantity')
const spanTotal = document.getElementById('spanTotal')
const spanNumber = document.getElementById('spanNumber')
const coinUSD = document.getElementById('usd')

let arrayOfItems = []
let arrayModifyBtn = []
let arrayEraseBtn = []
let newItem = undefined
let currentHTMLList = ""
let locale = 'en-US'
let currency = 'USD'
let priceNoFormat = undefined

addEventListener("load", ()=> {
    listCurrencies.value=document.getElementById('usd').value
})

class Item {
    constructor (id, itemName, quantity, unitPrice) {
        this.id = id;
        this.name = itemName;
        this.quantity = quantity;
        this.price = unitPrice;
        this.totalAmount = unitPrice * quantity;
    }
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getQuantity() {
        return this.quantity
    }
    getPrice() {
        return this.price
    }
    getTotal() {
        return this.totalAmount
    }
    setId(id) {
        this.id=id
    }
    setName(name) {
        this.name = name;
    }
    setTotal() {
        this.totalAmount = this.price * this.quantity;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
        this.setTotal()
    }
    setPrice(price) {
        this.price = price;
        this.setTotal()
    }
}

// const addItemToHTMLList = () => {
//         listOfItems.innerHTML = listOfItems.innerHTML + `
//         <div id="itemId${arrayOfItems[arrayOfItems.length-1].getId()}" class="item_container">
//                         <ul class="item_description">
//                             <li class="item_description__li">${arrayOfItems[arrayOfItems.length-1].getName()}</li>
//                             <li class="item_description__li">${arrayOfItems[arrayOfItems.length-1].getPrice()}</li>
//                             <li class="item_description__li">${arrayOfItems[arrayOfItems.length-1].getQuantity()}</li>
//                             <li class="item_description__li">${arrayOfItems[arrayOfItems.length-1].getTotal()}</li>
//                         </ul>
//                         <input id="btnModifyId${arrayOfItems[arrayOfItems.length-1].getId()}" class="button button--small button--modify_item" type="button" value="Modify">
//                         <input id="btnEraseId${arrayOfItems[arrayOfItems.length-1].getId()}" class="button button--small button--erase_item" type="button" value="Erase">
//                     </div>`
        
//         arrayModifyBtn.push(document.getElementById(`btnModifyId${arrayOfItems[arrayOfItems.length-1].getId()}`))
        
//         arrayEraseBtn.push(document.getElementById(`btnEraseId${arrayOfItems[arrayOfItems.length-1].getId()}`))
        
// }

const removeFromArray = (array, index) => {
    let newArray = [...array]
    newArray.splice(index,1)
    return newArray
}

const calculateTotalOfList = () => {
    let total = arrayOfItems.reduce((total, element) => total + Number(element.getTotal()), 0)
    let number = arrayOfItems.reduce((total, element) => total + Number(element.getQuantity()), 0)
    spanTotal.innerHTML = new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(total)
    spanNumber.innerHTML = `${number} items`
}

const reasignIds = () => {
    for (let i=0; i<=arrayOfItems.length-1; i++) {
        arrayOfItems[i].setId(i)
    }
}

const modifyItem = function() {
    let id = this.id[this.id.length-1]
    
    let aux = prompt('Confirm name of item: ')
    if (aux != '' && aux != null) {
        arrayOfItems[id].setName(aux)
    }
    
    aux = prompt('Confirm price of item: ')
    if (aux != '' && aux != null) {
        if (isNaN(aux)) {
            alert('Invalid entry')
        } else {
            arrayOfItems[id].setPrice(aux)
        }
    }

    aux = prompt('Confirm quantity of items: ')
    if (aux != '' && aux != null) {
        if (isNaN(aux)) {
            alert('Invalid entry')
        } else {
            arrayOfItems[id].setQuantity(aux)
        }
    }

    arrayOfItems[id].setTotal()

    arrayModifyBtn = []
    arrayEraseBtn = []

    listOfItems.innerHTML = ""

    for (let i=0;i<=arrayOfItems.length-1;i++){
        addItemToHTMLList(arrayOfItems[i])
    }
    calculateTotalOfList()
}

const eraseItem = function() {
    // Eliminar elemento de todos los array
    // Reasignar IDS de los elementos restantes de los array
    // Eliminar el html y reescribirlo con los nuevos datos

    arrayOfItems = removeFromArray(arrayOfItems, this.id[this.id.length -1])
    arrayModifyBtn = []
    arrayEraseBtn = []

    reasignIds()

    listOfItems.innerHTML = ""

    for (let i=0;i<=arrayOfItems.length-1;i++){
        addItemToHTMLList(arrayOfItems[i])
    }
    calculateTotalOfList()
}

const addItemToHTMLList = (element) => {
    // CREAMOS LOS NODOS
    let newItemContainer = document.createElement('div')
    newItemContainer.setAttribute("id", `itemId${element.getId()}`)
    newItemContainer.setAttribute("class", "item_container")
    
    let newUL = document.createElement('ul')
    newUL.setAttribute("class", "item_description")
    
    let newLIName = document.createElement('li')
    newLIName.setAttribute("class", "item_description__li")
    newLIName.innerHTML = element.getName().toUpperCase()

    let newLIPrice = document.createElement('li')
    newLIPrice.setAttribute("class", "item_description__li")
    newLIPrice.innerHTML = `${new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(element.getPrice())} each`

    let newLIQuantity = document.createElement('li')
    newLIQuantity.setAttribute("class", "item_description__li")
    if (element.getQuantity() == 1) {
        newLIQuantity.innerHTML = `( ${element.getQuantity()} item )`
    } else {
        newLIQuantity.innerHTML = `( ${element.getQuantity()} items )`
    }

    let newLITotal = document.createElement('li')
    newLITotal.setAttribute("class", "item_description__li")
    newLITotal.innerHTML = `Total: ${new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(element.getTotal())}`

    let newModifyBtn = document.createElement('input')
    newModifyBtn.setAttribute("id", `btnModifyId${element.getId()}`)
    newModifyBtn.setAttribute("class", "button button--small button--modify_item")
    newModifyBtn.setAttribute("type", "button")
    newModifyBtn.setAttribute("value", "Modify")

    let newEraseBtn = document.createElement('input')
    newEraseBtn.setAttribute("id", `btnEraseId${element.getId()}`)
    newEraseBtn.setAttribute("class", "button button--small button--erase_item")
    newEraseBtn.setAttribute("type", "button")
    newEraseBtn.setAttribute("value", "Erase")


    // AGREGAMOS LOS HIJOS
    newUL.appendChild(newLIName)
    newUL.appendChild(newLIQuantity)
    newUL.appendChild(newLIPrice)
    newUL.appendChild(newLITotal)

    newItemContainer.appendChild(newUL)
    newItemContainer.appendChild(newModifyBtn)
    newItemContainer.appendChild(newEraseBtn)

    listOfItems.appendChild(newItemContainer)


    //AGREGAMOS BOTONES DE MODIFICAR Y BORRAR A SUS ARRAYS
    arrayModifyBtn.push(newModifyBtn)
    arrayEraseBtn.push(newEraseBtn)


    //AGREGAMOS EVENT LISTENERS
    arrayModifyBtn[arrayModifyBtn.length -1].addEventListener("click", modifyItem)
    arrayEraseBtn[arrayEraseBtn.length -1].addEventListener("click", eraseItem)

}

const clearInputs = () => {
    inputItemName.value = ""
    inputItemPrice.value = ""
    inputItemQuantity.value = ""
}

const addProduct = () => {
    if (inputItemName.value != ""  && inputItemPrice.value != "" && inputItemQuantity.value != "" && priceNoFormat > 0) {
        newItem = new Item(arrayOfItems.length, inputItemName.value, inputItemQuantity.value, priceNoFormat)
    
        arrayOfItems.push(newItem)
        clearInputs()
        addItemToHTMLList(arrayOfItems[arrayOfItems.length-1])
        calculateTotalOfList()
    } else {
        alert('Information given was not valid')
    }
}

btnAddProduct.addEventListener("click", addProduct)

btnEmptyList.addEventListener("click", () => {
    listOfItems.innerHTML=""
    arrayOfItems = []
    arrayModifyBtn = []
    arrayEraseBtn = []
    calculateTotalOfList()
})

btnPrintList.addEventListener("click", ()=>{
    window.print()
})

listCurrencies.addEventListener("mousedown", ()=>{
    listCurrencies.value=""
})

listCurrencies.addEventListener("change", ()=>{
    if (listCurrencies.value == document.getElementById('usd').value) {
        locale = 'en-US'
        currency = 'USD'
        inputItemPrice.value = ""
    } else if (listCurrencies.value == document.getElementById('euro').value) {
        locale = 'en-US'
        currency = 'EUR'
        inputItemPrice.value = ""
    } else if (listCurrencies.value == document.getElementById('sol').value) {
        locale = 'en-US'
        currency = 'PEN'
        inputItemPrice.value = ""
    } else if (listCurrencies.value == document.getElementById('cpeso').value) {
        locale = 'en-US'
        currency = 'COP'
        inputItemPrice.value = ""
    } else if (listCurrencies.value == document.getElementById('mpeso').value) {
        locale = 'en-US'
        currency = 'MXN'
        inputItemPrice.value = ""
    } else {
        
    }
    arrayModifyBtn = []
    arrayEraseBtn = []
    listOfItems.innerHTML = ""
    for (let i=0;i<=arrayOfItems.length-1;i++){
        addItemToHTMLList(arrayOfItems[i])
    }
    calculateTotalOfList()
})

listCurrencies.addEventListener("focusout", ()=>{
    if (listCurrencies.value == "") {
        listCurrencies.value = document.getElementById('usd').value
        locale = 'en-US'
        currency = 'USD'
        arrayModifyBtn = []
        arrayEraseBtn = []
        listOfItems.innerHTML = ""
        for (let i=0;i<=arrayOfItems.length-1;i++){
            addItemToHTMLList(arrayOfItems[i])
        }
        calculateTotalOfList()
    }
})

inputItemPrice.addEventListener("focusout" , ()=>{
    if (isNaN(inputItemPrice.value)){
        inputItemPrice.value=""
        priceNoFormat=0
    } else {
        priceNoFormat = inputItemPrice.value
        inputItemPrice.value=new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(priceNoFormat)
    }
})

inputItemPrice.addEventListener("mousedown" , ()=>{
    inputItemPrice.value=""
})