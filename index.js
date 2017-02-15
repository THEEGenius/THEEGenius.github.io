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

/*$(document).ready(function(){
  var rootRef = firebase.database().ref().child("users");

  rootRef.on("child_added", snap => {

    var location = snap.child("location").val();
    var website = snap.child("website").val();

    $("#table_body").append("<tr><td>" + location +"</td><td>" + website +"</td><td><button>Remove</button></td></tr>");

  });
});*/
