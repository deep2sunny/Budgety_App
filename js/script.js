
//BUDGET CONTROLLER
var budgetController = (function(){

  var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  }


})();

var Expense = function(id,description,value){
  this.id = id;
  this.description = description;
  this.value = value;
}

//UI CONTROLLER
var UIController = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  };

  return {
    getInput: function(){
        return {
          type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: document.querySelector(DOMstrings.inputValue).value
        };
      },
    getDOMstrings: function(){
        return DOMstrings;
      }
    };

})();


//GOLBAL APP CONTROLLER
var controllerApp = (function(budgetCtrl, UICtrl){

  var setupEventListeners = function() {

    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    //gobal event
    document.addEventListener('keypress', function(event){

      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }

      //console.log(event);
    });
  }



  var  ctrlAddItem = function(){

    //  1. Get the field input data
    var input = UICtrl.getInput();
    console.log(input);

    //  2. Add the item to budget controller
    //  3. Add the item to UI
    //  4. Calculate budget
    //  5. Display budget on UI


  }

  return {
    init: function() {
      console.log("Application has started");
      setupEventListeners();
    }
  }


})(budgetController, UIController);


controllerApp.init();
