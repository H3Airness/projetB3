import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';

const MenuNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigation = useNavigation();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = () => {
    setMenuOpen(false);
  };

  const handleMenuItemPress = () => {
    setMenuOpen(false);
    // Ajoutez le code pour naviguer vers la page appropriée en fonction de l'élément de menu sélectionné
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleMenuClick = () => {
      // Prevent the menu from closing when clicked inside
    };

    const subscription = navigation.addListener('blur', () => {
      setMenuOpen(false);
    });

    return () => {
      subscription();
    };
  }, [menuOpen]);

  return (
    <TouchableWithoutFeedback onPress={handleClickOutside}>
      <View style={styles.menuNavigation}>
        <TouchableOpacity style={styles.iconContainer} onPress={toggleMenu}>
          <Image
            style={styles.menuIcon}
            source={{ uri: 'http://airneis.ddns.net:3000/img/icon_menu.png' }}
          />
        </TouchableOpacity>
        {menuOpen && (
          <View style={[styles.menu, menuOpen ? styles.openMenu : null]} ref={menuRef}>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
              <Text style={styles.menuLink}>Mes paramètres</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
              <Text style={styles.menuLink}>Mes commandes</Text>
            </TouchableOpacity>
            {!isLoggedIn ? (
              <>
                <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
                  <Text style={styles.menuLink}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
                  <Text style={styles.menuLink}>S'inscrire</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.menuItem} onPress={logout}>
                <Text style={styles.menuLink}>Déconnexion</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress }>
              <Text style={styles.menuLink}>CGU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
              <Text style={styles.menuLink}>Mentions légales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
              <Text style={styles.menuLink}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleMenuItemPress}>
              <Text style={styles.menuLink}>À Propos d'Àirneis</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  menuNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    zIndex: 1,
  },
  openMenu: {
    display: 'flex',
  },
  menuItem: {
    marginBottom: 10,
  },
  menuLink: {
    fontSize: 16,
  },
};

export default MenuNavigation;
