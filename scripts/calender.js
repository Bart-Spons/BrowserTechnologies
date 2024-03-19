////////////////////////////////
// Kalender                   //
////////////////////////////////

// overlijdensdatum mag niet in de toekomst zijn
// bron: https://www.w3schools.com/js/js_date_methods.asp

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("overlijdensdatum").setAttribute("max", today);
document.getElementById("huwelijksdatum").setAttribute("max", today);
