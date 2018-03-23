import {doctorLookup} from './doctorLookup.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './../.env';
const apiKey = process.env.API_KEY;


$(document).ready(function(){
  $("#doctorSearch").submit(function(event){
    event.preventDefault();
    let doctor = $("#doctor").val();
    let issue = $("#issue").val();
    $("#doctorSearch").hide();
    $("#doctorResults").show();

    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${doctor}&location=wa-seattle&skip=0&limit=100&user_key=${apiKey}`).then(function(response){
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
      $("#doctorResults").text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });

    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?name=${issue}&location=wa-seattle&skip=0&limit=100&user_key=${apiKey}`).then(function(response){
      let results = response.data;
      if(results.length == 0) {
        $("#doctorResults").append(`<h2>No doctors match your search. Please try again</h2>`);
      }
      results.forEach(function(result){
        $("#issueResults").append(
          `<h3>Name: ${result.profile.first_name} ${result.profile.last_name}</h3>
          <p><strong>Address:</strong> ${result.practices[0].visit_address.street}, ${result.practices[0].visit_address.city}, ${result.practices[0].visit_address.state}, ${result.practices[0].visit_address.zip}</p>
          <p><strong>Phone Number:</strong> ${result.practices[0].phones[0].number}</p?`
        );
        if(result.practices[0].accepts_new_patients) {
          $("#issueResults").append(`<p><strong>Accepting New Patients:</strong> Yes</p> <hr>`);
        } else{
          $("#issueResults").append(`<p><strong>Accepting New Patients:</strong> No</p> <hr>`);
        }
      });
    })
    .fail(function(error){
      $("#issueResults").text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });

    $('button#home').click(function(){
      location.reload();
    })
  });
});
