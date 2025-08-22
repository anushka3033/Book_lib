import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.contactPage}>
      <header className={styles.navBar}>
        <button className={styles.navButton} onClick={() => navigate('/')}>Home</button>
        <button className={styles.navButton} onClick={() => navigate('/about')}>About</button>
        <button className={styles.navButton} onClick={() => navigate('/contact')}>Contact</button>
      </header>

      <div className={styles.contactContent}>
        <div className={styles.contactImage}>
          <img src="/contact.png" alt="Contact Illustration" />
        </div>
        <div className={styles.contactDetails}>
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> example@email.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
          <p><strong>Instagram:</strong> @pollycare_insta</p>
          <p><strong>Facebook:</strong> /pollycare.fb</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
