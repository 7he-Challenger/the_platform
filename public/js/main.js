// let loader = document.querySelector('.loader-page');

// window.addEventListener('load',() => {
//     loader.setAttribute('class','loader-page end')
//     setTimeout(() => {
//         loader.style.display = 'none'
//     }, 2000);
// },false);

const menuButton = document.querySelector('#menu-button');

function toggleMobileMenu() {
    let menu = document.querySelector('.menu');
    menuButton.setAttribute('class',menuButton.getAttribute('class') === 'close-icon'? 'menu-icon' : 'close-icon');
    menu.style.top = menuButton.getAttribute('class') === 'close-icon'? '0' : '-120%';
}

menuButton.addEventListener('click',() => toggleMobileMenu(),false);

const itemMenu = document.querySelectorAll('.menu li a');

for(item of itemMenu)
    item.addEventListener('click',() => toggleMobileMenu(),false);