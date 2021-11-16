from datetime import *
from time import strftime
from os.path import exists
import csv
import speedtest
import math
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

def writeToDatabase(row_data):
    cxn = connectToMYSQL()
    sql = "INSERT INTO ping_results VALUES('{}', '{}', '{}', '{}', '{}');".format(row_data[0], row_data[1], row_data[2], row_data[3], row_data[4])
    cursor = cxn.cursor()
    cursor.execute(sql)
    cxn.commit()
    print(sql)
    cxn.close()

def collectData(st):
    download = st.download()
    upload = st.upload()
    servernames = []
    st.get_servers(servernames)
    ping_results = st.results.ping
    row_data = formatData(download, upload, ping_results)
    writeToDatabase(row_data)

# Code from https://stackoverflow.com/questions/5194057/better-way-to-convert-file-sizes-in-python
def convert_size(size_bytes):
    if size_bytes == 'N/A':
        return 'N/A'
    if size_bytes == 0:
        return "0B"
    size_name = ("B/PS", "KB/PS", "MB/PS", "GB/PS", "TB/PS", "PB/PS", "EB/PS", "ZB/PS", "YB/PS")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s" % (s)

def formatData(download, upload, ping):
    date_time = (str(datetime.today().replace(microsecond=0)))
    date_time_split = date_time.split()
    date = date_time_split[0]
    time = date_time_split[1]
    row_data = [date, time, convert_size(download), convert_size(upload), ping]
    return row_data

def main():
    try:
        st = speedtest.Speedtest()
        collectData(st)
    except:
        bad_row = formatData(-1,-1,-1)
        writeToDatabase(bad_row)

if __name__ == '__main__':
    # execute only if run as the entry point into the program
    main()
