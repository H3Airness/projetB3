<?php 

	header('Access-Control-Allow-Origin: *');
	
	$conn = new mysqli("localhost","react_api","1181","react_api");
	
	if(mysqli_connect_error()){
		echo mysqli_connect_error();
		exit();
	}
	else{
		$name = $_POST['name'];
		$mdp = $_POST['mdp'];
		$email = $_POST['email'];
		
		$sql = "INSERT INTO enquiry(name, mdp) VALUES('$name','$mdp');";
		$res = mysqli_query($conn, $sql);
		
		if($res){
			echo "Success!";
		}
		else{
			echo "Error!";
		}
		$conn->close();
	}

?>
