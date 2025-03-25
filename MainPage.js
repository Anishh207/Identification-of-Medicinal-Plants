import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import styles from "./MainPage.module.css";

function MainPage() {
  return (
    <div className={styles.mainContainer}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Medicinal Plant Identifier 🌿
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Discover the power of nature with AI-based plant identification.
        </motion.p>
        <motion.button
          className="btn btn-success btn-lg"
          onClick={() => (window.location.href = "/predict")}
          whileHover={{ scale: 1.1 }}
        >
          🌱 Identify a Plant
        </motion.button>
      </div>

      {/* About Section */}
      <div className={`container ${styles.contentSection}`}>
        <motion.div
          className="card shadow-lg p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-secondary">🌿 About the Project</h2>
          <p>
            Our AI-powered tool helps you identify medicinal plants with just an image. 
            Learn about their **scientific names, benefits, medicinal uses, and precautions.**
          </p>
          <p>
            🌱 Built using **Machine Learning (MobileNet), Flask API, and React**, 
            this project aims to promote awareness about nature's healing power.
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className={`container ${styles.contentSection}`}>
        <motion.div
          className="card shadow-lg p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-primary">✨ Features</h2>
          <ul className="list-group">
            <li className="list-group-item">🔍 Identify plants using AI</li>
            <li className="list-group-item">📚 Get detailed information</li>
            <li className="list-group-item">⚕️ Learn about medicinal uses</li>
            <li className="list-group-item">🚀 User-friendly interface</li>
          </ul>
        </motion.div>
      </div>

      {/* Contact Section */}
      <div className={`container ${styles.contentSection}`}>
        <motion.div
          className="card shadow-lg p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-secondary">📩 Contact Us</h2>
          <p>Email: <strong>support@plantidentifier.com</strong></p>
          <p>Follow us on social media for updates!</p>
        </motion.div>
      </div>
      {/* How It Works Section */}
<div className={`container ${styles.contentSection}`}>
  <motion.div
    className="card shadow-lg p-4"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-primary">🛠 How It Works</h2>
    <div className="row">
      <div className="col-md-4">
        <h4>📷 Step 1: Upload Image</h4>
        <p>Select an image of the plant you want to identify.</p>
      </div>
      <div className="col-md-4">
        <h4>🧠 Step 2: AI Analysis</h4>
        <p>Our AI model analyzes the image to identify the plant.</p>
      </div>
      <div className="col-md-4">
        <h4>📋 Step 3: Get Information</h4>
        <p>See details about its benefits, medicinal uses, and precautions.</p>
      </div>
    </div>
  </motion.div>
</div>

    </div>
  );
}

export default MainPage;
