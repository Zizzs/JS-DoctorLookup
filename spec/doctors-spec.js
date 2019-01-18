import { Doctor } from "../src/js/doctor";


describe('Doctor', function () {
    let doctor;
    let promise;

    beforeEach(function() {
        doctor = new Doctor();
        promise = doctor.getAllDoctors();
    });

    it('should return the given specialty name', function () {
        promise.then(function(response) {
            let data = JSON.parse(response);
            let speciality = "Massage Therapy";
            let arrayOne = searchDoctorJSONForSpecialty(data, speciality);
        expect(arrayOne[0].specialties[0].name).toEqual(speciality);
        });
    });

    it('should return the given doctor first name', function () {
        promise.then(function(response) {
            let data = JSON.parse(response);
            let name = "Xavier";
            let arrayOne = searchDoctorsByName(data, name);
        expect(arrayOne[0].profile.first_name).toEqual(name);
        });
    });
});