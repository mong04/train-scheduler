var time = "02:00";
var freq = "15";

var a = moment(time, 'HH:mm');
var b = moment();

while (a.isBefore(b)) {
	time = a.add(freq, 'minutes').format('HH:mm');
}
console.log(time);