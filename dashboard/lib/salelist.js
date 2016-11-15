var config = {
    apiKey: "AIzaSyBFM1Vgl0Nr7btqvdboyMceh9gRuoeXU4I",
    authDomain: "watch-shop-1d159.firebaseapp.com",
    databaseURL: "https://watch-shop-1d159.firebaseio.com",
    storageBucket: "watch-shop-1d159.appspot.com",
    messagingSenderId: "210995421809"
  };
  firebase.initializeApp(config);
firebase.database().ref('/sales').once('value').then(function(snapshot) {
   let list = snapshot.val();
   for(let key in list){
       let temp = list[key].listItem;
       let tempstr ="";
       for(let val in temp){tempstr= tempstr + val+ ":" +temp[val].quantity+" "}
        $('table tbody').append('<tr><td>'+key+'</td><td>'+list[key].email+'</td><td>'+tempstr+'</td><td>'+list[key].name+'</td><td>'+list[key].phone+'</td><td>'+list[key].userId+'</td></tr>');
   }
    
});