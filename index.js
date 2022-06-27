let myItems = []

const itemEl = document.getElementById("item-el")
const quantEl = document.getElementById("quant-el")

const addBtn = document.getElementById("add-btn")
const clrBtn = document.getElementById("clr-btn")
const selBtn = document.getElementById("sel-btn")

let itemsFromLocalStorage = JSON.parse(localStorage.getItem("myItems"))

const ulEl = document.getElementById("ul-el")

if (itemsFromLocalStorage) {
    myItems = itemsFromLocalStorage
    render(myItems)
}

function render(items) {
    let listItems = ""
    for (let i = 0; i < items.length; i++){
       listItems += `
            <li>
            <dl class = 'item'>
                    <dt> <input type="checkbox" class = 'box'> ${items[i].item}, ${items[i].quant}</dt>
                 </dl>
            </li>
            `
    }
    ulEl.innerHTML = listItems
}

function deleteSelected(myitems){
    let boxes = document.getElementsByClassName('box')
    let tempItems = []
    for (let i = 0; i < boxes.length; i++){
        box = boxes[i]
        if(box.checked){
            myItems[i] = null
        }
    }

    for (let i = 0; i < myItems.length; i++){
        if (myItems[i] != null) {
            tempItems.push(myItems[i])
        }
    }
    myItems = []
    myItems = tempItems
    localStorage.clear()
    localStorage.setItem("myItems", JSON.stringify(myItems))
    render(myItems)
}

addBtn.addEventListener("click", function() {
    let obItem = {
        item: itemEl.value,
        quant: quantEl.value
    }
    myItems.push(obItem)
    itemEl.value = ""
    quantEl.value = ""
    localStorage.setItem("myItems", JSON.stringify(myItems))
    render(myItems)
})

selBtn.addEventListener("click", function() {
    deleteSelected(myItems)
})

clrBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myItems = []
    render(myItems)
})
