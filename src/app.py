from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename  # This is the line you're missing
import pytesseract
from PIL import Image
import requests

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if file:
        filename = secure_filename(file.filename)  # Ensures the filename is safe to use
        img = Image.open(file.stream)
        extracted_text = pytesseract.image_to_string(img)
        print("extracted_text: ")
        print(extracted_text)

        # Assuming you send the extracted text to another service and expect an image URL in return
        response = requests.post('http://example.com/api', json={'text': extracted_text})
        if response.status_code == 200:
            imageUrl = response.json().get('imageUrl')
            return jsonify({'imageUrl': imageUrl})
        else:
            return jsonify({'error': 'Failed to process the image'})

if __name__ == '__main__':
    app.run(debug=True)
