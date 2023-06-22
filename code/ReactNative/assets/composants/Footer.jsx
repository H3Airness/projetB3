import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.navBgFooter}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.navLink}
            onPress={() => {
              // Gérer la navigation vers "/CGU"
            }}
          >
            <Text style={styles.navLinkText}>Condition Générale d'Utilisation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navLink}
            onPress={() => {
              // Gérer la navigation vers "/mention-legale"
            }}
          >
            <Text style={styles.navLinkText}>Mentions Légales</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navLink}
            onPress={() => {
              // Gérer la navigation vers "/contact"
            }}
          >
            <Text style={styles.navLinkText}>Contact</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialLinks}>
          <TouchableOpacity
            onPress={() => {
              // Gérer l'ouverture du lien LinkedIn
            }}
          >
            <FontAwesomeIcon icon={faLinkedin} style={styles.icon} size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Gérer l'ouverture du lien Instagram
            }}
          >
            <FontAwesomeIcon icon={faInstagram} style={styles.icon} size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Gérer l'ouverture du lien Facebook
            }}
          >
            <FontAwesomeIcon icon={faFacebook} style={styles.icon} size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  footer: {
    backgroundColor: '#ffffff',
  },
  navBgFooter: {
    backgroundColor: '#000000',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navLink: {
    flex: 1,
  },
  navLinkText: {
    color: '#ffffff',
    fontSize: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icon: {
    color: '#ffffff',
  },
};

export default Footer;
