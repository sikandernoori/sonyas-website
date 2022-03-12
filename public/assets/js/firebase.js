
// Initialize Firebase (ADD YOUR OWN DATA)
var firebaseConfig = {
    apiKey: "AIzaSyBvq0HFFww4O-DRTbKBvd910oDEWtubrX0",
    authDomain: "well-approach.firebaseapp.com",
    projectId: "well-approach",
    storageBucket: "well-approach.appspot.com",
    messagingSenderId: "1056393398691",
    appId: "1:1056393398691:web:bf2e5cdfbf83a39fbdb216",
    measurementId: "G-34NZ41DZ9G"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var uuid = "";

firebase.auth().onAuthStateChanged(function (user) {
    //var user = firebase.auth().currentUser;

    if (user == null) {
        console.log("user not logged in");
    }
    else {
        uuid = user.uid;
    }
});



// Reference messages collection
var dbRef_wac = firebase.database().ref('wac');
var dbRef_contactRequests = dbRef_wac.ref.child('contactRequests');

function sendMessage() {
    debugger;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    firebase.auth().signInAnonymously()
        .then(() => {
            uploadContactRequest(name, email, message);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

// Save message to firebase
function uploadContactRequest(name, email, message) {
    let newMessageRef = dbRef_contactRequests.child(uuid).push();

    newMessageRef.set({
        name: name,
        email: email,
        message:message,
        entryDate: getCurrentDate()
    }).then(function () {
        let msg = 'Contact request uploaded successfully';
        console.log(msg);
        alert(msg)
        location.reload();
        window.scrollTo(0, 0)
    })
        .catch(function (error) {
            alert(error);
        });
}

function getCurrentDate(){
    var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '-' + dd + '-' + yyyy;
  return today;
  }