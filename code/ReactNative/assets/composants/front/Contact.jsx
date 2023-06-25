import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../../Styles';

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
                <View><Text style={styles.contactLog}>Information de contact</Text></View>
                <View style={styles.iconContact}>
                    <Text>Addresse: 27-33 Av. des Champs-Élysées</Text>
                    <Text>75008, Paris, France</Text>
                </View>
                <View style={styles.iconContact}>
                    <Text>Email: airneis@hotmail.com</Text>
                </View>
                <View style={styles.iconContact}>
                    <Text>Tel: 01 00 00 00 00</Text>
                </View>
                </View>

                <View style={styles.contactCard}>
                <View>
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

                    <View style={styles.formGroup}>
                    <Text>Message:</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Commentaire"
                        multiline={true}
                        numberOfLines={5}
                        ref={messageRef}
                    />
                    </View>
                    <View style={styles.formGroup}>
                      <TouchableOpacity style={styles.ajouterButton} onPress={handleSubmit}>
                        <Text style={styles.ajouterButtonText}>Envoyer</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}

export default Contact;
