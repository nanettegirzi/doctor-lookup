import {doctorLookup} from './doctorLookup.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function(){
  $("#doctorSearch").submit(function(event){
    event.preventDefault();
    let doctor = $("#doctor").val();

    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${doctor}&location=wa-seattle&skip=0&limit=100&user_key=714dd3c48597460d09b53ec4923e2736`).then(function(response){
      let results = response.data;
      if(results.length == 0) {
        $("#doctorResults").append(`<h2>No doctors match your search. Please try again</h2>`);
      }
      results.forEach(function(result){
        $("#doctorResults").append(
          `<h3>Name: ${result.profile.first_name} ${result.profile.last_name}</h3>
          <p><strong>Address:</strong> ${result.practices[0].visit_address.street}, ${result.practices[0].visit_address.city}, ${result.practices[0].visit_address.state}, ${result.practices[0].visit_address.zip}</p>
          <p><strong>Phone Number:</strong> ${result.practices[0].phones[0].number}</p?`
        );
        if(result.practices[0].accepts_new_patients) {
          $("#doctorResults").append(`<p><strong>Accepting New Patients:</strong> Yes</p> <hr>`);
        } else{
          $("#doctorsResults").append(`<p><strong>Accepting New Patients:</strong> No</p> <hr>`);
        }
      });
    })
    .fail(function(error){
      $("#doctorResults").append(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });
  })
})
