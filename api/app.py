from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Database 
from werkzeug.security import check_password_hash
from werkzeug.security import check_password_hash, generate_password_hash
import os
import jwt
from datetime import datetime, timedelta, timezone

app = Flask(__name__)
CORS(app, supports_credentials=True)

db = Database("BFLOW.db")

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'secret_key')

def generate_token(user_id):
    expiration_time = timedelta(hours=1)
    payload = {
        'user_id': user_id,
        'exp': datetime.now(timezone.utc) + expiration_time 
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = db.get_user_by_email(email)

    if not user or not check_password_hash(user[2], password): 
        return jsonify({"error": "Invalid username or password"}), 401
    
    token = generate_token(user[0])
    
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user_id": user[0],  
        "user_name": user[1], 
    })


@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    user = db.get_user(user_id) 
    if not user:
        return jsonify({"error": "User not found"}), 404
 #INDEXING MAY NOT BE CORRECT
    user_data = {
        "id": user[0],  
        "username": user[1], 
        "password": user[2],  
        "email": user[3],  
        "name": user[4],  
        "picture": user[5],  
        "birthYear": user[6],  
        "country": user[7], 
        "shirtNumber": user[16],  
        "team": user[15],  
        "coach": user[12],  
        "coachEmail": user[13], 
        "parent": user[9],  
        "parentEmail": user[10]
    }

    return jsonify(user_data)

@app.route('/api/training/<int:user_id>', methods=['GET'])
def get_user_training_data(user_id):
   
    training_data = db.get_categories_and_exercises_with_ratings(user_id)

    if not training_data:
        return jsonify({"error": "No training data found for this user"}), 404

    return jsonify(training_data)

@app.route('/api/training/<int:user_id>', methods=['PUT'])
def update_training_data(user_id):
    data = request.json
    try:
        db.update_exercise(data)
        return jsonify({"message": "Training data updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


#Todo This needs to store password as a hash
@app.route('/api/register', methods=['POST'])
def add_user():
    data = request.json
    try:
        app.logger.debug(f"Received data: {data}")
        hashed_password = generate_password_hash(data["password"])
        
        user_id = db.add_user(
            username=data["username"], 
            password=hashed_password,
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
    
@app.route('/api/verify-session', methods=['GET'])
def verify_session():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"error": "Token is missing"}), 401

    try:
        token = token.split(" ")[1]
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        user_id = payload['user_id']

   
        user = db.get_user(user_id)
        if user:
            return jsonify({"valid": True, "userId": user_id}), 200
        else:
            return jsonify({"valid": False}), 401

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401




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

