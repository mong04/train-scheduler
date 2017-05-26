$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyAYIgwkqkjbUfX38aO0H56eUGaj_oVbJ8A",
    authDomain: "train-scheduler-b2916.firebaseapp.com",
    databaseURL: "https://train-scheduler-b2916.firebaseio.com",
    // projectId: "train-scheduler-b2916",
    storageBucket: "train-scheduler-b2916.appspot.com",
    // messagingSenderId: "549249997323"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#submit').on('click', function(event){
	event.preventDefault();

	var trainName = $('#train-name').val().trim();
	var destination = $('#destination').val().trim();
	var trainTime = $('#train-time').val().trim();
	var frequency = $('#frequency').val();

	$('#train-name').val('');
	$('#destination').val('');
	$('#train-time').val('');
	$('#frequency').val('');

	database.ref().push({
		trainName: trainName,
		destination: destination,
		trainTime: trainTime,
		frequency: frequency
	})
  });

  database.ref().on("child_added", function(snapshot) {
  	var firstTime = snapshot.val().trainTime;
  	var trainFreq = snapshot.val().frequency;

  	var a = moment(firstTime, 'HH:mm');
  	var b = moment();

  	while (a.isBefore(b)) {
		firstTime = a.add(trainFreq, 'minutes').format('HH:mm');
	}
	console.log(firstTime);
	var timeUntil = a.diff(moment(), 'minutes');
	console.log(timeUntil);


  	var row = $("<tr>");

  	var tNameCell = $("<td>").html(snapshot.val().trainName);
	row.append(tNameCell);

	var destinationCell = $("<td>").html(snapshot.val().destination);
	row.append(destinationCell);

	var frequencyCell = $("<td>").html(snapshot.val().frequency + " mins");
	row.append(frequencyCell);

	var nextTrainCell = $("<td>").html(firstTime);
	row.append(nextTrainCell);

	var minutesUntil = $("<td>").html(timeUntil + " mins");
	row.append(minutesUntil);

	$("#train-table tr:last").after(row);

  })
});