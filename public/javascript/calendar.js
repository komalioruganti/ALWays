const currentDate = $(".current-date");
daysTag = $(".days");

//getting the present date, year and month
let date  =new Date(),
currentYear = date.getFullYear(),
currentMonth= date.getMonth() ;

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


const renderCalendar=()=>{
    let lastDateofMonth = new Date(currentYear,currentMonth+1,0).getDate();
    console.log(lastDateofMonth);
let liTag = "";

    for(let i = 1;i<=lastDateofMonth;i++){
        liTag += `<li>${i}</li>`
    }

    currentDate.text(`${months[currentMonth]} ${currentYear}`);
    daysTag.html(liTag)
}
renderCalendar();
