// init firebase

var config = {
apiKey: "AIzaSyBFM1Vgl0Nr7btqvdboyMceh9gRuoeXU4I",
authDomain: "watch-shop-1d159.firebaseapp.com",
databaseURL: "https://watch-shop-1d159.firebaseio.com",
storageBucket: "watch-shop-1d159.appspot.com",
messagingSenderId: "210995421809"
};
firebase.initializeApp(config);

$( document ).ready(function() {
    var loginCheck = JSON.parse(localStorage.getItem('watch_login'));
    //check authen from local
    if(loginCheck!=null){
          if(loginCheck.type=="admin"){
                $('#login-div').text('Admin').attr('href','./dashboard/dashboard.html').attr( {"data-target": null,"data-toggle": null} );
                $('#register-div').text("LogOut").attr( {"id": "log-out","href":"#"} );
            }
            else if(loginCheck.type=="user"){
               $('#login-div').text('');

              $('#register-div').text(""); firebase.database().ref('/customers/'+loginCheck.id).once('value').then(function(snapshot) {
                  let temp="watch_login";
                    $('#login-div').text(snapshot.val().username).attr( {"data-target": null,"data-toggle": null} );
                    $('#register-div').html('<div class="dropdown-toggle" data-toggle="dropdown">Menu<span class="caret" style="float:right"></span></div><ul class="dropdown-menu"><li data-toggle="modal" data-target= "#myModal">Coupon</li><li onClick="localStorage.removeItem(\''+temp+'\'); window.location.reload(true);">Log Out</li></ul>')
                    .attr( {"id": "hihihihi","href":"#"} );
                    $('.account-right').html('<h3>Your Point:</h3><center>'+snapshot.val().point+'</center>');
                    $('#account-left-side').html('<h3>Your Coupon:</h3>');
                    firebase.database().ref('/coupon/'+loginCheck.id).once('value').then(function(snapshot) {
                        for(let key in snapshot.val()){
                            $('#account-left-side').append('<h4><center>'+snapshot.val()[key]+'</center></h4>');
                        }
                    })
                    $('.account-right').append('<center><button id="exchange-cupon">exchange</button></center>');
                });
            }

    }
    
    // login from browser
      $('#login-button').click(()=>{
          $('#append-no-login').remove();
        let ID = $('#id-login').val();
        let pass = $('#pass-login').val();
          
          //admin login
        if(ID=='admin'&& pass=='admin'){
            let temp="watch_login";
            $('#login-div').text('Admin').attr('href','./dashboard/dashboard.html').attr( {"data-target": null,"data-toggle": null} );
            $('#register-div').html('<div onClick="localStorage.removeItem(\''+temp+'\'); window.location.reload(true);">LogOut</div>');
            $('#register-div').attr("href","#");
            $('#myModal').modal('toggle');
            localStorage.setItem("watch_login",JSON.stringify({type:"admin"}));
        }  
        else{
            //user login
            firebase.database().ref('/customers').once('value').then(function(snapshot) {
                var tempjson = snapshot.val();
                for(let key in tempjson){
                    if(ID==tempjson[key].username && pass==tempjson[key].pass){
                        let tempid = key;
                        let temps="watch_login";
                        $('#myModal').modal('toggle');
                        $('#login-div').text(tempjson[key].username).attr( {"data-target": null,"data-toggle": null} );
                        $('#register-div').html('<div class="dropdown-toggle" data-toggle="dropdown">Menu<span class="caret" style="float:right"></span></div><ul class="dropdown-menu"><li data-toggle="modal" data-target= "#myModal">Coupon</li><li onClick="localStorage.removeItem(\''+temps+'\'); window.location.reload(true);">Log Out</li></ul>')
                    .attr( {"id": "hihihihi","href":"#"} );
                        $('.account-right').html('<h3>Your Point:</h3><center>'+tempjson[key].point+'</center>');
                        firebase.database().ref('/coupon/'+tempid).once('value').then(function(snapshot) {
                            let temp = snapshot.val();
                            
                            $('#account-left-side').html('<h3>Your Coupon:</h3>');
                            for(let val in temp){       
                                $('#account-left-side').append('<h4><center>'+temp[val]+'</center></h4>');     
                            }
                        });
                        $('.account-right').append('<center><button id="exchange-cupon">exchange</button></center>');
                        localStorage.setItem("watch_login",JSON.stringify({type:"user",id:key}));
                    }
                }

            });
        }
    });
    
    $('#log-out').click(()=>{
        localStorage.removeItem('watch_login');
        window.location.reload(true);
    });
    

});

// add user authen