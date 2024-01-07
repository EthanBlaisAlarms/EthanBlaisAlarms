// EBA OS Interaction Library
// Property of EthanBlaisAlarms
// © Copyright EthanBlaisAlarms 2024
// All Rights Reserved

// This library is used for pages that can interact with EBA OS
// This library will check if the page is being loaded on EBA OS, and if it is, execute the onEBAOS() function
// It is up to the web page to provide the onEBAOS() function if using the EBA OS library
// Additionally, this library will create the sendRequest() function, which will send an API request to EBA OS
// sendRequest() will only function if loaded in EBA OS

// NOTICE: While it is possible to bypass the EBA OS check by adding '?ebaos=true' to the URL, it is not recommended
// Please do not bypass the EBA OS checks

var ebaos = true;
var data;

function checkEBAOS() {
	// Verify EBA OS
	if (window.location.search.indexOf('?ebaos=true') == -1) {
		ebaos = false;
		return document.getElementById('error-noebaos').style['display'] = 'block';
	}

	// Verify Data
	if (window.location.search.indexOf('&data=') == -1) { return onEBAOS(); }
	data = window.location.search.substring(window.location.search.indexOf('&data=') + 6, window.location.search.length);
	try {
		data = JSON.parse(decodeURI(data));
	}
	catch (err) {
		alert('Error: Invalid JSON data. ' + JSON.stringify(err));
		onEBAOS();
		return;
	}
	onEBAOS(data);
}
function sendRequest(app, request, data) {
	if (!ebaos) { return alert('To use this feature, you must view this page on EBA OS.'); }
	if (!app) { return alert('Invalid request. Missing target application.'); }
	if (!request) { return alert('Invalid request. Missing request type.'); }
	if (typeof data == 'object') { data = JSON.stringify(data); }
	document.location = 'ebaos://' + app + '/' + request + '/' + (data ? data + '/' : '');
}

checkEBAOS();