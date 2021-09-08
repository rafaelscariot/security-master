import requests
import subprocess
import os
import sqlite3
import datetime

class TelegramService:
    def __init__(self):
        self.token = '1448597689:AAGmz64iJBaYACm-M8xXT7rFOff4YNFEcbk'

    def send(self, message, chatId, userId):
        image_path = 'static/temp_img.jpg'

        text = 'https://api.telegram.org/bot' + self.token + '/sendMessage?chat_id=' + chatId + '&parse_mode=Markdown&text=' + message
        img_request = 'curl -s -X POST https://api.telegram.org/bot' + self.token + '/sendPhoto -F chat_id=' + chatId + " -F photo=@" + image_path
        requests.get(text)
        subprocess.call(img_request.split(' '))

        os.remove('static/temp_img.jpg')

        self.save_alert(userId)

    def save_alert(self, userId):
        conn = sqlite3.connect('../application/data.db')
        c = conn.cursor()

        now = datetime.datetime.now()
        hour = str(now.hour) + ':' + str(now.minute)
        date = str(now.day) + '/' + str(now.month) + ('/') + str(now.year)
        c.execute("insert into alerts_history (userID, date, hour) VALUES (?,?,?)", (userId, date, hour))
        conn.commit()
        conn.close()