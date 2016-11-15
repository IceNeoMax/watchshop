var config = {
    apiKey: "AIzaSyBFM1Vgl0Nr7btqvdboyMceh9gRuoeXU4I",
    authDomain: "watch-shop-1d159.firebaseapp.com",
    databaseURL: "https://watch-shop-1d159.firebaseio.com",
    storageBucket: "watch-shop-1d159.appspot.com",
    messagingSenderId: "210995421809"
  };
  firebase.initializeApp(config);

firebase.database().ref('/customers').once('value').then(function(snapshot) {
   let list = snapshot.val();
    
   for(let key in list){
      // console.log(key,list[key]);
       
       if(list[key].golden==false){
            $('table tbody').append('<tr><td>'+key+'</td><td>'+list[key].username+'</td><td>'+list[key].email+'</td><td>'+list[key].phone+'</td><td>'+list[key].add+'</td><td><button class="setGold">set gold</button></td><td>'+list[key].point+'</td></tr>');
       }
       else if(list[key].golden==true){
            $('table tbody').append('<tr><td>'+key+'</td><td>'+list[key].username+'</td><td>'+list[key].email+'</td><td>'+list[key].phone+'</td><td>'+list[key].add+'</td><td>golden</td><td>'+list[key].point+'</td></tr>');
       }
      
   }
    $('.setGold').click(function(){
        let temp = $(this).parent().parent().find('td').first().text();
         firebase.database().ref('customers/' + temp).update({
            golden : true
          });
        $(this).parent().append('golden');
        $(this).remove();
    })
});