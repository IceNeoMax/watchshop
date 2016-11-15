//get info of product that users want to purchase

var listOut = JSON.parse(localStorage.getItem('simpleCart_items'));
var lastPrice=0;
for(let key in listOut){

    let temp = "<ul class='cart-header2'><div class='close1'> </div><li class='ring-in'><a href='single.html' ><img src='"+listOut[key].src+"' class='img-responsive' alt="+"></a></li><li><span class='name keyproduct'>"+key+". Analog Watches</span></li><li><span class='name quantity'>"+listOut[key].quantity+"</span></li><li><span class='itemPrice'>"+listOut[key].price*listOut[key].quantity+"  $</span></li><div class='clearfix'> </div></ul>";
    $('.in-check').append(temp);
    lastPrice = lastPrice + listOut[key].price*listOut[key].quantity;
}
// create coupon and total price
let tempTotal = '<ul class="cart-header2" style="border-top: 1px solid black;"><li><span>Coupon:<input type="text" style="max-width:100px;"></span></li><li><span>Total</span></li><li><span class="name"></span></li><li><span class="simpleCart_total"> $</span></li><div class="clearfix"> </div></ul>';
console.log(lastPrice);
$('.in-check').append(tempTotal);

$( document ).ready(function() {
    let loginCheck = JSON.parse(localStorage.getItem('watch_login'));
    // remove any product from cart. also remove from local storage
    $('.close1').on('click', function(c){
                            $(this).parent().fadeOut('slow', function(c){
                                let getId = parseInt($(this).find('.keyproduct').text().charAt(0));
                                let getPrice = parseInt($(this).find('.itemPrice').text());
                                lastPrice -= getPrice;
                                delete listOut[getId];
                                console.log(lastPrice);
                                localStorage.setItem('simpleCart_items', JSON.stringify(listOut));
                                $('.simpleCart_total').replaceWith("<span class='simpleCart_total'>"+lastPrice+" $</span>"); 
                                $(this).remove();                               
                            });
        
    });	
    
    // init info if customers dont login
    if(loginCheck==null&&lastPrice>0){
        $('.in-check').append('<div class="col-md-6 col-md-offset-3 col-xs-12" id="append-no-login"><div class="form-group"><div class="input-group"><input class="form-control" placeholder="Enter Your Name" id="name" type="text" required/> </div></div><div class="form-group"><div class="input-group"><input class="form-control" placeholder="Enter Your Phone" id="phone" type="text" /> </div></div><div class="form-group"><div class="input-group"><input class="form-control" placeholder="Enter Your Address" id="address" name="address" type="text" /></div></div></div>');
    }
    // if golden user
    // give coupon if price>800 and give point if price >1000
    // then remove cart from local storage
    $('#check-out-shop').click(function(){
        if(loginCheck!=null&&lastPrice>0){
           firebase.database().ref('/customers/'+loginCheck.id).once('value').then(function(snapshot) {
               let point = snapshot.val().point;
               if(snapshot.val().golden==true){ 
                   if(lastPrice>800){
                       firebase.database().ref('/coupon/'+loginCheck.id).once('value').then(function(snapshot) {
                           let keylist="abcdefghijklmnopqrstuvwxyz1234567890"
                            let tmp = ''
                                for(let i=0;i<6;i++){
                                tmp+=keylist.charAt(Math.floor(Math.random()*keylist.length))
                                }
                           let lastkey = 0;
                           for(let key in snapshot.val()){
                            if(snapshot.val().hasOwnProperty(key)){
                                        lastKey = key;
                                    }
                                }
                            let insertKey = parseInt(lastKey)+1;
                           let dataIn = {}
                           dataIn[insertKey]=tmp;
                           firebase.database().ref('coupon/' +loginCheck.id).update(dataIn);
                       })
                   }
                   if(lastPrice>1000){
                       firebase.database().ref('/customers/'+loginCheck.id).update({point:point+100});
                   }
               }
           });
            writeSaleData(loginCheck.id,listOut, "", "","");
            localStorage.removeItem('simpleCart_items');
            $('.in-check').remove();
            $('.ckeckout-top').append('<h3>Thanks For Purchasing Our Products!');
            $('.simpleCart_total').replaceWith("<span class='simpleCart_total'>0.00 $</span>");
        }
        // if not golden just remove local storage items
        else if(loginCheck==null&&lastPrice>0){
            console.log("asd");
            writeSaleData("",listOut, $('#address').val(), $('#phone').val(),$('#name').val());
            localStorage.removeItem('simpleCart_items');
            $('.in-check').remove();
            $('.ckeckout-top').append('<h3>Thanks For Purchasing Our Products!');
            $('.simpleCart_total').replaceWith("<span class='simpleCart_total'>0.00 $</span>");
            $('#append-no-login').remove();
        }                       
    });
    //write each sale list into firebase
    function writeSaleData(userId,listItem, address, phone,name) {
      firebase.database().ref('sales/' ).push({ 
        
        phone: phone,
        address: address,
        listItem : listItem,
          userId: userId,
          name: name
      });
}
});