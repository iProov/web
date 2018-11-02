<?php

// Change this if you want to use a specific region or instance
define('BASE_URL', 'https://secure.iproov.me/api/v2');

// TODO: Set your API credentials
$api_key = '***YOUR_API_KEY***';
$secret = '***YOUR_SECRET***';

// Get data from the form
$user_id = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_EMAIL);
$token = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_STRING);
$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_STRING);
$type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_STRING);
$example = filter_input(INPUT_POST, 'example', FILTER_SANITIZE_STRING);

// Validate data for API call
if(!preg_match('/^[a-z0-9]{40}$/', $api_key)) {
	echo json_encode(['error' => 'invalid_config', 'error_description' => 'Invalid API Key']);
	return;
}

if(!preg_match('/^[a-z0-9]{40}$/', $secret)) {
	echo json_encode(['error' => 'invalid_config', 'error_description' => 'Invalid Secret']);
	return;
}

if(!preg_match('/^[a-zA-Z0-9\+_@\.-]{1,256}$/', $user_id)) {
	echo json_encode(['error' => 'invalid_user_id', 'error_description' => 'Invalid User ID']);
	return;
}

if($action === 'validate' && !preg_match('/^[a-z0-9]{64}$/', $token)) {
	echo json_encode(['error' => 'invalid_token', 'error_description' => 'Invalid Token']);
	return;
}

if(!in_array($action, ['token', 'validate'])) {
	echo json_encode(['error' => 'invalid_action', 'error_description' => 'Invalid Action']);
	return;
}

if(!in_array($type, ['enrol', 'verify'])) {
	echo json_encode(['error' => 'invalid_type', 'error_description' => 'Invalid Type']);
	return;
}

if(!in_array($example, ['html', 'javascript', 'jquery'])) {
	$example = 'html';
}

// Make API call with relevant data
$url = BASE_URL . "/claim/$type/$action";
$data = [
	'api_key'  => $api_key,
	'secret'   => $secret,
	'user_id'  => $user_id
];

if($action === 'token') {
	$data['resource'] = $_SERVER['REQUEST_URI'];
	$result = call_api($url, $data);
}

if($action === 'validate') {
	$data['token'] = $token;
	$data['client'] = $_SERVER['HTTP_USER_AGENT'];
	$data['ip'] = $_SERVER['REMOTE_ADDR'];
	$result = call_api($url, $data);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	echo $result;
} else {
	$response = json_decode($result);
	$html = file_get_contents("../examples/$example.html");
	if(property_exists($response, 'error')) {
		// An error occurred - see $response->error_description;
	} else {
		$html = str_replace('***YOUR_TOKEN_HERE***', $response->token, $html);
		$html = str_replace('***YOUR_TYPE_HERE***', $type, $html);
	}
	echo $html;
}

function call_api($url, $data) {
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_USERAGENT, 'PHP v' . phpversion());
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_TIMEOUT, 10);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);// this should be true when calling from a secure page
	$result = curl_exec($curl);
	if ($result === false) {
		echo 'Curl error: ' . curl_error($curl);
	}
	curl_close($curl);

	return $result;
}
