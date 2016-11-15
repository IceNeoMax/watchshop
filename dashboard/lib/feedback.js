var config = {
    apiKey: "AIzaSyBFM1Vgl0Nr7btqvdboyMceh9gRuoeXU4I",
    authDomain: "watch-shop-1d159.firebaseapp.com",
    databaseURL: "https://watch-shop-1d159.firebaseio.com",
    storageBucket: "watch-shop-1d159.appspot.com",
    messagingSenderId: "210995421809"
  };
  firebase.initializeApp(config);
firebase.database().ref('/feedbacks').once('value').then(function(snapshot) {
   let list = snapshot.val();
   for(let key in list){
      // console.log(key,list[key]);
       let email = list[key].email || 'anonymous';
       let name = list[key].name || 'anonymous';
       let phone = list[key].phone || 'anonymous';
            $('table tbody').append('<tr><td>'+key+'</td><td>'+name+'</td><td>'+phone+'</td><td>'+email+'</td><td>'+list[key].mess+'</td></tr>');
       
      
   }
    
});