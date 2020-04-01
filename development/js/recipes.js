
document.addEventListener("DOMContentLoaded", function(){
    // zadanie 5.1

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
    const nametext = document.querySelector("#localsname");
    const beforelogin = document.querySelector("#beforelogin");
    const recipe_container = document.querySelector(".recipe-container");
    let savedname = localStorage.getItem("savedName");

    // Jeśli istnieje klucz:
    if (savedname != null) {
      nametext.innerText = savedname;
    }

    // kod dodany czasow, do ladowania przepisu do local storage
    function Recipe(id, title, description) {
      this.id = id; // id przepisu
      this.title = title; // nazwa przepisu
      this.description = description; // opis przepisu
      this.ingredients = []; // składniki przepisu
      this.instructions = []; // instrukcje przepisu
    }

    let allRecipies = [];

    if (localStorage.getItem("data") !=null) {
        allRecipies = JSON.parse(localStorage.getItem("data")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
    }

    const table = document.querySelector('#recipes-table');
    console.log("Masz przepisow " +allRecipies.length);

    function getallRecipies () {
        allRecipies.forEach(function (singleRecipe) {
            const newTr = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdName = document.createElement('td');
            const tdDescription = document.createElement('td');
            const tdAction = document.createElement('td');
            table.appendChild(newTr);
            newTr.classList.add('table-row');
            newTr.appendChild(tdId);
            tdId.innerHTML = singleRecipe.id;
            tdId.classList.add('table-cell-text');
            newTr.appendChild(tdName);
            tdName.innerHTML = singleRecipe.title;
            tdName.classList.add('table-cell-text');
            newTr.appendChild(tdDescription);
            tdDescription.innerHTML = singleRecipe.description;
            tdDescription.classList.add('table-cell-text');
            newTr.appendChild(tdAction);

            const deleteBtn = document.createElement('i');
            deleteBtn.classList.add('far');
            deleteBtn.classList.add('fa-trash-alt');
            const editBtn = document.createElement('i');
            editBtn.classList.add('far');
            editBtn.classList.add('fa-edit');
            deleteBtn.addEventListener('click', function () {
                const toDelete = this.parentElement.parentElement.parentElement;
                toDelete.parentElement.removeChild(toDelete);
                //Zadanie 9.1 usuwanie przpeisu
                deleteRecipeFromLocalStorage(toDelete.firstElementChild.nextElementSibling.innerText);
                location.reload();
            });


      const deleteBtnA = document.createElement('a');
      deleteBtnA.href='#';

      deleteBtnA.appendChild(deleteBtn);
      deleteBtnA.appendChild(editBtn);
      tdAction.appendChild(deleteBtnA);


      }
        )
        console.log(allRecipies);
    }

    getallRecipies ();

    // ============================== Rafal Kod do zielonego przycisku======

    //    Zadanie 4.1

    addrecipe.addEventListener("click", function(event){
        popup.classList.remove("unvisible")
        popup.classList.add("popup")
        createrecipe();
        console.log("dzialam")
    });

    closerecipe.addEventListener("click", function(event){
        setTimeout(function(){
            popup.classList.add("unvisible")
            popup.classList.remove("popup")
        }, 1000);
        saverecipe ();
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
            if (localStorage.getItem("data") != null) {
                allRecipies = JSON.parse(localStorage.getItem("data")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            }
            let NewRecipe = "newRecipe" + (allRecipies.length + 1);
            console.log(NewRecipe);
            const instrukcion_lista = document.querySelectorAll(".instrukcion-content ul li");
            const skladniki_lista = document.querySelectorAll(".skladniki-content ul li");
            NewRecipe = new Recipe(allRecipies.length + 1, namerecipe.value, opisrecipe.value);
            instrukcion_lista.forEach(function (lista) {
                NewRecipe.instructions.push(lista.innerText);
            });
            skladniki_lista.forEach(function (lista) {
                NewRecipe.ingredients.push(lista.innerText)
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

    //Zadanie 9.1 usuwanie z local storage przepisu
    function deleteRecipeFromLocalStorage (recip) {

        if (localStorage.getItem("data") !=null) {
            allRecipies = JSON.parse(localStorage.getItem("data")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            console.log(recip)
           // zwroc nowa tablice bez skasowanego elementu
            allRecipies = allRecipies.filter(function(element, index, array) {
                return element.title != recip;
            });
            //reindeksuj
            for (let i=0; i < allRecipies.length; i++) {
                allRecipies[i].id = i+1;
            }
            localStorage.setItem("data", JSON.stringify(allRecipies)); //Zapisujemy do localStorage nowe dane
        }
    }

//    Poprawka zeby nie wysweitlaly sie przepisy jesli uzytkownik nie zalogowany

        if (savedname == null) {
            recipe_container.style.display = ("none");
            beforelogin.classList.remove("unvisible")
        }
});

