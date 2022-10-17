let y_slides = document.querySelectorAll('.y-slide-item');
let y_slide_active = 1;
let y_slide_next = document.querySelectorAll('.y-slide-next');
let y_slide_prev = document.querySelectorAll('.y-slide-prev');

showSlidePrev = () => {
    let last_slide = y_slide_active;
    if(--y_slide_active < 1) y_slide_active = y_slides.length;
    showSlideItem(last_slide,-1);
}

showSlideNext = () => {
    let last_slide = y_slide_active;
    if(++y_slide_active > y_slides.length) y_slide_active = 1;
    showSlideItem(last_slide,1);
}

showSlideItem = (last_slide, direction) => {
    y_slides[last_slide-1].style = '';

    if(direction > 0)
    {
        for(slides of y_slides)
        {
            slides.style = 'left: 100%; transition: none';
        }
        y_slides[last_slide-1].style = 'left: -100%; transition: all 0.5s';
    }
    else if(direction < 0)
    {
        for(slides of y_slides)
        {
            slides.style = 'left: -100%; transition: none';
        }
        y_slides[last_slide-1].style = 'left: 100%; transition: all 0.5s';
    }
    y_slides[y_slide_active-1].style = 'left: 0; transition: all 0.5s';

}

activateSliderBtn = (btnVar, action) => {
    for(btn of btnVar)
    {
        btn.addEventListener('click', action, false);
    }
}

autoSlide = () => {
    let intervalTime = 4000;
    setTimeout(() => {
        setInterval(() => {
            showSlideNext();
        }, intervalTime);
    }, intervalTime);
}


showSlideItem(y_slide_active,0);
activateSliderBtn(y_slide_next,showSlideNext);
activateSliderBtn(y_slide_prev,showSlidePrev);
autoSlide();
