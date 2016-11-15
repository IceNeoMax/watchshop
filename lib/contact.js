// Initialize Firebase
var config = {
apiKey: "AIzaSyBFM1Vgl0Nr7btqvdboyMceh9gRuoeXU4I",
authDomain: "watch-shop-1d159.firebaseapp.com",
databaseURL: "https://watch-shop-1d159.firebaseio.com",
storageBucket: "watch-shop-1d159.appspot.com",
messagingSenderId: "210995421809"
};
firebase.initializeApp(config);

$("#submitForm").click(function(){
    let name = $("#name").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let mess = $("#mess").val();
    firebase.database().ref('/feedbacks').once('value').then(function(snapshot) {

        let json = snapshot.val();
         writeUserData(name,phone, email, mess);
        $('.contact-text .contact-left').remove();
        $('.contact-text .contact-right').remove();
        $('.contact-text').append('<h3>Thanks for sending us your feedback!</h3>Click <a href="./index.html">here</a> to return main page.')
    });
});

function writeUserData(name,phone, email, mess) {
  firebase.database().ref('feedbacks/').push({
    name: name,
    phone: phone,
    email: email,
    mess : mess
  });
}
