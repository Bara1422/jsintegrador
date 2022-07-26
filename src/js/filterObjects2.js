function filterProduct(e){
    const products = document.querySelectorAll('.products-main-cards div')
    let filter = e.target.dataset.filter
    products.forEach(product =>{
        product.classList.contains(filter)
        ? product.classList.remove('hidden')
        : product.classList.add('hidden')
    })
}