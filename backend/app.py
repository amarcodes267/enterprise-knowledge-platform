from flask import Flask
from flask_cors import CORS

from routes.health import health_bp
from routes.upload import upload_bp
from routes.search import search_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(health_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(search_bp)

@app.route("/")
def home():
    return "Enterprise Knowledge Intelligence Platform Running"

if __name__ == "__main__":
    app.run(debug=True)