<?php 

	header('Access-Control-Allow-Origin: *');
<<<<<<< Updated upstream
	// header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
=======
	header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
>>>>>>> Stashed changes
	header('Access-Control-Allow-Headers: *');
	header('Content-Type: application/json');

	$data = json_decode(file_get_contents('php://input'));

	$email = $data -> email;
	$mdp = $data -> password;

<<<<<<< Updated upstream
	http_response_code(201);

	echo 'Reponse envoye ! '. $email. '||'. $mdp;

=======
	$user = 'id20162419_counterstrike';
	$password = 'ProjetB3Dev!@';

	$db = new PDO('mysql:host=airnes.000webhostapp.com;dbname=id20162419_airneis', $user, $password);

	if(isset($db))
	{
		echo "CONNECTED";
	} else echo "NOT CONNECTED";
>>>>>>> Stashed changes
?>
