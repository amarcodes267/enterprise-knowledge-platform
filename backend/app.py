from flask import Flask, render_template
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

import os
import sys
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from backend.routes.health import health_bp
from backend.routes.upload import upload_bp
from backend.routes.search import search_bp
from backend.routes.chat import chat_bp
from backend.routes.auth import auth_bp


app = Flask(
    __name__,
    static_folder="static",
    static_url_path="",
    template_folder="templates",
)

CORS(app)


app.register_blueprint(health_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(search_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return render_template("index.html")


# React SPA: serve index.html for any non-API path so refresh works.
@app.route("/<path:path>")
def catch_all(path):
    # Let API/asset requests pass through.
    api_prefixes = ("/health", "/upload", "/search", "/chat", "/auth")
    candidate = f"/{path}"
    if candidate.startswith(api_prefixes):
        return {"error": "Not Found"}, 404

    # Serve React app for everything else (client-side routing)
    return render_template("index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False,
    )

