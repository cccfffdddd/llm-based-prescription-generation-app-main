from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import pytesseract
from PIL import Image
import requests

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

@app.route('/')
def serve():

    return send_from_directory(app.static_folder, 'index.html')

@app.route('/upload', methods=['POST'])
def upload_file():

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    img = Image.open(file.stream)
    extracted_text = pytesseract.image_to_string(img)
    print("extracted_text:", extracted_text)

    data = {'text': extracted_text}
    access_token = '...'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }


    response = requests.post('https://us-central1-qwiklabs-gcp-03-8701613c77bc.cloudfunctions.net/function-1', headers=headers, json=data)
    print("response:", response)
    if response.status_code != 200:
        print("Status Code:", response.status_code)
        print("Response Text:", response.text)

    if response.status_code == 200:
        response_data = response.json()
        predictions = response_data.get('predictions', [])
        if predictions:
            return jsonify(predictions[0]), 200
        return jsonify({'message': 'No predictions found'}), 404
    else:
        return jsonify({'error': 'Failed to process the image', 'status_code': response.status_code}), response.status_code

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
