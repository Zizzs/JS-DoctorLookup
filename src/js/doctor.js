import $ from 'jquery';

export class Doctor {

    // The main API Query, using a .env file to block it from being posted to github.
    getAllDoctors() {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();
          let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=45.5122,-122.6587,50&user_location=45.5122,-122.6587&skip=0&limit=100&user_key=${process.env.exports.apiKey}`;
          request.onload = function() {
            if (this.status === 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
              $("#textLog").prepend(`<p>There was an error processing the request: ${error.message}</p>`);
            }
          }
          request.open("GET", url, true);
          request.send();
        });
    }

    // The logic that populates the select/option drop down of all specialties that doctors have.
    searchDoctorsForAllSpecialties(data) {
        let specialtyArray = [];
        for(let i=0; i < data.data.length; i++) {
            for( let specialties of data.data[i].specialties ) {
                specialtyArray.push(specialties.name);
            }
        }
        return specialtyArray;
    }

    // The logic behind searching doctors by specialty.
    searchDoctorJSONForSpecialty(data, specialty) {
        let array = [];
        for(let i=0; i < data.data.length; i++) {
            try {
                if (data.data[i].specialties[0].name === specialty) {
                    array.push(data.data[i]);
                }
            } catch(error) {
                console.error(`Error: ${error.message}`);
            }
        }
        return array;
    }

    // The logic behind searching doctors by name.
    searchDoctorsByName(data, name) {
        let array = [];
        for(let i=0; i < data.data.length; i++) {
            try {
                if ((data.data[i].practices[0].name).includes(name)) 
                    array.push(data.data[i]); 
            } catch(error) {
                console.error(`Error: ${error.message}`);
            }
        }
        return array;
    }

    // The main output block of code to clean up main.js. Outputs all doctor information into the text area.
    outputDoctorText(doctor) {
        $("#textLog").prepend(`<p><strong>Acepting new patients:</strong> ${doctor.practices[0].accepts_new_patients} </p>`);
        $("#textLog").prepend(`<p><i>Number:</i> ${doctor.practices[0].phones[0].number}</p>`);
        $("#textLog").prepend(`<p><i>Type:</i> ${doctor.practices[0].phones[0].type}</p>`);
        $("#textLog").prepend(`<p><strong>Phone Number:</strong></p>`);
        $("#textLog").prepend(`${doctor.practices[0].visit_address.city} , ${doctor.practices[0].visit_address.state} , ${doctor.practices[0].visit_address.street} , ${doctor.practices[0].visit_address.zip}</p>`);
        $("#textLog").prepend(`<p><strong>Address:</strong></p>`);
        $("#textLog").prepend(`<p><strong>Speciality:</strong> ${doctor.specialties[0].name} </p>`);
        $("#textLog").prepend(`<p><strong>Last name:</strong> ${doctor.profile.last_name} </p>`);
        $("#textLog").prepend(`<p><strong>First name:</strong> ${doctor.profile.first_name} </p>`);
        $("#textLog").prepend(`<p style="font-size: 20px"><strong>Doctor Information:</strong> </p>`);
        $("#textLog").prepend(`<p><hr></p>`);
    }
}