(()=>{let hero = document.querySelector('.hero');
let deviceWidth = window.innerWidth;
let deviceHeight = window.innerHeight;

deviceWidth <= 760? hero.style.height = deviceHeight+'px' : 0;})()