// create variable to hold DB connection
var db;

function initializeDB(){
  if (window.indexedDB){
    console.log("it works");
  }
  else{
    alert("broken");
  }
}
/*
$(document).ready(function(){
  // Check for indexedDB support
    if (window.indexedDB) {
      console.log("Indexed DB is supported");
    }
    else{
      alert("no indexedDB support.");
    }

  // open the database
  var request = indexedDB.open('recipeDB', 1);
  // parameters: 1) DB name 2) DB version
  request.onsuccess = function (e){
    // e. target.result has connection to DB
    db = e.target.result;
  }
  request.onerror = function (e){
    console.log(e);
  };
  request.onupgradeneeded (e) {
    db = e.target.result;
    if (db.objectStoreNames.contains("recipe")) {
      db.deleteObjectStore("notes");
    }
    var objectStore = db.createObjectStore('notes', {keyPath: 'id', autoIncrement: true});
    console.log("Object Store has been created");
  };

});


/*
Goal:
1. check if the client/device supports indexedDB. if support exists:

2. open DB, using parameters for name and version

3. create functions for success, error, upgradeneeded

4. create a "store" to hold recipes

store parameters: 1) store name 2) key 3) autoIncrement (if desired)








*/