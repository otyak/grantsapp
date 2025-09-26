import sqlite3

conn = sqlite3.connect("grants.db")
cur = conn.cursor()

for row in cur.execute("SELECT * FROM grants LIMIT 5"):
    print(row)

conn.close()
