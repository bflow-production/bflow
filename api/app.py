from flask import Flask, jsonify, request
from flask_cors import CORS
from database import Database 
from werkzeug.security import check_password_hash
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
CORS(app)

db = Database("BFLOW.db")

@app.route('/api/login', methods=['POST'])
def login():

    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = db.get_user_by_email(email)

    if not user or user[2] != password:  
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful", "user_id": user[0]})

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    user = db.get_user(user_id) 
    if not user:
        return jsonify({"error": "User not found"}), 404
 
    user_data = {
        "id": user[0],  
        "name": user[4], 
        "profile": {
            "age": 2025 - user[6], 
            "location": user[7],  
        },
        "stats": { 
            "workouts": 0,
            "total_time": "0h",
        },
        "training": []  
    }
    return jsonify(user_data)


@app.route('/api/register', methods=['POST'])
def add_user():
    data = request.json
    try:
        app.logger.debug(f"Received data: {data}")
        
        user_id = db.add_user(
            username=data["username"], 
            password=data["password"],
            email=data["email"],
            name=data["name"],
            birthYear=data["birthYear"],
            country=data["country"],
            number=data.get("pelinumero", 0),  
            team_id=data.get("joukkue_id", None)  
        )
    
        app.logger.debug(f"User added with ID: {user_id}")
        return jsonify({"message": "User added successfully", "user_id": user_id}), 201
    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 400




@app.route('/api/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):

    data = request.json
    try:
        db.update_user(user_id, **data)
        return jsonify({"message": "User updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        db.delete_user(user_id)
        return jsonify({"message": "User deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

