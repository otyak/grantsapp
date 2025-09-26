import csv
import sqlite3
import datetime

DB_FILE = "grants.db"
CSV_FILE = "grants.csv"
TABLE = "grants"

def parse_date(value):
    if not value:
        return None
    for fmt in ("%Y-%m-%d", "%Y-%m-%d %H:%M:%S", "%d/%m/%Y", "%Y/%m/%d"):
        try:
            return datetime.datetime.strptime(value.strip(), fmt).date()
        except ValueError:
            continue
    return None

def clean_float(val):
    try:
        return float(str(val).replace(",", "").strip())
    except:
        return None

def run_import():
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()

    cur.execute(f"""
        CREATE TABLE IF NOT EXISTS {TABLE} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            status TEXT,
            opening_date TEXT,
            closing_date TEXT,
            industry TEXT,
            eligibility_criteria TEXT,
            funding_amount REAL,
            business_contribution_percentage REAL,
            location TEXT,
            keywords TEXT,
            is_active BOOLEAN DEFAULT 1
        )
    """)

    with open(CSV_FILE, newline='', encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        reader.fieldnames = [h.strip().lower() for h in reader.fieldnames]

        rows = []
        for r in reader:
            rows.append((
                r.get("title", "").strip(),
                r.get("description", "").strip(),
                r.get("status", "").strip(),
                parse_date(r.get("opening date", "")),
                parse_date(r.get("closing date", "")),
                r.get("industry", "").strip(),
                r.get("eligibility", "").strip(),
                clean_float(r.get("funding_amount", "")),
                clean_float(r.get("business_contribution_pct", "")),
                r.get("location", "").strip(),
                r.get("keywords", "").strip(),
                1  # is_active
            ))

    insert_sql = f"""
        INSERT INTO {TABLE} (
            title, description, status, opening_date, closing_date,
            industry, eligibility_criteria, funding_amount,
            business_contribution_percentage, location, keywords, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    cur.executemany(insert_sql, rows)
    conn.commit()
    conn.close()
    print(f"✅ Imported {len(rows)} rows into '{TABLE}'.")

if __name__ == "__main__":
    run_import()
