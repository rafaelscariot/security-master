import requests


class SaveAlertService:
    def save(self, userId, type, occurredRegion):
        try:
            data = {
                'userId': userId, 
                'type': type, 
                'occurredRegion': occurredRegion
            }

            alert_saved = requests.post('http://localhost:3000/activitie', data=data)

            if alert_saved.status_code != 200:
                print('[ERROR] Error to save alert...')
        except Exception as error:
            return error