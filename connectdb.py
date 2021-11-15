import mysql.connector
from mysql.connector import errorcode

def connectToMYSQL():
  try:
    config = {
      'user': 'user',
      'password': 'raspberry',
      'host': '10.0.0.150',
      'port': 8457,
      'database': 'internet_testing',
      'raise_on_warnings': True
    }
    cnx = mysql.connector.connect(**config)
    return cnx
  except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
      print("Something is wrong with your user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
      print("Database does not exist")
    else:
      print(err)
  else:
    cnx.close()

def tryQuery():
  cxn = connectToMYSQL()
  cursor = cxn.cursor()
  sql = "SELECT * FROM ping_results;"
  cursor.execute(sql)
  for(date, time, download, upload, ping) in cursor:
    print("{}, {}, {}, {}, {}".format(date, time, download, upload, ping))

tryQuery()