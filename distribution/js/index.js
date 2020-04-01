document.addEventListener("DOMContentLoaded", function(){

    //czysci loacl storage

    localStorage.clear();

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