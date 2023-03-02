import React, { useState } from 'react';
import styles from './BurgerMenu.module.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.burgerMenu}>
      <div className={styles.burgerLogo} onClick={toggleMenu}>
        {/* Insérer ici votre logo avec une taille de 1000px de hauteur et 300px de largeur */}
      </div>
      <div className={`${styles.burgerLinks} ${isOpen ? styles.open : ''}`}>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </div>
  );
};

export default BurgerMenu;
