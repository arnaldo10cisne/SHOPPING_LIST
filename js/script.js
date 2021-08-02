const btnAddProduct = document.getElementById('btnAddProduct')
const listOfItems = document.getElementById('listOfItems')
const btnEmptyList = document.getElementById('btnEmptyList')

const itemTemplate = `
<div class="item_container">
                <ul class="item_description">
                    <li class="item_description__li">Name</li>
                    <li class="item_description__li">Unit price</li>
                    <li class="item_description__li">Quantity</li>
                    <li class="item_description__li">Total</li>
                </ul>
                <input class="button button--small button--modify_item" type="button" value="Modify item">
                <input class="button button--small button--erase_item" type="button" value="Erase item">
            </div>`

const addTemplate = () => {
    listOfItems.innerHTML = listOfItems.innerHTML + itemTemplate
}

btnAddProduct.addEventListener("click", addTemplate)

btnEmptyList.addEventListener("click", () => {
    listOfItems.innerHTML=""
})