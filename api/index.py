import json
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# --- Cloud DB Connection ---
MONGO_URI = "mongodb+srv://nirdeshkumarlab_db_user:sats1q9eNGzFkXXZ@cluster0.cixxa03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client.hd8k_platform
    movies_col = db.movies
    ads_col = db.ads
    client.admin.command('ping')
except Exception as e:
    print(f"DB Error: {e}")

@app.route('/api/scrape', methods=['POST'])
def scrape():
    url = request.json.get('url')
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        res = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(res.content, 'html.parser')
        title = soup.find('h1').text.strip() if soup.find('h1') else "Unknown"
        img = soup.find('img', {'class': 'wp-post-image'})
        poster = img.get('src') if img else ""
        return jsonify({"status": "success", "title": title, "poster": poster})
    except:
        return jsonify({"status": "error"}), 500

@app.route('/api/publish', methods=['POST'])
def publish():
    try:
        movie_data = request.json
        movies_col.update_one({"id": movie_data['id']}, {"$set": movie_data}, upsert=True)
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500