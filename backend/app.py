from crypt import methods
from flask import Flask, request
from algoritm import AESCipher, generateCommunicationKey
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime

cred = credentials.Certificate("./sdk-key.json")
firebase_admin.initialize_app(cred)
client = firestore.client()

app = Flask(__name__)

@app.route("/encrypt", methods=['POST'])
def encrypt_message():
    data = request.get_json()
    encrypt_msg = AESCipher(data["CK"])
    encrypt_msg = encrypt_msg.encrypt(data["message"])
    return encrypt_msg

@app.route("/decrypt", methods=['POST'])
def decrypt_message():
    data = request.get_json()
    decrypt_msg = AESCipher(data["CK"]).decrypt(data["message"])
    return decrypt_msg

@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.get_json()
    client.collection("users").document(data["username"]).set({"CK": '', "username": data["username"], "password": data["password"]})
    return client.collection("users").document(data["username"]).get().to_dict()

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = client.collection("users").document(data["username"]).get().to_dict()
    if user["password"] == data["password"]:
        communicationKey = generateCommunicationKey(data["session key"])
        client.collection("users").document(data["username"]).set({"CK": communicationKey, "username": data["username"], "password": data["password"]})
        return communicationKey

@app.route("/logout", methods=["POST"])
def logout():
    data = request.get_json()
    user = client.collection("users").document(data["username"]).get().to_dict()
    if user["CK"] == data["CK"]:
        client.collection("users").document(data["username"]).set({"CK": "", "username": data["username"], "password": data["password"]})
        return "Loged out"

@app.route("/send_message", methods=["POST"])
def send_message():
    now = datetime.now()
    timestamp = datetime.timestamp(now)
    data = request.get_json()
    client.collection("messages").document(data["username"]).set({"message": data["message"], "author": data["username"], "createdAt": timestamp})
    # client.collection("messages").document(timestamp).set({"message": data["message"], "author": data["username"], "createdAt": timestamp})
    return "Message sent"