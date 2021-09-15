import requests
import subprocess
import os


class TelegramService:
    def __init__(self):
        self.token = '1448597689:AAGmz64iJBaYACm-M8xXT7rFOff4YNFEcbk'

    def send(self, message, chatId, userId):
        try:
            image_path = 'static/temp_img.jpg'

            text = f'https://api.telegram.org/bot{self.token}/sendMessage?chat_id={chatId}&parse_mode=Markdown&text={message}'
            img_request = 'curl -s -X POST https://api.telegram.org/bot' + self.token + '/sendPhoto -F chat_id=' + chatId + " -F photo=@" + image_path

            requests.get(text)
            subprocess.call(img_request.split(' '))

            os.remove('static/temp_img.jpg')

            AlertService().register()

        except Exception as error:
            return error
