<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));

$email = $data->email;
$password = $data->password;


// Connexion à la base de données
try {
    $db = new PDO('mysql:host=localhost;dbname=airneis;charset=utf8', 'airneis', 'Admin1234!');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si la connexion échoue, on renvoie une réponse d'erreur
    $response = array('status' => 'error', 'message' => 'Impossible de se connecter à la base de données.');
    echo json_encode($response);
    exit();
}
if(!empty($email) && !empty($password)) { 
    if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $request = $db->prepare('SELECT * FROM espace_membres WHERE email = :email');
        $request->execute(array('email' => $email));
            
        $userExist = $request->fetch();
        
        if($userExist)
        {
            $hashed_password = $userExist['password']; // Déplacement de cette ligne pour que la variable soit définie avant son utilisation.
            if(password_verify($password, $hashed_password))
            {
                $response = array('status' => 'success', 'message' => 'Connexion réussie !');
            }
            else
            {
                $response = array('status' => 'error', 'message' => 'Mot de passe incorrect.');
            }
        }
        else
        {
            $response = array('status' => 'error', 'message' => 'Email incorrect.');
        }
    }
    else
    {
        $response = array('status' => 'error', 'message' => 'L\'adresse email n\'est pas valide.');
        echo json_encode($response);
        exit();
    }
}
else
{
    $response = array('status' => 'error', 'message' => 'Les champs sont vides.');
    echo json_encode($response);
    exit(); 
}

echo json_encode($response);
?>
