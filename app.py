from flask import Flask, request, send_file
from PIL import Image
import io

app = Flask(__name__)

@app.route("/convert", methods=["POST"])
def convert_to_webp():
    if 'image' not in request.files:
        return {"error": "No image uploaded"}, 400

    file = request.files['image']
    img = Image.open(file.stream).convert("RGB")

    output = io.BytesIO()
    img.save(output, format="WEBP")
    output.seek(0)

    return send_file(output, mimetype="image/webp", as_attachment=True, download_name="converted.webp")

@app.route("/")
def home():
    return "WebP Converter API is running."
