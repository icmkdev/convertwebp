from flask import Flask, request, send_file
from PIL import Image
import io
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.route("/convert", methods=["POST"])
def convert_to_webp():
    data = request.get_data()
    if not data:
        return {"error": "No image received"}, 400

    img = Image.open(io.BytesIO(data)).convert("RGB")

    output = io.BytesIO()
    img.save(output, format="WEBP")
    output.seek(0)

    return send_file(output, mimetype="image/webp", as_attachment=True, download_name="converted.webp")
