import sqlite3

con = sqlite3.connect("userinfo.db")

cur = con.cursor()

def check_user(userid):
    id = (userid,)
    row = cur.execute("Select * from user where userid = ?", id)
    row = row.fetchone()
    if row == None:
        return False
    else:
        return row

def getUserName(userid):
    id = (userid,)
    row = cur.execute("Select name from user where userid = ?", id)
    row = row.fetchone()
    if row == None:
        return False
    else:
        return row[0]
    
def updateData(userid, index_name, type):
    queryData= (index_name,userid,)
    cur.execute(f"update data set {type}=? where userid=?",queryData)
    con.commit()

def getIndexName(userid,column):
    cmd = f"Select {column} from data where userid='{userid}'"
    row = cur.execute(cmd)
    row = row.fetchone()
    return row[0]

def addColumnToData(name):
    cur.execute(f"alter table data add {name} varchr(250)")
    con.commit()

row = cur.execute("select dataset from data")
row = row.fetchone()
print(row[0])