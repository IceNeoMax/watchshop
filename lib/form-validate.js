
//firebase init

var config = {
    apiKey: "AIzaSyBFM1Vgl0Nr7btqvdboyMceh9gRuoeXU4I",
    authDomain: "watch-shop-1d159.firebaseapp.com",
    databaseURL: "https://watch-shop-1d159.firebaseio.com",
    storageBucket: "watch-shop-1d159.appspot.com",
    messagingSenderId: "210995421809"
  };

firebase.initializeApp(config);
// insert user id
function writeUserData(userId, name, email, pass,phone,add) {
  firebase.database().ref('customers/' + userId).set({
    username: name,
    email: email,
    pass : pass,
    phone:phone,
    add: add,
    golden: false,
    point:0
  });
}

//check form
$('form').validate({
        rules: {
            name: {
                minlength: 6,
                maxlength: 15,
                required: true
            },
            email: {
                email:true,
                required: true
            },
            password: {
                pwcheck: true
            },
            repass: {
                equalTo: "#password",
                required: true
            },
            phone: {
                phonecheck: true,
                required: true
            },
            address: {
                required: true
            }
        },
        messages: {
            name: "Atleast 6 characters!",
            password:"Your password must have Uppercase, Lowercase, Special Character, number and atleast 8 characters!",
            phone: "Your phone must have 0 and atleast 5 numbers ",
            email: "Your email must follow this: xxxxx@yyyy.zzz!",
            address: "Enter Your Address"
        },
        highlight: (element) =>  {
            $(element).closest('.form-group').addClass('has-error animated bounce');
        },
        unhighlight: (element) => {
            $(element).closest('.form-group').removeClass('has-error animated bounce');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: (error, element) =>{
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
    //submit form success
        submitHandler: function() {

            let temp = Math.floor(Math.random()*10000000); 
            writeUserData(temp,$('#username').val(),$('#email').val(),$('#password').val(),$('#phone').val(),$('#address').val());
            $('form').remove();
            $('.register .container').append("Register successfully. Return our main <a href="+"index.html"+">Page</a>");
          }
});


$.validator.methods.email = function ( value, element )  {
  return this.optional( element ) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test( value );
};
$.validator.addMethod("pwcheck", function( value, element ){

        return this.optional(element) || /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test( value );
});
$.validator.addMethod("phonecheck", function( value, element ){

        return this.optional(element) || /0[0-9]{4,}/.test( value );
});
//random password
var random = () =>{
    var keylist="abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*"
    var tmp = ''
        for(let i=0;i<6;i++){
 tmp+=keylist.charAt(Math.floor(Math.random()*keylist.length))
        }
    $('#password').val('M'+'d'+tmp+'&'+'3');
    $('#repass').val('M'+'d'+tmp+'&'+'3');
    $('#password').attr('type', 'text').css("border","1px solid green");
    $('#repass').attr('type', 'text').css("border","1px solid green");
    $('#repass').attr('disabled', 'disabled');
    $('#password').attr('disabled', 'disabled');    
}



