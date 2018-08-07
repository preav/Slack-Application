import {getMessagesFromFireBase} from './dateFilterService';

$("#end").change(function () {
    var startDate = document.getElementById("start").value;
    var endDate = document.getElementById("end").value;
 
    if ((Date.parse(endDate) <= Date.parse(startDate))) {
        alert("End date should be greater than Start date");
        document.getElementById("end").value = "";
    }
});

$(document).on('click', '#ok', () => {  
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    alert(`startDate is --->${startDate}     EndDate is -------${endDate}`);
    getMessagesFromFireBase(startDate, endDate);   
});
