import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { styles } from '../../../Styles';

const Connexion = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const authContext = useContext(AuthContext);

  const handleSubmit = async () => {
    const formType = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://airneis.ddns.net:3000/connexion.php',
        formType
      );

      if (response.data.status === 'success') {
        const message = response.data.message;
        setMessage(message);
        setTimeout(() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('accueil');
          }
        }, 1000);
        const { accountId, accountInfo } = response.data;
        authContext.login(accountId, accountInfo);

      } else if (response.data.status === 'error') {
        const error = response.data.error;
        setError(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <View style={styles.loginCard}>
        <View>
          <View style={styles.log}>
            <Text style={styles.loginTitre}>Connexion</Text>
          </View>
        </View>
        <View>
          <View style={styles.message}>
            {message && <Text style={styles.successText}>{message}</Text>}
          </View>
          <View style={styles.error}>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text>Mot de passe:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity onPress={handleSubmit} style={styles.ajouterButton}>
            <Text style={styles.ajouterButtonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textCenter}>
          <TouchableOpacity
            onPress={() => navigation.navigate('inscription')}
            style={styles.compteNav}
          >
            <Text style={styles.compteNav}>Créer un compte ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Connexion;
