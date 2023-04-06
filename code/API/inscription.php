<?php 

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: *');
	header('Access-Control-Allow-Headers: *');
	header('Content-Type: application/json');

	$data = json_decode(file_get_contents('php://input'));

	$email = $data -> email;
	$mdp = $data -> password;

//Connexion à la BDD

$db = new PDO('mysql:host=86.247.29.14;dbname=airneis;charest=utf8', 'airneis','Admin1234!');

$request = $db->prepare('SELECT * FROM espace_membres WHERE email = :email AND password = :password');
$request->execute(array('email' => $email, 'password' => $password));

$userExist = $request->fetch();

if($userExist)
{
	$reponse = array('statut' => 'success', 'message' => 'Connexion réussie !');
}
else  $reponse = array('statut' => 'Error', 'message' => 'Email ou mot de passe incorrect');

echo json_encode($reponse);

?>