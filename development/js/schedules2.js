document.addEventListener("DOMContentLoaded", function(){

    let savedname = localStorage.getItem("savedName");
    const beforelogin = document.querySelector("#beforelogin");
    const shedule_container = document.querySelector(".shedule-container");
    const nametext = document.querySelector("#localsname");

    // Jeśli istnieje klucz:
    if (savedname != null) {
        nametext.innerText = savedname;
    }

//    Poprawka zeby nie wysweitlaly sie plany jesli uzytkownik nie zalogowany

    if (savedname == null) {
        shedule_container.style.display = ("none");
        beforelogin.classList.remove("unvisible")
    }

    let AllPlanns = [];

    //Dynamiczne tworzenie elementu HTML "option" w klasie "choose-food" w zalezności od ilości dodanych przepisów od użytkownika:
    function getrecipiesformlocal() {
        if (localStorage.getItem("data") !=null) {
            let myRecipes = JSON.parse(localStorage.getItem("data"));
            const planOptions = document.querySelectorAll('.choose-food');
            planOptions.forEach(function (element) {
                //Utworzenie tyle opcji o nazwie i value "title" ile jest obiektów w myRecipies:
                for (let i = 0; i < myRecipes.length; i++) {
                    let singleOption = document.createElement('option')
                    singleOption.value = myRecipes[i].title
                    singleOption.innerHTML = myRecipes[i].title
                    element.appendChild(singleOption)
                }
            });
            return myRecipes;
        }
    }
    let checkrecipe =   getrecipiesformlocal()

    if (localStorage.getItem("schedules") !=null) {
        AllPlanns = JSON.parse(localStorage.getItem("schedules")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
    }
    const table = document.querySelector('#shedule-table');
    console.log("Masz planow " +AllPlanns.length);

    function getallPlanes () {
        AllPlanns.forEach(function (singlePlan) {
                const newTr = document.createElement('tr');
                const tdId = document.createElement('td');
                const tdName = document.createElement('td');
                const tdDescription = document.createElement('td');
                const tdnumWeek = document.createElement('td');
                const tdAction = document.createElement('td');
                table.appendChild(newTr);
                newTr.classList.add('table-row');
                newTr.appendChild(tdId);
                tdId.innerHTML = singlePlan.id;
                tdId.classList.add('table-cell-text');
                newTr.appendChild(tdName);
                tdName.innerHTML = singlePlan.title;
                tdName.classList.add('table-cell-text');
                newTr.appendChild(tdDescription);
                tdDescription.innerHTML = singlePlan.description;
                tdDescription.classList.add('table-cell-text');
                newTr.appendChild(tdnumWeek);
                tdnumWeek.innerHTML = singlePlan.weekNumber;
                tdnumWeek.classList.add('table-cell-text');
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
                    // usuwanie planu
                    deletePlanFromLocalStorage(toDelete.firstElementChild.nextElementSibling.innerText);
                    location.reload();
                });


                const deleteBtnA = document.createElement('a');
                deleteBtnA.href='#';

                deleteBtnA.appendChild(deleteBtn);
                deleteBtnA.appendChild(editBtn);
                tdAction.appendChild(deleteBtnA);


            }
        )
        console.log(AllPlanns);
    }

    getallPlanes ()

    //usuwanie z local storage planu
    function deletePlanFromLocalStorage (plan) {

        if (localStorage.getItem("schedules") !=null) {
            AllPlanns = JSON.parse(localStorage.getItem("schedules")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            console.log(plan)
            // zwroc nowa tablice bez skasowanego elementu
            AllPlanns = AllPlanns.filter(function(element, index, array) {
                return element.title != plan;
            });
            //reindeksuj
            for (let i=0; i < AllPlanns.length; i++) {
                AllPlanns[i].id = i+1;
            }
            localStorage.setItem("schedules", JSON.stringify(AllPlanns)); //Zapisujemy do localStorage nowe dane
        }
    }

//    ===============Dodawnaie nowego planu====================

    //Ustalenie miejsc formularza do poszczególnych zmiennych do zapisu w LocalStorage:
    const savePlanBtn=document.querySelector(".plan-btn")
    const titleName=document.querySelector("#plan-main");
    const planDescription=document.querySelector("#description-plan");
    const weekNumber=document.querySelector("#week-num")
    const alertsavedplan=document.querySelector("#alertsavedplan")


    //Ustawienie przycisku "dodaj plan" aby przełączało do dodawania planu:
    const addPlanBtn=document.querySelector('#addshedule');
    const planSection=document.querySelector('.content-right-schedules');
    addPlanBtn.addEventListener('click', function(){
        alertsavedplan.innerText = ""
        titleName.value = ""
        planDescription.value = ""
        weekNumber.value = ""
        if (localStorage.getItem("data") ==null || checkrecipe.length ==0) {
            // const box_recipe_plan=document.querySelector(".box-recipe-plan")
            alert("Brak przepisów! Najpierw dodaj nowy przepis!")
        } else {
            planSection.classList.add('popup');
            planSection.classList.remove("unvisible")
        }

    });


    //Jedzenie do wyboru - dni i pory:
    //Poniedziałek:
    const foodMon1=document.querySelector('#mon__1');
    const foodMon2=document.querySelector('#mon__2');
    const foodMon3=document.querySelector('#mon__3');
    const foodMon4=document.querySelector('#mon__4');
    const foodMon5=document.querySelector('#mon__5');
    //Wtorek:
    const foodTue1=document.querySelector('#tue__1');
    const foodTue2=document.querySelector('#tue__2');
    const foodTue3=document.querySelector('#tue__3');
    const foodTue4=document.querySelector('#tue__4');
    const foodTue5=document.querySelector('#tue__5');
    //Środa:
    const foodWed1=document.querySelector('#wed__1');
    const foodWed2=document.querySelector('#wed__2');
    const foodWed3=document.querySelector('#wed__3');
    const foodWed4=document.querySelector('#wed__4');
    const foodWed5=document.querySelector('#wed__5');
    //Czwartek:
    const foodThu1=document.querySelector('#thu__1');
    const foodThu2=document.querySelector('#thu__2');
    const foodThu3=document.querySelector('#thu__3');
    const foodThu4=document.querySelector('#thu__4');
    const foodThu5=document.querySelector('#thu__5');
    //Piątek:
    const foodFri1=document.querySelector('#fri__1');
    const foodFri2=document.querySelector('#fri__2');
    const foodFri3=document.querySelector('#fri__3');
    const foodFri4=document.querySelector('#fri__4');
    const foodFri5=document.querySelector('#fri__5');
    //Sobota:
    const foodSat1=document.querySelector('#sat__1');
    const foodSat2=document.querySelector('#sat__2');
    const foodSat3=document.querySelector('#sat__3');
    const foodSat4=document.querySelector('#sat__4');
    const foodSat5=document.querySelector('#sat__5');
    //Niedziela:
    const foodSun1=document.querySelector('#sun__1');
    const foodSun2=document.querySelector('#sun__2');
    const foodSun3=document.querySelector('#sun__3');
    const foodSun4=document.querySelector('#sun__4');
    const foodSun5=document.querySelector('#sun__5');



    //kod construktior dla Planow
    function Schedule (id, weekNumber, title, description) {
        this.id = id; // id przepisu
        this.title = title; // nazwa planu
        this.description = description; // opis planu
        this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
        this.monday = []; // plan na poniedzialek
        this.tuesday = []; // plan na wtorek
        this.wednesday = []; // plan na środę
        this.thursday = []; // plan na czwartek
        this.friday = []; // plan na piątek
        this.saturday = []; // plan na sobotę
        this.sunday = []; // plan na niedzielę
    };


    /*Metoda `.saveToLocalStorage()`
    zapisująca do localStorage informacje o przepisie */
    Schedule.prototype.saveToLocalStorage = function() {

        if (localStorage.getItem("schedules") !=null) {
            AllPlanns = JSON.parse(localStorage.getItem("schedules")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            AllPlanns.push(this);// Dodajemy nowy element do tablicy.
            console.log(AllPlanns)
            localStorage.setItem("schedules", JSON.stringify(AllPlanns)); //Zapisujemy do localStorage nowe dane
        } else {
            // jeśli nie ma to tworzymy nową wartość w localStorage i dodajemy
            AllPlanns.push(this);
            console.log(AllPlanns)
            localStorage.setItem("schedules", JSON.stringify(AllPlanns)); //Zapisujemy do localStorage nowe dane
        }
    }



    function  saveshedule () {

        const monday=document.querySelectorAll(".monday")
        const tuesday=document.querySelectorAll(".tuesday")
        const wednesday=document.querySelectorAll(".wednesday")
        const thursday=document.querySelectorAll(".thursday")
        const friday=document.querySelectorAll(".friday")
        const saturday=document.querySelectorAll(".saturday")
        const sunday=document.querySelectorAll(".sunday")


        if (titleName.value != "") {
            if (localStorage.getItem("schedules") !=null) {
                AllPlanns = JSON.parse(localStorage.getItem("schedules")); // jeśli są to konwertujemy je i zapisujemy do zmiennej
            }
            let Newplan = "NewPlan" + (AllPlanns.length + 1);
            Newplan  = new Schedule(AllPlanns.length + 1, weekNumber.value, titleName.value, planDescription.value);

            for (let i= 0; i <5; i++) {
                Newplan.monday.push(monday[i].options[monday[i].selectedIndex].value);
            }

            for (let i= 0; i <5; i++) {
                Newplan.tuesday.push(tuesday[i].options[tuesday[i].selectedIndex].value);
            }

            for (let i= 0; i <5; i++) {
                Newplan.wednesday.push(wednesday[i].options[wednesday[i].selectedIndex].value);
            }

            for (let i= 0; i <5; i++) {
                Newplan.thursday.push(thursday[i].options[thursday[i].selectedIndex].value);
            }

            for (let i= 0; i <5; i++) {
                Newplan.friday.push(friday[i].options[friday[i].selectedIndex].value);
            }

            for (let i= 0; i <5; i++) {
                Newplan.saturday.push(saturday[i].options[saturday[i].selectedIndex].value);
            }

            for (let i= 0; i <5; i++) {
                Newplan.sunday.push(sunday[i].options[sunday[i].selectedIndex].value);
            }

            console.log(Newplan)
            Newplan.saveToLocalStorage();

            alertsavedplan.innerText = "Plan zostal zapisany w bazie! Zaraz Cie przekieruje..."
            alertsavedplan.style.color = "green";
            location.reload();
        } else {
            alertsavedplan.innerText = "Nie podales nazwy planu. Zaraz Cie przekieruje..."
            alertsavedplan.style.color = "red";
        }
    }

    //Zapisanie planu i zamkniecie okna
    savePlanBtn.addEventListener("click", function(event){
        setTimeout(function(){
            planSection.classList.remove('popup');
            planSection.classList.add('unvisible');
        }, 1000);
        saveshedule ();
        getallPlanes();
        console.log(AllPlanns)
        console.log("ilosc planow:" +AllPlanns.length)
        location.reload();
    });
});