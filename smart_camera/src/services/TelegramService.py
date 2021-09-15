import requests
import subprocess
import os
from smart_camera.config import BASE_URL


class TelegramService:
    def __init__(self):
        self.token = '1448597689:AAGmz64iJBaYACm-M8xXT7rFOff4YNFEcbk'

    def send_notification(self, message, userId):
        try:
            devices = self.devices.get(f'{BASE_URL}/user/{userId}')

            if devices == []:
                print('[INFO] No device to notify...')
            else:
                for device in devices:
                    image_path = '../static/temp_img.jpg'

                    text = f'https://api.telegram.org/bot{self.token}/sendMessage?chat_id={device["chatId"]}&parse_mode=Markdown&text={message}'

                    img_request = 'curl -s -X POST https://api.telegram.org/bot' + self.token + '/sendPhoto -F chat_id=' + device["chatId"] + " -F photo=@" + image_path

                    requests.get(text)
                    subprocess.call(img_request.split(' '))

                os.remove('../static/temp_img.jpg')
        except Exception as error:
            return error

    def devices(self, url):
        return requests.get(url).json()
