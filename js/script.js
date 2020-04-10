
//BUDGET CONTROLLER
var budgetController = (function(){



})();


//UI CONTROLLER
var UIController = (function(){

})();


//GOLBAL APP CONTROLLER
var controllerApp = (function(budgetCtrl, UICtrl){

  var ctrlAddItem = function(){

    //  1. Get the field input data
    //  2. Add the item to budget controller
    //  3. Add the item to UI
    //  4. Calculate budget
    //  5. Display budget on UI

    console.log('It Works');
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  //gobal event
  document.addEventListener('keypress', function(event){

    if(event.keyCode === 13 || event.which === 13){
      ctrlAddItem();
    }

    //console.log(event);
  });

})(budgetController, UIController);
