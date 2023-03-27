<?php 

	header('Access-Control-Allow-Origin: http://localhost:5173');
	header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: *');
	header('Content-Type: application/json');

	$data = json_decode(file_get_contents('php://input'));

	$email = $data -> email;
	$mdp = $data -> password;


	http_response_code(201);

	echo $email. '||'. $mdp;
?>
