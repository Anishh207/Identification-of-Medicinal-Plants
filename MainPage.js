import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/MainPage.module.css"; // Custom CSS

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.heroContainer}>
      <div className={styles.overlay}></div>

      {/* Hero Section */}
      <motion.div
        className={styles.heroContent}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className={styles.heroTitle}>Explore the Healing World of Medicinal Plants 🌿</h1>
        <p className={styles.heroSubtitle}>
          Learn how to use these natural treasures for your well-being.
        </p>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for a plant..." className={styles.searchInput} />
          <button className={styles.searchButton}>Search</button>
        </div>

        {/* Navigation Buttons */}
        <div className={styles.buttonGroup}>
          <motion.button
            className="btn btn-primary btn-lg m-2"
            onClick={() => navigate("/predict")}
            whileHover={{ scale: 1.1 }}
          >
            🌱 Identify Plant
          </motion.button>
          <motion.button
            className="btn btn-secondary btn-lg m-2"
            onClick={() => navigate("/about")}
            whileHover={{ scale: 1.1 }}
          >
            ℹ️ About Us
          </motion.button>
          <motion.button
            className="btn btn-success btn-lg m-2"
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.1 }}
          >
            📞 Contact Us
          </motion.button>
        </div>

        {/* Plant Cards Section */}
        <div className={styles.plantGrid}>
  <div className={styles.plantCard}>
    <img src="/assets/Rosemary.jpg" alt="Rosemary" className={styles.plantImage} />
    <h3>Rosemary</h3>
    <p>Boosts memory & reduces stress.</p>
  </div>
  <div className={styles.plantCard}>
    <img src="/assets/Pepermint.jpg" alt="Peppermint" className={styles.plantImage} />
    <h3>Peppermint</h3>
    <p>Soothes digestion & relieves headaches.</p>
  </div>
  <div className={styles.plantCard}>
    <img src="/assets/EveningPrimrose.jpg" alt="Evening Primrose" className={styles.plantImage} />
    <h3>Evening Primrose</h3>
    <p>Supports skin health & hormonal balance.</p>
  </div>
  <div className={styles.plantCard}>
    <img src="/assets/Ginkgo.webp" alt="Ginkgo" className={styles.plantImage} />
    <h3>Ginkgo</h3>
    <p>Improves focus & circulation.</p>
  </div>
</div>

      </motion.div>
    </div>
  );
}

export default MainPage;
