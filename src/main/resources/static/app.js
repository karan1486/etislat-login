var stompClient = null;

//initialize the event bus
var EventService = new EventBus();

function callback1(message){
	console.log("callback1 ::" + message);
	 $("#callback1").append("<p> callback1 : " + message + "</p>");
}

function callback2(message){
	console.log("callback2 : " + message);
	$("#callback2").append("<p> callback2 : " + message + "</p>");
}

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
        $("#conversation1").show();
    }
    else {
        $("#conversation").hide();
        $("#conversation1").hide();
    }
    $("#greetings").html("");
    $("#greetings1").html("");
}

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', onMessageReceived);
    });
    
    displayStompObject();
}

function onMessageReceived(greeting) {
    var message = JSON.parse(greeting.body).content;
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
    $("#greetings1").append("<tr><td>" + message + "</td></tr>");
    EventService.emitEventListeners('Event_Type' , message);
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


function sendName() {
	stompClient.send("/app/hello", {}, JSON.stringify({
		'name' : $("#name").val()
	}));
}


$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
    
  //add the event listener
    EventService.addEventListener('Event_Type', callback1);
    EventService.addEventListener('Event_Type', callback2);
});




