from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
import pandas as pd
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = 'your_very_secret_key_12345'
 
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), 'data', 'Assignment Data 2025.xlsx - Task 2.csv')
customer_df = None

def load_data():
    global customer_df
    try:
        customer_df = pd.read_csv(DATA_FILE_PATH)
        customer_df['Age'] = pd.to_numeric(customer_df['Age'], errors='coerce').fillna(0).astype(int)
        customer_df['Income'] = pd.to_numeric(customer_df['Income'], errors='coerce').fillna(0)
        print("Data loaded successfully.")
    except Exception as e:
        print(f"Error loading data: {e}")
        customer_df = pd.DataFrame()

load_data()

USERS = {
    "admin": {"password": "admin123", "role": "Admin"},
    "sales": {"password": "sales123", "role": "Sales Representative"}
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = USERS.get(username)
    
    if user and user['password'] == password:
        session['username'] = username
        session['role'] = user['role']
        return jsonify({
            'success': True,
            'role': user['role'],
            'username': username
        })
    return jsonify({
        'success': False,
        'message': 'Invalid username or password'
    }), 401

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    if 'username' in session:
        return jsonify({
            'authenticated': True,
            'role': session['role'],
            'username': session['username']
        })
    return jsonify({
        'authenticated': False
    }), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    session.pop('role', None)
    return jsonify({'success': True})

@app.route('/api/customers', methods=['GET'])
def get_customers():
    print("Fetching customers...")
    if 'username' not in session:
        print("1")
        return jsonify({"error": "Unauthorized"}), 401
    if customer_df is not None:
        print("2")
        return jsonify(customer_df.to_dict(orient='records'))
    print("3")
    return jsonify([])

@app.route('/api/filter-options', methods=['GET'])
def get_filter_options():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    if customer_df is not None:
        divisions = sorted(customer_df['Division'].astype(str).unique().tolist())
        genders = sorted(customer_df['Gender'].astype(str).unique().tolist())
        return jsonify({"divisions": divisions, "genders": genders})
    return jsonify({"divisions": [], "genders": []})

@app.route('/api/customers/<id>', methods=['PUT', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def update_customer(id):
    #print("0")
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.get_json()
    global customer_df
    #print("01")
    if customer_df is not None:
        idx = customer_df.index[customer_df['ID'] == id].tolist()
        if not idx:
            #print("3")
            return jsonify({"error": "Customer not found"}), 404
        idx = idx[0]
        print(idx)
        if 'Age' in data:
            #print("1")
            customer_df.at[idx, 'Age'] = data['Age']
        if 'Income' in data:
            #print("2")
            customer_df.at[idx, 'Income'] = data['Income']
        updated_customer = customer_df.iloc[idx].to_dict()
        print(updated_customer)
        return jsonify(updated_customer)
    return jsonify({"error": "No data"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)