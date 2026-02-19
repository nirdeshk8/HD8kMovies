import json
import os
import requests
from bs4 import BeautifulSoup
from flask import Flask, send_from_directory, request, jsonify, session
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = 'nova_super_secret_key'

# --- 13. DATABASE MANAGEMENT (Cloud Connected) ---
# Nova, maine aapka asli credentials yahan set kar diye hain
MONGO_URI = "mongodb+srv://nirdeshkumarlab_db_user:sats1q9eNGzFkXXZ@cluster0.cixxa03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client.hd8k_platform
    movies_col = db.movies
    ads_col = db.ads
    # Connection test karne ke liye ping
    client.admin.command('ping')
    print("✅ MUBARAK HO: MongoDB Cloud Asliyat Mein Connect Ho Gaya!")
except Exception as e:
    print(f"❌ DB Connection Error: {e}")

# Local files (Backup ke liye)
DB_FILE = 'assets/js/movie-data.js'
AD_FILE = 'assets/js/ad-config.js'

def sync_local_js(filename, var_name, data):
    try:
        js_content = f"// System updated by Super Admin\nconst {var_name} = {json.dumps(data, indent=4)};"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(js_content)
    except: pass

# --- ROUTES ---
@app.route('/')
def home(): return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_files(filename): return send_from_directory('.', filename)

# 🚀 7. CMS: ASLI HDHUB4U SCRAPER (Unlimited Power)
@app.route('/api/scrape', methods=['POST'])
def scrape():
    url = request.json.get('url')
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        title = soup.find('h1').text.strip() if soup.find('h1') else "Unknown Movie"
        poster = ""
        img_tag = soup.find('img', {'class': 'wp-post-image'}) or soup.find('img')
        if img_tag: poster = img_tag.get('src') or img_tag.get('data-src')

        return jsonify({
            "status": "success",
            "title": title,
            "poster": poster,
            "quality": "1080p | 720p",
            "plot": "Fetched from " + url
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

# 🚀 4. MOVIE PUBLISH (Cloud + Local Sync)
@app.route('/api/publish', methods=['POST'])
def publish():
    new_movie = request.json
    try:
        # Cloud mein save karein
        movies_col.update_one({"id": new_movie['id']}, {"$set": new_movie}, upsert=True)
        # Frontend ke liye local file bhi update karein
        all_movies = list(movies_col.find({}, {'_id': 0}))
        movie_dict = {m['id']: m for m in all_movies}
        sync_local_js(DB_FILE, 'movieDB', movie_dict)
        return jsonify({"status": "success"})
    except:
        return jsonify({"status": "error"}), 500

# 🚀 6 & 9. ADS CONTROL HUB
@app.route('/api/save-ads', methods=['POST'])
def save_ads():
    ad_data = request.json
    try:
        ads_col.update_one({"type": "config"}, {"$set": ad_data}, upsert=True)
        sync_local_js(AD_FILE, 'adConfig', ad_data)
        return jsonify({"status": "success", "message": "Ads updated live!"})
    except:
        return jsonify({"status": "error"}), 500

if __name__ == '__main__':
    print("🚀 NOVA POWER ENGINE: HD8kMovies is ready for PUBLIC LIVE!")
    app.run(host='0.0.0.0', port=8082, debug=True)