import requests


class SaveAlertService:
    def __init__(self):
        self.BASE_HOST = 'http://express:3000'

    def save(self, userId, type, occurredRegion):
        try:
            data = {
                'userId': userId,
                'type': type,
                'occurredRegion': occurredRegion
            }

            alert_saved = requests.post(
                f'{self.BASE_HOST}/activitie', data=data)

            if alert_saved.status_code != 200:
                print('[ERROR] Error to save alert...')
        except Exception as error:
            return error
