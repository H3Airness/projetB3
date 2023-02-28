import { useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';

function Connexion() {
  const [name,setName] = useState('');
  const [mdp,setMobile] = useState('');

  const handleSubmit = () => {
      const url = 'http://localhost/enquiry.php';
      let fData = new FormData();
      fData.append('name', name);
      fData.append('mdp', mdp);
      axios.post(url, fData).then(response=> alert(response.data)).catch(error=> alert(error));
  }

  return (
    <>
    <Menu/>
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
          <input type="password" name="mdp" id="mdp" value={mdp} onChange={(e) => setMobile(e.target.value)} />
        </div>

        <input type="button" name="submit" id="submit" value="connecter" onClick={handleSubmit} />
      </form>
</div>

    </>
  );
}

export default Connexion;
