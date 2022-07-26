const clickButton = document.querySelectorAll('.addToCart');
const cartContainer = document.querySelector('.shoppingCartItemsContainer')
let cart = []

clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
});

function addToCarritoItem(e){
    const button = e.target;
    const item = button.closest('.card-body')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.card-text').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    
    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        cantidad: 1,
    }
    
    addItemCarrito(newItem)
}

function addItemCarrito(newItem){

    const inputElement = cartContainer.getElementsByClassName('shoppingCartItemQuantity')
    for(let i = 0; i < cart.length; i++){
        if(cart[i].title.trim() === newItem.title.trim()){
            cart[i].cantidad++;
            const inputValue = inputElement[i]
            inputValue.value++;
            cartTotal()
            return null;
        }
    }
    
    cart.push(newItem);
    renderCart()
}

function renderCart(){
    cartContainer.innerHTML = '';
    cart.map(item =>{
        const div = document.createElement('div')
        div.classList.add('itemCart')
        const content = `
        <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${item.img} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${item.title}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${item.price}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    min="1" value=${item.cantidad}>
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`

    div.innerHTML = content;
    cartContainer.append(div)

    div.querySelector('.buttonDelete').addEventListener('click', removeItemCart)
    div.querySelector('.shoppingCartItemQuantity').addEventListener('change', sumCant)
    })  
    cartTotal()
    }

function cartTotal(){
    let total = 0;
    const itemCartTotal = document.querySelector('.shoppingCartTotal')
    cart.forEach(item =>{
        const price = Number(item.price.replace('$', ''));
        total = total + price*item.cantidad;
    })

    itemCartTotal.innerHTML = `$${total}`
    addLocalStorage()
}

function removeItemCart(e){
    const buttonDelete = e.target;
    const div = buttonDelete.closest('.itemCart')
    const title = div.querySelector('.shoppingCartItemTitle').textContent
    for(let i=0;i<cart.length;i++){
        if(cart[i].title.trim() === title.trim()){
            cart.splice(i, 1);
        }
    }
    div.remove()
    cartTotal()
}

function sumCant(e){
    const sumaInput = e.target
    const div = sumaInput.closest('.itemCart')
    const title = div.querySelector('.shoppingCartItemTitle').textContent
    cart.forEach(item =>{
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value
            cartTotal()
        }
    })
}

function addLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

window.onload = function (){
    const storage = JSON.parse(localStorage.getItem('cart'))
    if(storage){
        cart = storage;
        renderCart()
    }
}