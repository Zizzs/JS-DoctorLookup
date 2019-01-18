import $ from 'jquery';

export class Doctor {
    getAllDoctors() {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();
          let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=45.5122,-122.6587,50&user_location=45.5122,-122.6587&skip=0&limit=100&user_key=${process.env.API_KEY}`;
          request.onload = function() {
            if (this.status === 200) {
              resolve(request.response);
            } else {
              alert(request.statusText);
              reject(Error(request.statusText));
            }
          }
          request.open("GET", url, true);
          request.send();
        });
    }
    searchDoctorsForAllSpecialties(data) {
        let specialtyArray = [];
        for(let i=0; i < data.data.length; i++) {
            for( let specialties of data.data[i].specialties ) {
                specialtyArray.push(specialties.name);
            }
        }
        return specialtyArray;
    }
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

    outputDoctorText(doctor) {
        $("#textLog").prepend(`Acepting new patients: ${doctor.practices[0].accepts_new_patients} \n`);
        $("#textLog").prepend(`Phone Number:
        Number: ${doctor.practices[0].phones[0].number} 
        Type: ${doctor.practices[0].phones[0].type} \n`);
        $("#textLog").prepend(`Address: 
        City: ${doctor.practices[0].visit_address.city}
        State: ${doctor.practices[0].visit_address.state}
        Street: ${doctor.practices[0].visit_address.street}
        Zip: ${doctor.practices[0].visit_address.zip} \n`);
        $("#textLog").prepend(`Speciality: ${doctor.specialties[0].name} \n`);
        $("#textLog").prepend(`Last name: ${doctor.profile.last_name} \n`);
        $("#textLog").prepend(`First name: ${doctor.profile.first_name} \n`);
        $("#textLog").prepend(`Doctor Information: \n`);
        $("#textLog").prepend(`___________________________ \n`);
    }
}