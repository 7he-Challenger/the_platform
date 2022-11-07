let switchThemeBtn = document.querySelector(".switch-mode-btn");
let darkModeCheckbox = document.querySelector(".dark-mode-checkbox-activated");

function switchTheme() {
    const isDarkTheme = darkModeCheckbox.checked;
    document.body.setAttribute("class", isDarkTheme ? 'dark' : '');
    document.querySelector(".switch-mode-btn .moon").style.bottom = isDarkTheme? '0' : '120%';
    document.querySelector(".switch-mode-btn .sun").style.top = !isDarkTheme? '0' : '120%';
}

switchThemeBtn.addEventListener("click",()=>{
    darkModeCheckbox.click();
    switchTheme();
},false);

// Remember the first choice
switchTheme();