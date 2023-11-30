// this function is used to copy text to clipboard
function copyCode(text,code) 
{ 
  // Copy the text inside the clipboard
  navigator.clipboard.writeText(text);

  // this will display Copied after text is copied to clipboard
  var copyButton = document.querySelector('button.'+code);
  copyButton.innerText = 'Copied!';

  // This function will change button text back after 1second copy code 
  setTimeout(function() 
  {
    copyButton.innerText = 'Copy Code';
  }, 1000);
}


// Jquery for the pizza website
$(document).ready(function () 
{

  // this function will load footer and header of the website
  $(function()
  {
    $('.footer').load('footer.html');
    $('#header').load('header.html');
  });

  
  // this functions will hide and show pizza order form
    $('button.delivery').click(function() 
    {  
        $("div.backgroundBlur").fadeIn();
        $("div.orderPizza").fadeIn();
        $("div.delivery").css('display','flex');
        $("span.delivery").css('display','inline');     
    });

    $('button.carryOut').click(function() 
    {  
      $("div.backgroundBlur").fadeIn();
      $("div.orderPizza").fadeIn();
      $("span.carryOut").css('display','inline');
    });

    $('#closeForm').click(function() 
    {  
      $("div.delivery").fadeOut();
      $("span.delivery").fadeOut();
      $("span.carryOut").fadeOut();
      $("div.backgroundBlur").fadeOut();
      $("div.orderPizza").fadeOut();
    });

    // This array will store pizza orders in the cart
    var cartItems = []; 
  
    // This function will add the selected pizza to the cart
    $('#addToCart').click(function(event)
    {
      // this fuction prevents function from submitting
      event.preventDefault()

      // Get the pizza customization details from the form
      var pizzaSize = $('#pizzaSize').val();
      var crustType = $('input[name="crustType"]:checked').val();
      var sauce = $('input[name="sauce"]:checked').val();
      var toppings = [];
      if(toppings.length === 0)
      {
        toppings[0] = "No toppings";
      }

      // this foreach loop will add all the checked toppings to toppings[] array
      $('input[name="toppings[]"]:checked').each(function() {
        toppings.push($(this).val());
      });

      // quantity will be parsed to int with base 10
      var quantity = parseInt($('#quantity').val(), 10);
  
      // this wll create a pizza object with the customization details
      var pizza = 
      {
        size: pizzaSize,
        crustType: crustType,
        sauce: sauce,
        toppings: toppings,
        quantity: quantity,
      };
  
      // push will add pizza object to the cartItems array
      cartItems.push(pizza);
  
      // Display the cart items
      displayCart();
    });
    
    // this function will print individual pizza name
    $("section.pizzaTypes > div > div:nth-child(2) > div:nth-child(4) > button").click(function(){
      
      $('#cartItems').append('<li> Veggie delight </li>');
    });

    $("section.pizzaTypes > div > div:nth-child(3) > div:nth-child(4) > button").click(function(){
      $('#cartItems').append('<li> Supreme Pizza </li>');
    });

    $("section.pizzaTypes > div > div:nth-child(4) > div:nth-child(4) > button").click(function(){
      $('#cartItems').append('<li> Vegetarian Pizza </li>');
    });

    // This function will display the cart items
    function displayCart() 
    {
      const cartList = $('#cartItems');
      // foreach loop will iterate throught all the orders in cart items and add it to ul
      cartItems.forEach((pizza) => {
        cartList.append(`<li>${pizza.size} - ${pizza.crustType} - ${pizza.sauce} - ${pizza.toppings.join(', ')} - Quantity: ${pizza.quantity}</li>`);
      });

      cartItems = [];
    }
      
    // this function will place pizza order if form is valid
    $("#submitOrderBtn").click(function() 
    {
      var address = $("#address").val();
      var phone = $("#phone").val();
      var name = $("#name").val();
      
      // to check wether pizza is added to cart or not
      if($("#cartItems").children().length === 0)
      {
        alert("select the pizza first");
      }
      else
      {
        // This will submit the form if all  the elements are entered
        if($("div.delivery").css('display') === 'none')
        {
          if (name && phone) 
          {
            $('#pizzaForm').submit(); 
            alert("Your order has been place!") 
          }
        }
        else
        {
          if (name && address && phone) 
          {
            $('#pizzaForm').submit();  
            alert("Your order has been place!") 
          }
        }
      }
    });
  });
  