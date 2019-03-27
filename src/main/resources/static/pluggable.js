var pluggable = '<div class="col-md-6" style="border: solid;">'
		+ '	<form class="form-inline">'
		+ '		<div class="form-group">'
		+ '			<label for="connect">WebSocket connection:</label>'
		+ '			<button id="connect" class="btn btn-default" type="submit">Connect</button>'
		+ '			<button id="disconnect" class="btn btn-default" type="submit" '
		+ '				disabled="disabled">Disconnect</button> '
		+ '		</div> '
		+ '	</form> '
		+ '	<br> '
		+ '	<form class="form-inline"> '
		+ '		<div class="form-group"> '
		+ '			<label for="name">What is your name?</label> <input type="text" '
		+ '				id="name" class="form-control" placeholder="Your name here..."> '
		+ '		</div> '
		+ '		<button id="send" class="btn btn-default" type="submit">Send</button> '
		+ '	</form> ' + '	<br> '
		+ '	<table id="conversation" class="table table-striped"> '
		+ '		<thead> ' + '			<tr> ' + '				<th>Greetings</th> ' + '			</tr> '
		+ '		</thead> ' + '		<tbody id="greetings"> ' + '		</tbody> '
		+ '	</table> ' + '</div> ' +

$(document).ready(function() {
	$("#pluggable").html(pluggable)
});

function sendName() {
	stompClient.send("/app/hello", {}, JSON.stringify({
		'name' : $("#name").val()
	}));
}

$(function() {
	$("form").on('submit', function(e) {
		e.preventDefault();
	});
	$("#connect").click(function() {
		connect();
	});
	$("#disconnect").click(function() {
		disconnect();
	});
	$("#send").click(function() {
		sendName();
	});
});