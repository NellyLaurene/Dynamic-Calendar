const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".header-icons span");

//getting current date,year and month
let date = new Date(),
currYear = date.getFullYear(), //getFullYear() is method, which returns the year in four digits 
currMonth = date.getMonth(); //getMonth() is  method, which returns the month as a zero-based index and returns 0-11 months

console.log(date, currYear, currMonth);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // if you don't +1, it will give previous months last date
    let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    console.log(lastDateOfMonth);
    let liTag = "";

    for(let i=firstDayOfMonth; i> 0; i--){ // creating list of last days previous months
        liTag += `<li class="inactive">${lastDateOfPrevMonth-i + 1}</li>`;
    }

    for(let i=1; i<= lastDateOfMonth; i++){ // creating list of all days of current months
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) { // creating list of next months first days
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`; // use array cause getMonth() returns 0-11 months
    daysTag.innerHTML = liTag;
}
renderCalendar();

//adding click lister on next and previous icons
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {

        //decrement is clicked previous and increment if clicked next icon
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth <0 || currMonth > 11) { //if a current month is less than 0 or greater than 11
            //create a new date of current year and month and pass is it as a date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); //updating current year and new date year
            currMonth = date.getMonth(); //updating current month and new date month
        } else { //pass new date as a date value
            date = new Date();
        }
        renderCalendar();
    });
});