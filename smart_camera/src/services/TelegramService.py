from SaveAlertService import SaveAlertService
import requests
import subprocess
import os


class TelegramService:
    def __init__(self):
        self.token = '2014381749:AAFClGB14a76ImwRikaVQ8WrjUUgMLa4CnA'

    def send_notification(self, status_detection, userId):
        try:
            devices = self.devices(f'http://localhost:3000/device/surveillance/{userId}')

            if devices == []:
                print('[INFO] No device to notify...')
            else:
                for device in devices:
                    image_path = 'src/services/temp_img.jpg'

                    message = f'Alerta: {status_detection["type"]} identificado na região {status_detection["region"]}'

                    text = f'https://api.telegram.org/bot{self.token}/sendMessage?chat_id={device["chatId"]}&parse_mode=Markdown&text={message}'

                    img_request = 'curl -s -X POST https://api.telegram.org/bot' + self.token + '/sendPhoto -F chat_id=' + device["chatId"] + " -F photo=@" + image_path

                    requests.get(text)
                    subprocess.call(img_request.split(' '))

                os.remove('src/services/temp_img.jpg')

                SaveAlertService().save(userId, status_detection['type'], status_detection['region'])
        except Exception as error:
            return error

    def devices(self, url):
        return requests.get(url).json()
