document.addEventListener("DOMContentLoaded", function(){

    //czysci local storage

    localStorage.clear();

    //Nawigacja mobile
    const hamburger = document.querySelector('.hamburger button');
    const menu = document.querySelector('.list__navigation');
    const menu_list = document.querySelectorAll('nav > ul > li ');
    hamburger.addEventListener('click', function(){
        menu.classList.toggle('visible');
        menu.classList.toggle('unvisible');
    });
    menu_list.forEach(function(element) {
        element.addEventListener('click', function(){
            menu.classList.toggle('visible');
            menu.classList.toggle('unvisible');
        });
    });

    const mobile = window.matchMedia("screen and (max-width: 767px)");
    mobile.addListener(function(){
        if (mobile.matches) {
            menu.classList.remove('visible');
        }
    });

    //Kod dla Caruseli Zadanie 1.2

    const next = document.querySelector(".rightarrow");
    const prev = document.querySelector(".leftarrow");
    const tablicali = document.querySelector(".carusel-content").querySelectorAll( "ul li");
    let indexli = 0;


    next.addEventListener("click", function() {

        tablicali[indexli].classList.remove("visible")
        if (indexli >= tablicali.length-1) {
            indexli =0;
        } else {
            indexli +=1;
        }
        tablicali[indexli].classList.toggle("visible")

        console.log(indexli)
    })
    prev.addEventListener("click", function() {

        tablicali[indexli].classList.remove("visible")
        if (indexli <= 0) {
            indexli = tablicali.length-1
        }    else {
            indexli -= 1;
        }
        tablicali[indexli].classList.toggle("visible")
        console.log(indexli)
    })
});