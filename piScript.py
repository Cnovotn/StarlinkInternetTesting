from datetime import *
from os.path import exists
import csv
import speedtest

def collectData(st):
    download = st.download()
    upload = st.upload()
    servernames = []
    st.get_servers(servernames)
    ping_results = st.results.ping
    row_data = formatData(download, upload, ping_results)
    writeData(row_data)

def createCSV(date):
    headers = ['date', 'time', 'download', 'upload', 'ping']
    filename = 'data/internet_speed_data_'+date+'.csv'
    with open(filename, 'w') as csvfile: 
        csvwriter = csv.writer(csvfile) 
        csvwriter.writerow(headers) 

def writeData(row_data):
    filename = 'data/internet_speed_data_'+row_data[0]+'.csv'
    file_exists = exists(filename)
    if(file_exists):
        with open(filename, 'a') as csvfile: 
            csvwriter = csv.writer(csvfile) 
            csvwriter.writerow(row_data)
    else: 
        createCSV(row_data[0])
        writeData(row_data)

def formatData(download, upload, ping):
    date_time = (str(datetime.today()))
    date_time_split = date_time.split()
    date = date_time_split[0]
    time = date_time_split[1]
    row_data = [date, time, download, upload, ping]
    return row_data

def main():
    try:
        st = speedtest.Speedtest()
        collectData(st)
    except:
        bad_row = formatData('N/A','N/A','N/A')
        writeData(bad_row)

main()
# if __name__ == '__main__':
#     # execute only if run as the entry point into the program
#     main()
