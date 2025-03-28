import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import styles from "./App.module.css";
import PlantMap from "./PlantMap"; // ✅ Import PlantMap

function App() {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPredictions(response.data.predictions);
    } catch (error) {
      console.error("Error in prediction:", error);
    }
  };

  return (
    <div className={`container text-center ${styles.appContainer}`}>
      <motion.div className={styles.heroSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className={styles.title}>Medicinal Plant Identifier 🌿</h1>
        <p className={styles.subtitle}>Identify plants and discover their medicinal benefits</p>
      </motion.div>

      <motion.div className={`card shadow-lg p-4 ${styles.card}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <input type="file" onChange={handleFileChange} className="form-control mb-3" />

        {imagePreview && (
          <motion.img src={imagePreview} alt="Uploaded" className="mt-3 img-fluid rounded shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
        )}

        <button onClick={handleSubmit} className="btn btn-success w-100 mt-3">
          Predict
        </button>
      </motion.div>

      {predictions && predictions.length > 0 && (
        <motion.div className="mt-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="card shadow-lg p-4 mb-3">
            <h2 className="text-success">{predictions[0].plant_name}</h2>
            <p className="text-muted"><i>{predictions[0].scientific_name}</i></p>
            <h4 className="text-warning">
              Confidence: {(predictions[0].confidence * 100).toFixed(2)}%
            </h4>

            <div className="row mt-4">
              <div className="col-md-4">
                <h5 className="text-primary">Medicinal Uses:</h5>
                <ul className="list-group">
                  {predictions[0].medicinal_uses.map((use, i) => (
                    <li key={i} className="list-group-item">{use}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4">
                <h5 className="text-success">Benefits:</h5>
                <ul className="list-group">
                  {predictions[0].benefits.map((benefit, i) => (
                    <li key={i} className="list-group-item">{benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-4">
                <h5 className="text-danger">Precautions:</h5>
                <ul className="list-group">
                  {predictions[0].precautions.map((precaution, i) => (
                    <li key={i} className="list-group-item text-danger">{precaution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {predictions[0].locations && predictions[0].locations.length > 0 && (
            <motion.div className="card shadow-lg p-4 mb-3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <h4 className="text-primary">Commonly Found in These States 🌍</h4>
              
              {/* ✅ Replace MapContainer with PlantMap component */}
              <PlantMap locations={predictions[0].locations} />  

              <p className="mt-3 text-secondary">
                This plant is commonly found in: <b>{predictions[0].locations.map(loc => loc.state).join(", ")}</b>.
              </p>
            </motion.div>
          )}

          {predictions.length > 1 && (
            <div className="card shadow-lg p-3">
              <h4 className="text-secondary">Alternative Predictions:</h4>
              <ul className="list-group">
                {predictions.slice(1).map((alt, index) => (
                  <li key={index} className="list-group-item">
                    🌱 <b>{alt.plant_name}</b> - <span className="text-warning">{(alt.confidence * 100).toFixed(2)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      <motion.button className="btn btn-outline-primary mt-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => (window.location.href = "/")}>
        Back to Home
      </motion.button>
    </div>
  );
}

export default App;
