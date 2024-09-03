from flask import Flask
from routes.item_routes import item_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@db:5432/authdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from models import db
db.init_app(app)

# Register blueprints
app.register_blueprint(item_bp, url_prefix='/items')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8082)
