from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy user data
users = {
    1: {
        "name": "Marko Moilanen",
        "profile": {"age": 30, "location": "Oulu"},
        "stats": {"workouts": 10, "total_time": "5h"},
        "training": [
            {"date": "2024-10-27", "workout": "Running 5km"},
            {"date": "2024-10-28", "workout": "Weight training"}
        ],
    },
    2: {
        "name": "Pellervo Pallervo",
        "profile": {"age": 25, "location": "Oulu"},
        "stats": {"workouts": 5, "total_time": "2.5h"},
        "training": [{"date": "2024-10-26", "workout": "Weight Lifting"}],
    },
}

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user_data(user_id):
    if user_id in users:
        return jsonify(users[user_id])
    return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
