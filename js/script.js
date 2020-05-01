
//BUDGET CONTROLLER : Keeps track of all income and expenses and also of the budget itself and later percentages
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

  //User creates 10 incomes, where to store them, we need data structure

  var data = {
      allItems: {
        exp: [],
        inc: []
      },
     totals: {
       exp: 0,
       inc: 0
     }
  };

  return {
    addItem: function(type,desc,val){
      var newItem;

      //ID = ID + 1
      //create new ID
      if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }else {
        ID = 0;
      }


      //create new item based on 'inc' or 'exp' type
      if(type === 'exp'){
        newItem = new Expense(ID, desc, val);
      } else if( type === 'inc'){
        newItem = new Income(ID, desc, val);
      }

      //Push it into our data structure
      data.allItems[type].push(newItem);

      //Return the new element
      return newItem;

    },

    testing: function(){
      console.log(data);
    }
  }




})();


//UI CONTROLLER
var UIController = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list'
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
      },
    addListItem: function(obj,type){
        var html, newHTML;
        // Create HTML string with placeholder text

        if(type === 'inc'){
          element = DOMstrings.incomeContainer;
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        else if(type === 'exp'){
          element = DOMstrings.expenseContainer;
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }


        // Replace the placeholder text with some actual data
        newHTML = html.replace('%id%', obj.id);
        newHTML = newHTML.replace('%description%', obj.description);
        newHTML = newHTML.replace('%value%',obj.value);


        // Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
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
    var input, newItem;

    //  1. Get the field input data
    input = UICtrl.getInput();
    console.log(input);

    //  2. Add the item to budget controller
    newItem = budgetCtrl.addItem(input.type,input.description,input.value); //addItem returns object, so save it here

    //  3. Add the item to UI
    UICtrl.addListItem(newItem, input.type);

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
