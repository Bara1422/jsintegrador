const formulario = document.querySelector("#form");
const submitbtn = document.getElementById('submit');

submitbtn.addEventListener('keyup', (e) => {
    let value = e.currentTarget.value;
    if(value === ''){
        submit.disabled = true;
    }else {
        submit.disabled = false;
    }
})


formulario.addEventListener('submit', validateForm);
function validateForm(e){
    e.preventDefault();
    let nombre = document.querySelector('#nombre').value;
    let email = document.querySelector('#email').value;
    
    let respuesta = document.querySelector('.form-result');


    let p = document.querySelector('#form-p')
    if(nombre && email !== ''){
        p.innerText = `${nombre}, nos contactartemos contigo a la brevedad.`
    }

}