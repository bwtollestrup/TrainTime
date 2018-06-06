$(document).ready(function(){
var config = {
    apiKey: "AIzaSyAfuurTBmfrwoPrRxw0ayksr3tgKaeKK94",
    authDomain: "traintimeweek07homework.firebaseapp.com",
    databaseURL: "https://traintimeweek07homework.firebaseio.com",
    projectId: "traintimeweek07homework",
    storageBucket: "",
    messagingSenderId: "168551911029"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
 $("#add-train-btn").on("click", function(event){ 
    event.preventDefault();
  
  
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-input").val().trim(), "hh:mm").format("X");
    var trainFreqeuncy = $("#frequencey-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrainTime: firstTrainTime,
      frequency: trainFreqeuncy,
    };
  

    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.trainFreqeuncy);
  

    alert("Train successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequencey-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var firstTrainTime = childSnapshot.val().start;
    var trainFreqeuncy = childSnapshot.val().rate;
  
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFreqeuncy);
  
    var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("HH:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  });
  });
  