document.addEventListener("DOMContentLoaded", function(){

    //Zadanie 6.2.
    
    let AllPlanns = [];
  
    //Dynamiczne tworzenie elementu HTML "option" w klasie "choose-food" w zalezności od ilości dodanych przepisów od użytkownika:
   function getrecipiesformlocal() {
       let myRecipes=JSON.parse(localStorage.getItem("data"));
       const planOptions = document.querySelectorAll('.choose-food');
       planOptions.forEach(function(element) {
           //Utworzenie tyle opcji o nazwie i value "title" ile jest obiektów w myRecipies:
           for(let i=0;i<myRecipes.length;i++){
               let singleOption=document.createElement('option')
               singleOption.value=myRecipes[i].title
               singleOption.innerHTML=myRecipes[i].title
               element.appendChild(singleOption)

           };
       });
   }
    getrecipiesformlocal()

    //Ustawienie przycisku "dodaj plan" aby przełączało do dodawania planu:
    const addPlanBtn=document.getElementById('addplan');
    const planSection=document.querySelector('.content-right-schedules');
    addPlanBtn.addEventListener('click', function(){
        alertsavedplan.innerText = ""
        planSection.classList.add('popup', 'popupMargin');
    });
 
    //Ustalenie miejsc formularza do poszczególnych zmiennych do zapisu w LocalStorage:
    const savePlanBtn=document.querySelector(".plan-btn")
    const titleName=document.getElementById("plan-main");
    const planDescription=document.getElementById("description-plan");
    const weekNumber=document.getElementById("week-num")
    const alertsavedplan=document.querySelector("#alertsavedplan")
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



        //kod ze snippetów:
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
        };//koniec kodu ze snippetow.


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
            planSection.classList.remove('popup', 'popupMargin');
        }, 1000);
        saveshedule ();
        checknumberofshedules ();
        getplans ();
        console.log(AllPlanns)
        console.log("ilosc planow:" +AllPlanns.length)
        location.reload();
    });



//  =================================== Zadanie 7.1 Magda========================================

    const nametext = document.querySelector("#localsname");
    let savedname = localStorage.getItem("savedName");

    // Jeśli istnieje klucz:
    if (savedname != null) {
        nametext.innerText = savedname;
    }





    let allPlanns = JSON.parse(localStorage.getItem('schedules'));


    // zmienna pomocnicza
    let weekFound = false;

    function displayPlan(plan) {
        document.querySelector("#weekNo").innerHTML = plan.weekNumber;

        document.querySelector("#mon-0").innerHTML = plan.monday[0];
        document.querySelector("#mon-1").innerHTML = plan.monday[1];
        document.querySelector("#mon-2").innerHTML = plan.monday[2];
        document.querySelector("#mon-3").innerHTML = plan.monday[3];
        document.querySelector("#mon-4").innerHTML = plan.monday[4];

        document.querySelector("#tue-0").innerHTML = plan.tuesday[0];
        document.querySelector("#tue-1").innerHTML = plan.tuesday[1];
        document.querySelector("#tue-2").innerHTML = plan.tuesday[2];
        document.querySelector("#tue-3").innerHTML = plan.tuesday[3];
        document.querySelector("#tue-4").innerHTML = plan.tuesday[4];

        document.querySelector("#wed-0").innerHTML = plan.wednesday[0];
        document.querySelector("#wed-1").innerHTML = plan.wednesday[1];
        document.querySelector("#wed-2").innerHTML = plan.wednesday[2];
        document.querySelector("#wed-3").innerHTML = plan.wednesday[3];
        document.querySelector("#wed-4").innerHTML = plan.wednesday[4];

        document.querySelector("#thur-0").innerHTML = plan.thursday[0];
        document.querySelector("#thur-1").innerHTML = plan.thursday[1];
        document.querySelector("#thur-2").innerHTML = plan.thursday[2];
        document.querySelector("#thur-3").innerHTML = plan.thursday[3];
        document.querySelector("#thur-4").innerHTML = plan.thursday[4];

        document.querySelector("#fr-0").innerHTML = plan.friday[0];
        document.querySelector("#fr-1").innerHTML = plan.friday[1];
        document.querySelector("#fr-2").innerHTML = plan.friday[2];
        document.querySelector("#fr-3").innerHTML = plan.friday[3];
        document.querySelector("#fr-4").innerHTML = plan.friday[4];

        document.querySelector("#st-0").innerHTML = plan.saturday[0];
        document.querySelector("#st-1").innerHTML = plan.saturday[1];
        document.querySelector("#st-2").innerHTML = plan.saturday[2];
        document.querySelector("#st-3").innerHTML = plan.saturday[3];
        document.querySelector("#st-4").innerHTML = plan.saturday[4];


        document.querySelector("#sn-0").innerHTML = plan.sunday[0];
        document.querySelector("#sn-1").innerHTML = plan.sunday[1];
        document.querySelector("#sn-2").innerHTML = plan.sunday[2];
        document.querySelector("#sn-3").innerHTML = plan.sunday[3];
        document.querySelector("#sn-4").innerHTML = plan.sunday[4];
    }

    //Odczytaj plany
    function getplans () {
        for (i = 0; i < allPlanns.length; i++) {
            displayPlan(allPlanns[i]);
            weekFound = true;

        }

    }

    getplans ();


    // Nie wime Magda po co to pisalas bez tego tez dziala chyba ze uwazasz ze musi byc
    // if (weekFound === false) {
    //     allPlanns.sort(function(a, b) {
    //         return a.weekNumber - b.weekNumber;
    //     });
    //     for (i = 0; i < allPlanns.length; i++) {
    //         if (weekNo < allPlanns[i].weekNumber) {
    //             displayPlan(allPlanns[i]);
    //             break;
    //         }
    //     }
    // }

    //Nastepny plan
    const forwardBtn = document.querySelector('#forward');

    forwardBtn.addEventListener("click", function(){
            const currentWeek = parseFloat(document.querySelector("#weekNo").innerHTML);

        allPlanns.sort(function(a, b) {
            return a.weekNumber - b.weekNumber;
        });

            for (i = 0; i < allPlanns.length; i++) {
                if (currentWeek < allPlanns[i].weekNumber) {
                    displayPlan(allPlanns[i]);
                }
            }


        });

    //    Poprzedni plan
    const revBtn = document.querySelector('#reverse');

    revBtn.addEventListener("click", function() {
        const currentWeek = parseFloat(document.querySelector("#weekNo").innerHTML);
        //
        // allPlanns.sort(function(a, b) {
        //     return b.weekNumber - a.weekNumber;
        // });

        for (i = 0; i < allPlanns.length; i++) {
            if (currentWeek > allPlanns[i].weekNumber) {
                displayPlan(allPlanns[i]);
            }
        }

    });


});
