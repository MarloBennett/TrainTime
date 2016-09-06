// Initialize Firebase
var config = {
    apiKey: "AIzaSyCrGv9FVTLmYimXU0-lZI3fIlJdVhHK59c",
    authDomain: "train-project-508fe.firebaseapp.com",
    databaseURL: "https://train-project-508fe.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

var newTrainName;
var newTrainDestination;
var newTrainTime;
var newTrainFrequency;

//button for ading trains
$("#addTrain").on("click", function() {

	//get user input
	newTrainName = $("#trainNameInput").val().trim();
	newTrainDestination = $("#destinationInput").val().trim();
	newTrainTime = $("#firstTrainInput").val().trim();
	newTrainFrequency = $("#frequencyInput").val().trim();

	//creat object to hold train data
	var newTrainListing = {
		name: newTrainName,
		dest: newTrainDestination,
		first: newTrainTime,
		freq: newTrainFrequency
	};

	//upload train data to firebase
	firebase.database().ref().push(newTrainListing);

/*	console.log(newTrainListing.name);
	console.log(newTrainListing.dest);
	console.log(newTrainListing.first);
	console.log(newTrainListing.freq);*/

	//clears text boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

//end of add train function
});

//add employee to firebase database and a row in html
firebase.database().ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val());

	//store snapshot values in variables
	newTrainName = childSnapshot.val().name;
	newTrainDestination = childSnapshot.val().dest;
	newTrainTime = childSnapshot.val().first;
	newTrainFrequency = childSnapshot.val().freq;

	console.log(newTrainName);
	console.log(newTrainDestination);
	console.log(newTrainTime);
	console.log(newTrainFrequency);

	/*var currentTime = moment();
	console.log("current time " + moment(currentTime).format("hh:mm"));*/

	//time of first train
	var newTrainTimeDisplay = moment(newTrainTime, "hh:mm").subtract(1, "years");
	console.log(newTrainTimeDisplay);

	//difference between now and the train's first trip time
	var difference = moment().diff(moment(newTrainTimeDisplay), "minutes");
	console.log("difference " + moment(difference).format("mm"));

	//remainder is time left between trains
	var trainRemainder = difference % newTrainFrequency;
	console.log("remainder :" + trainRemainder);

	//minutes until train
	var minutesLeft = newTrainFrequency - trainRemainder;
	console.log("minutes left :" + minutesLeft);

	var nextTrain = moment().add(minutesLeft, "minutes");
	console.log ("arrival: " + moment(nextTrain).format("hh:mm"));

	//add data to train schedule
	$("#train-schedule > tbody").append("<tr class='active'><td>" + newTrainName + "</td><td>" + newTrainDestination + "</td><td>" + newTrainFrequency + "</td><td>" + moment(nextTrain).format('hh:mm') + "</td><td>" + minutesLeft + "</td></tr>");

//end of add to database and html table function
});
