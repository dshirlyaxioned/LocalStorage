let form = document.querySelector('.form');
let saveBtn = document.querySelector('.save');
let itemText = document.querySelector('.item');
let quantityText = document.querySelector('.quantity');
let textLength = /^[A-Za-z. ]{3,30}$/;
let numLength = /^[0-9]*$/;

//error message function
let errorMsg = (input, message) => {
    var formControl = input.parentElement;
    if(formControl.classList.contains('success')) {
        formControl.classList.remove('success');
    }
    var small = input.nextElementSibling;
    small.innerText = message;
    if(!formControl.classList.contains('error'))
    formControl.className += ' error';
}

//success message function
let successMsg = (input) => {
    var formControl = input.parentElement;
    if(formControl.classList.contains('error')) {
        formControl.classList.remove('error');
    }
    if(!formControl.classList.contains('success'))
    formControl.className += ' success';
}

//form validation 
let inputValue = (e) => {
    let error = false;
    if(itemText.value == "") {
        errorMsg(itemText, '*This field is required');
        error = true;
    } else if(!textLength.test(itemText.value)) {
        errorMsg(itemText, 'Enter valid item');
        error = true;
    } else {
        successMsg(itemText);
    }

    if(quantityText.value == "") {
        errorMsg(quantityText, '*This field is required');
        error = true;
    } else if(!numLength.test(quantityText.value)) {
        errorMsg(quantityText, 'Enter valid quantity');
        error = true;
    } else {
        successMsg(quantityText);
    }
    return error;
}

//input field focusout function
itemText.addEventListener('focusout', () => {
    if(itemText.nextElementSibling.classList.contains('none')) {
        itemText.nextElementSibling.classList.remove('none');
    }
    inputValue();
})

quantityText.addEventListener('focusout', () => {
    if(quantityText.nextElementSibling.classList.contains('none')) {
        quantityText.nextElementSibling.classList.remove('none');
    }
    inputValue();
})

//input field focus function
itemText.addEventListener('focus', () => { 
    itemText.nextElementSibling.className = 'none';
})

quantityText.addEventListener('focus', () => { 
    quantityText.nextElementSibling.className = 'none';
})

//on submit trigger 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!inputValue()) {
        let item = localStorage.getItem("item");
        if(item == null) {
            itemObject = [];
        } else {
            itemObject = JSON.parse(item);
        }
        let myObj = {
            itemTitle: itemText.value,
            itemQuantity: quantityText.value
        }
        itemObject.push(myObj);
        localStorage.setItem("item", JSON.stringify(itemObject));
        itemText.value = "";
        quantityText.value = "";
    }
    displayContent();
});

//display items after proper validation 
let displayContent = () => {
    let item = localStorage.getItem("item");
    if(item == null) {
        itemObject = [];
    } else {
        itemObject = JSON.parse(item);
    } 

    let display = " ";
    itemObject.forEach((element, index) => {
        display += `
        <div class="item-display">
        <h4 class="item-text"> Item: ${element.itemTitle}</h4>
        <p class="quan-text">Ouantity: ${element.itemQuantity}</p>
        <button class="${index}" onclick="modify(this.class)">modify</button>
        <button class="${index}" onclick="remove(this.class)">remove</button>
        </div>`;
    }); 
    
    let displaySection = document.querySelector('.display');
    if(itemObject.length != 0) {
        displaySection.innerHTML = display;
    } else {
        displaySection.innerHTML = "No item added";
    }
}

//remove items function
let remove = (index) => {
    let item = localStorage.getItem("item");
    if(item == null) {
    itemObject = [];
} else {
    itemObject = JSON.parse(item);
}
itemObject.splice(index, 1);
localStorage.setItem("item", JSON.stringify(itemObject));
displayContent();
    
}


//modify items function
let modify = (index) => {
    let item = localStorage.getItem("item");
    if(itemText.value !== "" || quantityText.value !== "") {
        return alert('Clear fields before editting');
    }
    if(item == null) {
        itemObject = [];
    } else {
        itemObject = JSON.parse(item);
    }
    
    itemObject.findIndex((element, index) => {
        itemText.value = element.itemTitle;
        quantityText.value = element.itemQuantity;   
    })
    itemObject.splice(index, 1);
    localStorage.setItem("item", JSON.stringify(itemObject));
    displayContent();
}

//clear displayed items
let clearDisplay = document.querySelector('.clear');
clearDisplay.addEventListener('click', () => {
    let item = localStorage.getItem("item");
    if(item == null) {
        itemObject = [];
    } else {
        itemObject = JSON.parse(item);
        itemObject = [];
    } 
    localStorage.setItem("item", JSON.stringify(itemObject));
    displayContent();
})

displayContent();




