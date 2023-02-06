const currentDate = $(".current-date"),
    daysTag = $(".days"),
    prevNextIcons = document.querySelectorAll(".calender-icons span");

//getting the present date, year and month
let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = currentYear;
$(".events-date").attr('value', d);

const renderCalendar = () => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay()
    let lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="day inactive">${lastDateofLastMonth - i + 1}</li>`

    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currentMonth === new Date().getMonth()
            && currentYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="day ${isToday}">${i}</li>`
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="day inactive">${i - lastDayofMonth + 1}</li>`
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

           
            renderCalendar();
            dateClicked();
        } else {

            if (currentMonth === 11) {
                currentMonth = 0;
                currentYear = currentYear + 1;
            } else {
                currentMonth = currentMonth + 1;
            }
           

            renderCalendar();
            dateClicked();
            
        }

    })
})

let dateObj = new Date();
let today = String(dateObj.getDate()).padStart(2, '0');
$(".event-date").text(today + " " + months[currentMonth]);


let output ;
dateClicked();


function dateClicked() {
    selectedDate = document.querySelectorAll(".day")
    selectedDate.forEach(day => {
        day.addEventListener("click", () => {
            var clickedDate = day.textContent;
            $(".event-date").text(clickedDate + " " + months[currentMonth]);
            let clickedMonth = currentMonth + 1;
            output = currentYear + '-' + clickedMonth + '-' + clickedDate;
            
            $(".events-date").attr('value', output);
            GetEvents(output);
        })
    })
    
}


    async function GetEvents(date) {
        console.log("hello")
        try {
            require("dotenv").config();
          const MongoClient = require('mongodb').MongoClient;
          const uri = process.env.MONGODB_URI
      
          const client = new MongoClient(uri, { useNewUrlParser: true });
      
          // Connect to the client and query
          await client.connect();
          
          const collection = client.db("SampleDatabase").collection("n");
      
          // Find the document with "username" equal to "Techie"
          const foundobj = await collection.findOne({ username: "Techie" });
      
          // If the document is found, search for the event with the specified date
          if (foundobj) {
            const event = foundobj.events.find(event => event.date === date).toArray();
            if (event) {
                event.forEach(element => {
                    console.log(element);
                });
              console.log("Description: ", event.description);
            } else {
              console.error("No event was found with the specified date");
            }
          } else {
            console.error("No document with username 'Techie' was found");
          }
        } catch (error) {
          console.error("Error while retrieving event description: ", error);
        } finally {
          // Close the connection to the client
          await client.close();
        }
      }
      