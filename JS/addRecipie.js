var ingrCounter = 0;
var stepCounter = 0;
var ingrID;//ID of last created ingredient element in form
var stepID;//ID of last created step element in form
$(document).ready(function () {

  ingrID = document.forms[ingrCounter];//gets id of last created ingredient element in form
  // ingrID = document.("#formIngr")[ingrCounter];

  $("#btnAddIngredient").click(function () {//Add ingredients and qty
      ingrCounter++;
      //creates 2 new input boxes for qty and ingredients in form
      $(ingrID).append('<input class="fMed fLeft" type="text" name="qty' + ingrCounter + '" placeholder="Qty ' + (ingrCounter + 1) + '" id="qty' + ingrCounter + '">');
      $(ingrID).append('<input class="fMed fRight" type="text" name="ingr' + ingrCounter + '" placeholder="Ingredient ' + (ingrCounter + 1) + '" id="ingr' + ingrCounter + '">');
  });

  stepID = document.forms[ingrCounter];

  $("#btnAddInstruction").click(function () {//Add Steps to recipe
      stepCounter++;
      //creates new input box for steps in form
      $(stepID).append('<input class="fMed fFull" type="text" name="step' + stepCounter + '" placeholder="Step ' + (stepCounter + 1) + '" id="step' + stepCounter + '">');
  });
});