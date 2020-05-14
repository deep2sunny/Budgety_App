
//BUDGET CONTROLLER : Keeps track of all income and expenses and also of the budget itself and later percentages
var budgetController = (function(){

  var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercenatge = function(totalIncome) {
    if(totalIncome > 0){
    this.percentage = Math.round((this.value / totalIncome) * 100);
    }
    else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercetange = function(){
    return this.percentage;
  };

  var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  //User creates 10 incomes, where to store them, we need data structure

  var calculateTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(cur){
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
      allItems: {
        exp: [],
        inc: []
      },
     totals: {
       exp: 0,
       inc: 0
     },
     budget: 0,
     percentage: -1   // -1 value that something is non existent
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

    deleteItem: function(type, id) {
      var ids, index;
      // id = 3
      ids = data.allItems[type].map(function(current) {
        console.log("Current ID = " + current.id);
        return current.id;

      });
      console.log("IDS = " +ids);
      console.log("Id = " + id);
      index = ids.indexOf(id);
      console.log("Index = " + index);

      if(index !== -1){
         data.allItems[type].splice(index,1);
      }

    },

    calculateBudget: function(){

      //calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      //calulcate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //calulcate the percentage of income that we spent
      if(data.totals.inc > 0){
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      }
      else {
        data.percentage = -1;
      }


    },

    calculatePercentages: function(){

      data.allItems.exp.forEach(function(current){
        current.calcPercenatge(data.totals.inc);
      });

    },

    getPercetanges: function() {

      var allPerc = data.allItems.exp.map(function(cur){
        return cur.getPercetange();
      });
      return allPerc;

    },

    getBudget: function() {

      return {
         budget: data.budget,
         totalInc: data.totals.inc,
         totalExp: data.totals.exp,
         percentage: data.percentage
      };
    },

    testing: function(){
      console.log(data);
    }
  };

})();


//UI CONTROLLER
var UIController = (function(){

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensePercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'

  };

  var formatNumber = function(num, type){
    var numSplit,int,dec;
    /*
    + or - before number
    excactly 2 decimal points
    comma separating the thousands

    2310.4567 -> + 2,310.46
    2000 -> 2,000.00
     */

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
    if(int.length > 3){
      int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3,3);
    }


    dec = numSplit[1];
    type === 'exp' ? sign = '-' : sign = '+';
    return sign + ' ' + int + '.' + dec;
  }

  return {
    getInput: function(){
        return {
          type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
          description: document.querySelector(DOMstrings.inputDescription).value,
          value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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
          html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        else if(type === 'exp'){
          element = DOMstrings.expenseContainer;
          html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }


        // Replace the placeholder text with some actual data
        newHTML = html.replace('%id%', obj.id);
        newHTML = newHTML.replace('%description%', obj.description);
        newHTML = newHTML.replace('%value%',formatNumber(obj.value,type));


        // Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
      },

      deleteListItem: function(selectorID){
        var el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);
      },

      clearFields: function(){
        var fields,fieldsArr;

        fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);  //returns a list
        console.log(fields);

        fieldsArr = Array.prototype.slice.call(fields);  //since slice a function we can call method on it
        console.log(fieldsArr);

        fieldsArr.forEach(function(current,index,array) {
        current.value = "";
        });

        fieldsArr[0].focus();

      },

      displayBudget: function(obj) {
        var type;
        obj.budget > 0 ? type = 'inc' : type = 'exp';

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
        document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');


        if(obj.percentage > 0){
          document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
        } else {
          document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        }
      },

      displayPercentages: function(percentages){

        var fields = document.querySelectorAll(DOMstrings.expensePercLabel);


        var nodeListForEach = function(list, callback){
           for(var i=0; i<list.length; i++){
             console.log("Fields = " + list[i]);
             callback(list[i],i);
           }
        };

        nodeListForEach(fields, function(current, index){
          if(percentages[index] > 0){
            current.textContent = percentages[index] + '%';
          }
          else{
            current.textContent = '---';
          }
        });
      },

      displayMonth: function(){
        var now,year,month;
        var now = new Date();
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        month = now.getMonth();
        year = now.getFullYear();
        document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

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

    document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

  };

  var updateBudget = function(){
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Calculate budget
    var budget = budgetCtrl.getBudget();

    // 3. Display budget on UI
    UICtrl.displayBudget(budget);
    console.log(budget);
  };

  var updatePercentages = function(){

    // 1. Calculate Percentages
    budgetCtrl.calculatePercentages();
    // 2. Read percentages from budget controller
    var percentages = budgetCtrl.getPercetanges();
    // Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
    //console.log(percentages);

  };

  var  ctrlAddItem = function(){
    var input, newItem;

    //  1. Get the field input data
    input = UICtrl.getInput();
    console.log(input);

    if(input.description !== "" && !isNaN(input.value) && input.value > 0){

      //  2. Add the item to budget controller
      newItem = budgetCtrl.addItem(input.type,input.description,input.value); //addItem returns object, so save it here

      //  3. Add the item to UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the Fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();

      // 6. Calculate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event){
    var itemID,splitID,type,ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID){

      //inc-1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type,ID);
      // 2. Delete the item from UI
      UICtrl.deleteListItem(itemID);
      // 3. Update and show the new Budgety
      updateBudget();

      // 4. Calculate and update percentages
      updatePercentages();
    }
  };

  return {
    init: function() {
      console.log("Application has started");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
         budget: 0,
         totalInc: 0,
         totalExp: 0,
         percentage: -1
      });
      setupEventListeners();
    }
  };


})(budgetController, UIController);


controllerApp.init();
