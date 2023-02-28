import { useState } from 'react';
import axios from 'axios';

function Connexion() {
  const [name,setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [email,setEmail] = useState('');

  const handleSubmit = () => {
    if(name.length === 0){
      alert("Name has left Blank!");
    }
    else if(mobile.length === 0){
      alert("Mobile has left Blank!");
    }
    else if(email.length === 0){
      alert("Email has left Blank!");
    }
    else{
      const url = 'http://localhost/enquiry.php';
      let fData = new FormData();
      fData.append('name', name);
      fData.append('mobile', mobile);
      fData.append('email', email);
      axios.post(url, fData).then(response=> alert(response.data)).catch(error=> alert(error));
    }
  }

  return (
    <>
      <div class="login-card">
        <div class="card-header">
          <div class="log">Login</div>
        </div>

      <form>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" name="mdp" id="mdp" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>

        <input type="button" name="submit" id="submit" value="connecter" onClick={handleSubmit} />
      </form>
</div>

    </>
  );
}

export default Connexion;
