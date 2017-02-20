var updateText = document.getElementById("updateText");
var updateBtn = document.getElementById("updateBtn");
var spotHeading = document.getElementById("spotHeading");

//MENU CLICKS

function showHome() {
  $(".inbox").hide();
  $(".history").hide();
  $(".profile").hide();

  $(".home").show();
  $(".currentAd").show();
}
function showInbox(){
  $(".home").hide();
  $(".history").hide();
  $(".profile").hide();
  $(".currentAd").hide();

  $(".inbox").show();
}
function showHistory(){
  $(".home").hide();
  $(".inbox").hide();
  $(".profile").hide();
  $(".currentAd").hide();

  $(".history").show();

}
function showProfile(){
  $(".home").hide();
  $(".inbox").hide();
  $(".history").hide();
  $(".currentAd").hide();

  $(".profile").show();
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();
    var dialog = document.querySelector('#login_dialog');
    dialogPolyfill.registerDialog(dialog);
    // Now dialog acts like a native <dialog>.
    dialog.close();
  } else {
    // No user is signed in.
    $(".login-cover").show();
    var dialog = document.querySelector('#login_dialog');
    dialogPolyfill.registerDialog(dialog);
    // Now dialog acts like a native <dialog>.
    dialog.showModal();
  }
});

/*lOGIN PROCESS*/

$("#loginBtn").click(
  function(){
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){

      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        $("#loginError").show().text(error.message);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });

    }

  }
);

/*LOGOUT PROCESS*/
$("#signOutBtn").click(
  function(){
    firebase.auth().signOut().then(function(){
      //sign-out successful.

    }, function(error) {
      //An error happened
      alert(error.message);

    });
  }
);

var spotHeadingRef = firebase.database().ref().child("users").child("Choppies Railpark").child("location");
spotHeadingRef.on('value', function(datasnapshot){
  spotHeading.innerText = datasnapshot.val();
});

function submitClick(){
  var firebaseRef = firebase.database().ref();

  var adText = updateText.value;

  firebaseRef.child("Ads").child("spot name").push().set(adText);
}
