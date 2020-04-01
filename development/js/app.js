document.addEventListener("DOMContentLoaded", function(){

    //Zadanie 2.2 formularz

    const form = document.querySelector("#form-name");
    const nametext = document.querySelector("#localsname");
    const form_content = document.querySelector(".form-content");
    const section3 = document.querySelector(".section3");
    const addrecipe = document.querySelector("#addrecipe");
    const closerecipe = document.querySelector("#closerecipe");
    const popup = document.querySelector("#popup");
    const namerecipe = document.querySelector("#namerecipe");
    const opisrecipe = document.querySelector("#opisrecipe");
    const instruktion = document.querySelector("#instruktion");
    const skladniki = document.querySelector("#skladniki");
    const addinstruktion = document.querySelector("#addinstruktion");
    const addskladniki = document.querySelector("#addskladniki");
    const instrukcion_content = document.querySelector(".instrukcion-content");
    const skladniki_content = document.querySelector(".skladniki-content");
    const alertsavedrecip = document.querySelector("#alertsavedrecip");
    let savedname = localStorage.getItem("savedName");
    let allRecipies = [];


    // Jeśli istnieje klucz:
    if (savedname != null) {
        nametext.innerText = savedname;
        section3.firstElementChild.classList.toggle("unvisible");
        popup.classList.remove("popup");
        form_content.style.display = ("none");
        console.log("Masz na imię: ", savedname);
    } else {
        // Jeśli nie istnieje klucz:

    form.addEventListener("submit", function(event){
        event.preventDefault();
        const name = document.querySelector("#name");
        const errorMessage = document.querySelector('.error-message');
        const successMessage = document.querySelector('.success-message');

        if(name.value.length < 3) {
            errorMessage.innerText = "Twoje imię jest za krótkie";
            successMessage.innerText = "";
            return;
        } else {
            errorMessage.innerText = "";
            successMessage.innerText = name.value + " zaraz Cię przekieruje";
            localStorage.setItem('savedName', name.value);
            setTimeout(function(){
                nametext.innerText = name.value;
                section3.firstElementChild.classList.toggle("unvisible");
                popup.classList.remove("popup");
                form_content.style.display = ("none");
                name.value = "";
            }, 1000);
            console.log("Masz na imię: ", savedname);
        }
    });
    }

    //Zadanie 3.2
    //Zamykanie znakiem "X" widgetów:
    const closeWindow=document.getElementsByClassName("fas fa-window-close");
    const widget=document.querySelectorAll(".widgetNotification");
    for (let i=0;i<closeWindow.length;i++){
        closeWindow[i].addEventListener("click", function(){
            console.log(closeWindow[i])
            console.log(widget[i])
            widget[i].classList.add("unvisible");
        });    
    };

    // Pobieranie ilości przepisów z localStorage:
function checknumberofrecipies () {
    let recipies = 0;
    if (localStorage.getItem("data") !=null) {
        let tablelocalstoryge = JSON.parse(localStorage.getItem("data")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
        recipies = tablelocalstoryge.length;
    }
    const firstWidgetText=document.querySelector("#firstWidgetText");
    if(recipies == 0){
        firstWidgetText.innerText="Nie masz żadnych przepisów.";
        console.log("Nie masz zadnego przepisu")
    }
    else if(recipies==1){
        firstWidgetText.innerText="Świetnie masz już 1 przepis!";
        console.log("masz 1 przepis")
    }
    else if(recipies > 1 && recipies < 5) {
        firstWidgetText.innerText="Świetnie masz już " + recipies + " przepisy";
        console.log("masz "+ recipies+ " przepisow")
    } else {
        firstWidgetText.innerText="Świetnie masz już " + recipies + " przepisow";
        console.log("masz "+ recipies+ " przepisow")
    }
}
    // Pobieranie ilości planow z localStorage:
    function checknumberofshedules () {
        let shedules = 0;
        if (localStorage.getItem("schedules") !=null) {
            let tablelocal2storyge = JSON.parse(localStorage.getItem("schedules")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            shedules = tablelocal2storyge.length;
        }
        const secondWidgetText=document.querySelector("#secondWidgetText");
        if(shedules == 0){
            secondWidgetText.innerText="Pamiętaj, aby dodać plan!";
        }
        else if(shedules==1){
            secondWidgetText.innerText="Świetnie masz już 1 plan!";
            console.log("masz 1 plan")
        }
        else if(shedules > 1 && shedules < 5) {
            secondWidgetText.innerText="Świetnie masz już " + shedules + " plany";
            console.log("masz "+ shedules + " planow")
        } else {
            secondWidgetText.innerText="Świetnie masz już " + shedules + " planów";
            console.log("masz "+ shedules + " planow")
        }
    }

checknumberofrecipies ();
checknumberofshedules ();


    //    Zadanie 4.1

    addrecipe.addEventListener("click", function(event){
            popup.classList.remove("unvisible")
            popup.classList.add("popup")
            createrecipe();
    });

    closerecipe.addEventListener("click", function(event){
        setTimeout(function(){
            popup.classList.add("unvisible")
            popup.classList.remove("popup")
        }, 1000);
        saverecipe ();
        checknumberofrecipies ();
        console.log(allRecipies)
        console.log("ilosc przepisow:" +allRecipies.length)
        location.reload();
    });

//    Zadanie 4.2

//    obiekt PRZEPIS:

    function Recipe(id, title, description) {
        this.id = id; // id przepisu
        this.title = title; // nazwa przepisu
        this.description = description; // opis przepisu
        this.ingredients = []; // składniki przepisu
        this.instructions = []; // instrukcje przepisu
    }

   /*  Metoda `.showInfo()`
     wyświetlająca w konsoli wszystkie informacje o przepisie */

    Recipe.prototype.showInfo = function() {
        console.warn(this.id, this.title); // wyświetl id oraz tytuł
        console.warn(this.description); // wyświetl opis
        this.ingredients.map(function(elem, i) {
            console.warn(i, elem); // wyświetl każdy element
        })
        this.instructions.map(function(elem, i) {
            console.warn(i, elem); // wyświetl każdy element
        })
    }
    /*
    Metoda `.saveToLocalStorage()`
    zapisująca do localStorage informacje o przepisie */
    Recipe.prototype.saveToLocalStorage = function() {

        if (localStorage.getItem("data") !=null) {
            allRecipies = JSON.parse(localStorage.getItem("data")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            allRecipies.push(this);// Dodajemy nowy element do tablicy.
            localStorage.setItem("data", JSON.stringify(allRecipies)); //Zapisujemy do localStorage nowe dane
        } else {
            // jeśli nie ma to tworzymy nową wartość w localStorage i dodajemy
            allRecipies.push(this);
            localStorage.setItem("data", JSON.stringify(allRecipies)); //Zapisujemy do localStorage nowe dane
        }

    }


 function createrecipe () {
     alertsavedrecip.innerText = ""
        addinstruktion.addEventListener("click", function(event){
            if (instruktion.value != "") {
                const toadd = document.createElement("li");
                const toadd2 = document.createElement("i");
                toadd.innerText = instruktion.value;
                instrukcion_content.firstElementChild.appendChild(toadd);
                toadd.appendChild(toadd2);
                toadd2.classList.add("fas");
                toadd2.classList.add("fa-trash-alt");
                toadd2.id = "deleteli";
                toadd2.addEventListener("click", function (event) {
                    const toDelete = this.parentElement;
                    toDelete.parentElement.removeChild(toDelete);

                });
                instruktion.value = "";
            }
        });

        addskladniki.addEventListener("click", function(event){
            if (skladniki.value != "") {
                const toadd = document.createElement("li");
                const toadd2 = document.createElement("i");
                toadd.innerText = skladniki.value;
                skladniki_content.firstElementChild.appendChild(toadd);
                toadd.appendChild(toadd2);
                toadd2.classList.add("fas");
                toadd2.classList.add("fa-trash-alt");
                toadd2.id = "deleteli";
                toadd2.addEventListener("click", function (event) {
                    const toDelete = this.parentElement;
                    toDelete.parentElement.removeChild(toDelete);

                });
                skladniki.value = "";
            }
        });

 }

   function  saverecipe () {
        if (namerecipe.value != "") {
            if (localStorage.getItem("data") !=null) {
                allRecipies = JSON.parse(localStorage.getItem("data")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            }
            let NewRecipe = "newRecipe" + (allRecipies.length + 1);
            console.log(NewRecipe);
            const instrukcion_lista = document.querySelectorAll(".instrukcion-content ul li");
            const skladniki_lista = document.querySelectorAll(".skladniki-content ul li");
            NewRecipe  = new Recipe(allRecipies.length + 1, namerecipe.value, opisrecipe.value);
            instrukcion_lista.forEach(function(lista){
                NewRecipe.instructions.push(lista.innerText);
            });
            skladniki_lista.forEach(function(lista){
                NewRecipe.ingredients.  push(lista.innerText)
            });
            NewRecipe.saveToLocalStorage();
            namerecipe.value = "";
            opisrecipe.value = "";
            const toDelete = instrukcion_content.firstElementChild;
            toDelete.parentElement.removeChild(toDelete);
            const toDelete2 = skladniki_content.firstElementChild;
            toDelete2.parentElement.removeChild(toDelete2);
            const toadd = document.createElement("ul");
            skladniki_content.appendChild(toadd);
            const toadd2 = document.createElement("ul");
            instrukcion_content.appendChild(toadd2);
            alertsavedrecip.innerText = "Przepis zostal zapisany w bazie! Zaraz Cie przekieruje..."
            alertsavedrecip.style.color = "green";
        } else {
            alertsavedrecip.innerText = "Nie podales nazwy przepisu. Zaraz Cie przekieruje..."
            alertsavedrecip.style.color = "red";
        }
   }
});

