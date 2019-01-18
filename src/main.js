import './css/styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doctor } from './js/doctor'



const selectForm = $("#doctorSpecialty");
let doctor = new Doctor();
let promise = doctor.getAllDoctors(name);
promise.then(function(response) {
    let data = JSON.parse(response);
    let specialtyArray = doctor.searchDoctorsForAllSpecialties(data);
    for( let specialty of specialtyArray ) {
        selectForm.append(`<option value = "${specialty}">${specialty}</option>`);
    }
    
})

let recentDoctorsArray = [];

$(document).ready(function () {
    // ---------------------------------------------------------------------------------------------
    //Had to comment on this because it blew my mind. Instead of doing an API call on every single submit request, I realized you could put the promise after document.ready, and it will do ONE API request, and then I can use that information throughout the entire website. It's also WAY faster!
    let promise = doctor.getAllDoctors(name);
    // ----------------------------------------------------------------------------------------------
    
    // Allows the user to choose from the specialties found within the API to search for doctors with that specialty.
    $("#doctorList").submit(function(event) {
        event.preventDefault();
        let specialty = $("#doctorSpecialty").val();
        promise.then(function(response) {
            let data = JSON.parse(response);
            let doctorArray = doctor.searchDoctorJSONForSpecialty(data, specialty);
            for(let doctorObj of doctorArray) {
                recentDoctorsArray.push(doctorObj);
                doctor.outputDoctorText(doctorObj);
            }
            $("#textLog").prepend(`<p style="font-size: 30px"><strong>Doctors that practice ${specialty}:</strong> </p>`);
            $("#textLog").prepend(`<p><hr></p>`);
        })
    });

    // Allows the user to input a doctor's name and get all of the information regarding that doctor.
    $("#searchByDoctor").submit(function(event) {
        event.preventDefault();
        let doctorName = $("#doctorName").val();
        
        promise.then(function(response) {
            let data = JSON.parse(response);
            let doctorArray = doctor.searchDoctorsByName(data, doctorName);
            console.log(doctorArray);
            for (let doctorObj of doctorArray) {
                recentDoctorsArray.push(doctorObj);
                doctor.outputDoctorText(doctorObj);
            }
            $("#textLog").prepend(`<p style="font-size: 30px"><strong>Doctors with the name ${doctorName}: </strong></p>`);
            $("#textLog").prepend(`<p><hr></p>`);
        })
    });

    $("#showRecentDoctors").submit(function(event) {
        event.preventDefault();
        for(let doctorObj of recentDoctorsArray) {
            doctor.outputDoctorText(doctorObj);
        }
        $("#textLog").prepend(`<p style="font-size: 30px"><strong>Recent Doctor Results: </strong></p>`);
    });
});

