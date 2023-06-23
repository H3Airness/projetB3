import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function Contact() {
  const [response, setResponse] = useState('');
  const navigation = useNavigation();

  const nomRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = () => {
    const demande = {
      nom: nomRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    const postData = async () => {
      try {
        const response = await axios.post(
          'http://airneis.ddns.net:3000/contact/contact.php',
          demande,
          {}
        );
        setResponse(response.data);

        if (response.status === 204) {
          navigation.navigate('acceuil');
          Alert.alert('Message envoyé !', 'Nous vous répondrons dans les plus brefs délais.');
        }
      } catch (error) {
        console.log(error);
      }
    };

    postData();
  };

  return (
    <ScrollView>
        <View>
            <Text style={styles.contactTitre}>Formulaire de Contact</Text>


            <View style={styles.Contact}>
                <View>
                <View><Text style={styles.contactLog}>Information de contact</Text></View>
                <View style={styles.iconContact}>
                    <Text>27-33 Av. des Champs-Élysées</Text>
                    <Text>75008, Paris, France</Text>
                </View>
                <View style={styles.iconContact}>
                    <Text>airneis@hotmail.com</Text>
                </View>
                <View style={styles.iconContact}>
                    <Text>01 00 00 00 00</Text>
                </View>
                </View>

                <View style={styles.contactCard}>
                <View style={styles.cardHeader}>
                    <View><Text style={styles.contactLog}>Envoyez nous un message</Text></View>
                </View>
                <View>
                    {response && (
                    <Text style={styles.reponseFormulaire}>{response.message}</Text>
                    )}
                    <View style={styles.formGroup}>
                    <Text>Nom:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre nom"
                        ref={nomRef}
                    />
                    </View>

                    <View style={styles.formGroup}>
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="votre@email.fr"
                        ref={emailRef}
                    />
                    </View>

                    <View style={styles.formMessage}>
                    <Text>Message:</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Commentaire"
                        multiline={true}
                        numberOfLines={5}
                        ref={messageRef}
                    />
                    </View>

                    <TouchableOpacity style={styles.formGroup} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Envoyer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </View>
    </ScrollView>
  );
}

const styles = {
  contactTitre: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  Contact: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contactLog: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactCard: {
    flex: 1,
    marginLeft: 20,
  },
  cardHeader: {
    padding: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  textarea: {
    height: 100,
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: 'blue',
    color: '#fff',
    padding: 10,
  },
  reponseFormulaire: {
    textAlign: 'center',
    marginTop: 10,
  },
};

export default Contact;
