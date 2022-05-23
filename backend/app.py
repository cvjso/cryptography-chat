from crypt import methods
import threading
from flask import Flask, request
from algoritm import AESCipher, generate_communication_key, RSA_encrypt, get_public_key
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
from flask_cors import CORS, cross_origin
import time

cred = credentials.Certificate("./sdk-key.json")
firebase_admin.initialize_app(cred)
client = firestore.client()

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

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

@app.route("/login/", methods=["POST"])
@cross_origin()
def login():
    data = request.get_json()
    user = client.collection("users").document(data["username"]).get().to_dict()
    if user["password"] == data["password"]:
        # public_key = client.collection("public key").document("key").get().to_dict()["public"]
        communication_key = generate_communication_key(data["session key"])
        encrypted_key = RSA_encrypt(communication_key, get_public_key())
        client.collection("users").document(data["username"]).set({"CK": encrypted_key, "username": data["username"], "password": data["password"]})
        return encrypted_key

@app.route("/logout/", methods=["POST"])
@cross_origin()
def logout():
    data = request.get_json()
    user = client.collection("users").document(data["username"]).get().to_dict()
    if user["CK"] == data["CK"]:
        client.collection("users").document(data["username"]).set({"CK": "", "username": data["username"], "password": data["password"]})
        return "Loged out"

@app.route("/send_message/", methods=["POST"])
@cross_origin()
def send_message():
    now = datetime.now()
    timestamp = datetime.timestamp(now)
    data = request.get_json()
    client.collection("messages").document().set({"text": data["message"], "author": data["username"], "createdAt": timestamp})
    # client.collection("messages").document(timestamp).set({"message": data["message"], "author": data["username"], "createdAt": timestamp})
    return "Message sent"

def clean_store():
    time.sleep(60)
    docs = client.collection("messages").stream()
    for doc in docs:
        print(f'Deleting doc {doc.id} => {doc.to_dict()}')
        doc.reference.delete()
    clean_store()

if __name__ == "__main__":
    t1 = threading.Thread(target=clean_store)
    t1.start()
    app.run()