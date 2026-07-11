from flask import Flask
from flask_cors import CORS

# Allow running app.py both as `python app.py` and as a module.
# When running as `python app.py` the package name `backend` isn't importable.
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


app = Flask(__name__)


CORS(app)

app.register_blueprint(health_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(search_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return "Enterprise Knowledge Intelligence Platform Running"

if __name__ == "__main__":
    app.run(debug=True)