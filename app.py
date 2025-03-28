from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import json
from tensorflow.keras.utils import load_img, img_to_array
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = tf.keras.models.load_model("Model_Mobilenet.h5")

# Load class names
class_names = [
    'Aloevera', 'Amla', 'Amruta_Balli', 'Arali', 'Ashoka', 'Ashwagandha', 
    'Avacado', 'Bamboo', 'Basale', 'Betel', 'Betel_Nut', 'Brahmi', 'Castor', 
    'Curry_Leaf', 'Doddapatre', 'Ekka', 'Ganike', 'Gauva', 'Geranium', 'Henna', 
    'Hibiscus', 'Honge', 'Insulin', 'Jasmine', 'Lemon', 'Lemon_grass', 'Mango', 
    'Mint', 'Nagadali', 'Neem', 'Nithyapushpa', 'Nooni', 'Pappaya', 'Pepper', 
    'Pomegranate', 'Raktachandini', 'Rose', 'Sapota', 'Tulasi', 'Wood_sorel'
]

# Load plant details including locations
with open("plant_details.json", "r") as file:
    plant_details = json.load(file)

def predict_plant(img_path, model, class_names):
    """ Predict the top 3 classes with confidence scores and locations. """
    img = load_img(img_path, target_size=(224, 224))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)[0]  # Extract predictions array

    # Get top 3 predictions
    top_indices = np.argsort(predictions)[::-1][:3]
    top_predictions = [
        {
            "plant_name": class_names[i],
            "confidence": float(predictions[i]),
            **plant_details.get(class_names[i], {
                "scientific_name": "Unknown",
                "medicinal_uses": [],
                "benefits": [],
                "precautions": [],
                "locations": []  # Default empty list if no locations found
            })
        }
        for i in top_indices
    ]

    return top_predictions

@app.route('/predict', methods=['POST'])
def predict():
    """ Handles plant image prediction request """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    file_path = "uploaded_image.jpg"
    file.save(file_path)

    top_predictions = predict_plant(file_path, model, class_names)

    return jsonify({"predictions": top_predictions})

if __name__ == '__main__':
    app.run(debug=True)
