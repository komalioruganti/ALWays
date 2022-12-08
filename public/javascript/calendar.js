const currentDate = $(".current-date"),
    daysTag = $(".days"),
    prevNextIcons = document.querySelectorAll(".calender-icons span");

//getting the present date, year and month
let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();
console.log(currentMonth)



const renderCalendar = () => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(); 
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); 
    let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth ).getDay()
    let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
   
    let liTag = "";

    for (let i = firstDayofMonth ; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth-i +1}</li>`
        
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i ===  date.getDate() && currentMonth === new Date().getMonth() 
                      && currentYear === new Date().getFullYear() ? "active" :"";
        liTag += `<li class="${isToday}">${i}</li>`
    }
   for(let i =lastDayofMonth; i<6 ;i++){
    liTag += `<li class="inactive">${i-lastDayofMonth +1}</li>`
   }

    currentDate.text(`${months[currentMonth]} ${currentYear}`);
    daysTag.html(liTag)
}
renderCalendar();

prevNextIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.id === "prev") {

            if (currentMonth === 0) {
                currentMonth = 11;
                currentYear = currentYear - 1;
            } else {
                currentMonth = currentMonth - 1;
            }

            console.log(currentMonth);
            renderCalendar();
        } else {

            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear = currentYear + 1;
            } else {
                currentMonth = currentMonth + 1;
            }
            console.log(currentMonth);

            renderCalendar();
        }

    })
})
