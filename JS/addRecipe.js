//----------------Start of Storage-----------------------------------
// variable which will hold the database connection
var db;
initializeDB();  
function initializeDB() {
    if (window.indexedDB) {
        console.log("IndexedDB support is there");
    }
    else {
        alert("Indexed DB is not supported. Where are you trying to run this ? ");
    }
// open the database
// 1st parameter : Database name. We are using the name 'notesdb'
// 2nd parameter is the version of the database.
    var request = indexedDB.open('recipedb', 1);
    request.onsuccess = function (e) {
// e.target.result has the connection to the database
        db = e.target.result;
//Alternately, if you want - you can retrieve all the items
    }
    request.onerror = function (e) {
        console.log(e);
    };
// this will fire when the version of the database changes
// We can only create Object stores in a versionchange transaction.
    request.onupgradeneeded = function (e) {
// e.target.result holds the connection to database
        db = e.target.result;
        if (db.objectStoreNames.contains("recipes")) {
            db.deleteObjectStore("recipes");
        }
// create a store named 'notes'
// 1st parameter is the store name
// 2nd parameter is the key field that we can specify here. Here we have opted for autoIncrement but it could be your
// own provided value also.
        var objectStore = db.createObjectStore('recipes', {keyPath: 'id', autoIncrement: true});
        console.log("Object Store has been created");
    };
}

//----------------Start of functions to dynamically add items-----------------
var ingrCounter = 0;
var stepCounter = 0;
var ingrID;//ID of last created ingredient element in form
var stepID;//ID of last created step element in form
$(document).ready(function () {
    
    // ingrID = document.('#formIngr');
    ingrID = document.forms[ingrCounter];//gets id of last created ingredient element in form
    // ingrID = document.("#formIngr")[ingrCounter];

    $("#btnAddIngredient").click(function () {//Add ingredients and qty
        ingrCounter++;
        //creates 2 new input boxes for qty and ingredients in form
        $('#formIngr').append('<input class="fMed fLeft" type="text" name="qty' + ingrCounter + '" placeholder="Qty ' + (ingrCounter + 1) + '" id="qty' + ingrCounter + '">');
        $('#formIngr').append('<input class="fMed fRight" type="text" name="ingr' + ingrCounter + '" placeholder="Ingredient ' + (ingrCounter + 1) + '" id="ingr' + ingrCounter + '">');
    });

    stepID = document.forms[ingrCounter];

    $("#btnAddInstruction").click(function () {//Add Steps to recipe
        stepCounter++;
        //creates new input box for steps in form
        $('#formStep').append('<input class="fMed fFull" type="text" name="step' + stepCounter + '" placeholder="Step ' + (stepCounter + 1) + '" id="step' + stepCounter + '">');
    });

//---------------viewing recipe--------------------------------
    $("#listPage").click(function () {
    
    //Read the notes
        var transaction = db.transaction(['recipes']);
        var store = transaction.objectStore('recipes');
    // open a cursor to retrieve all items from the 'notes' store
    
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                var value = cursor.value;
                
                var h3NoteTitle = $("<h3/>").text(value.title);
                //var pNoteDetails = $("<p/>").text(value.details);
                //$("#secret").append(h3NoteTitle);
// move to the next item in the cursor
                cursor.continue();
            }
            $('div[data-role=collapsible]').collapsible({refresh: true});
        };
    });
    
    
 //----------------------------Adding recipes--------------------------
    //Click Handlers for Add Notes page
    $("#bttnSave").click(function () {
        recipeTitle = $("#recipeName").val();
        servingsBox = $("#servings").val();
        for( var i=1; i <= ingrCounter; i++)
            {
                var qtyCount = qtyBox + i;
                var ingrCount = ingrBox +i;
                qtyCount = $("#qty").val();
                ingrCount = $("#ingr").val();
            }
            for( var i=1; i <= stepCounter; i++)
            {
                var stepCount = stepBox + i;
                stepCount = $("#step").val();
            }
            
    // create the transaction with 1st parameter is the list of stores and the second specifies
    // a flag for the readwrite option
        var transaction = db.transaction(['recipes'], 'readwrite');
    //Create the Object to be saved i.e. our Note
        var value = {};
        value.title = recipeTitle;
        value.servings = servingsBox;
    // add the note to the store
        var store = transaction.objectStore('recipes');
        var request = store.add(value);
        request.onsuccess = function (e) {
            alert("Your note has been saved"+recipeTitle);
        };
        request.onerror = function (e) {
            alert("Error in saving the note. Reason : " + e.value);
        }
    });
});



