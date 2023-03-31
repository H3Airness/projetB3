<?php 

	/*header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: *');
	header('Content-Type: application/json');*/

	/*$data = json_decode(file_get_contents('php://input'));

	$email = $data -> email;
	$mdp = $data -> password;


	http_response_code(201);*/

	$user = "root";
	$password = "Admin1234!";

	$db = new PDO('mysql:host=localhost;dbname=airneis', $user, $password);

	if(isset($db))
	{
		echo "Connected";

	} else echo "Not Connected";

?>
