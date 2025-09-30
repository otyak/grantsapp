from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_FILE = "grants.db"


# create migration.txt add true to the line below
# check if created
migrated = 'migration.txt'

# check if file exists and contains 'true'
import subprocess
try:
    with open(migrated, 'r') as f:
        if 'true' in f.read():
            print("Database already migrated.")
        else:
            raise FileNotFoundError
except FileNotFoundError:
    print("Migrating database...")
    # Run import_csv.py to populate the database
    subprocess.run(['python', 'import_csv.py'])
    # Mark migration as done
    with open(migrated, 'w') as f:
        f.write('true')


@app.route('/api/grants')
def get_grants():
    query = request.args.get('query', '').lower()
    industry = request.args.get('industry')
    location = request.args.get('location')
    status = request.args.get('status')
    min_funding = request.args.get('min_funding', type=float)
    max_funding = request.args.get('max_funding', type=float)

    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    sql = "SELECT * FROM grants WHERE 1=1"
    params = []

    if query:
        sql += " AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(keywords) LIKE ?)"
        wildcard = f"%{query}%"
        params += [wildcard, wildcard, wildcard]

    if industry:
        sql += " AND industry = ?"
        params.append(industry)
    
    if location:
        sql += " AND location = ?"
        params.append(location)

    if status:
        sql += " AND status = ?"
        params.append(status)

    if min_funding is not None:
        sql += " AND funding_amount >= ?"
        params.append(min_funding)

    if max_funding is not None:
        sql += " AND funding_amount <= ?"
        params.append(max_funding)

    cur.execute(sql, params)
    rows = cur.fetchall()
    conn.close()

    grants = []
    for row in rows:
        grants.append({
            "id": row["id"],
            "title": row["title"],
            "description": row["description"],
            "status": row["status"],
            "industry": row["industry"],
            "location": row["location"],
            "funding_amount": row["funding_amount"],
            "business_contribution_percentage": row["business_contribution_percentage"],
            "opening_date": row["opening_date"],
            "closing_date": row["closing_date"],
            "keywords": row["keywords"].split(",") if row["keywords"] else []  # convert to array
        })

    return jsonify(grants)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM grants")
    total_grants = cur.fetchone()[0]

    cur.execute("SELECT SUM(funding_amount) FROM grants")
    total_funding = cur.fetchone()[0] or 0

    cur.execute("SELECT industry, COUNT(*) FROM grants GROUP BY industry")
    by_industry = [{"industry": r[0], "count": r[1]} for r in cur.fetchall()]

    cur.execute("SELECT status, COUNT(*) FROM grants GROUP BY status")
    by_status = [{"status": r[0], "count": r[1]} for r in cur.fetchall()]

    conn.close()
    return jsonify({
        "total_grants": total_grants,
        "total_funding": total_funding,
        "by_industry": by_industry,
        "by_status": by_status
    })

import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
