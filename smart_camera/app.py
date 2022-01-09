import requests
import subprocess
from datetime import datetime


class SecurityMaster():
    def __init__(self):
        self.BASE_HOST = 'http://localhost:3000'

    def start(self):
        try:
            while True:
                regions = self.regions(f'{self.BASE_HOST}/region')

                if regions == []:
                    print('[INFO] No region to monitor...')
                else:
                    for region in regions:
                        if region['camStatus'] != 'Desativada':
                            region_start_time = ''
                            region_end_time = ''

                            if (len(region['startTime']) >= 1 and len(region['endTime']) > 0):
                                region_start_time = region['startTime'].replace(
                                    ':', '.')
                                region_end_time = region['endTime'].replace(
                                    ':', '.')

                            current_hour = f'{datetime.now().hour}.{datetime.now().minute}'

                            if current_hour >= region_start_time:
                                subprocess.run(["python", "src/services/CameraService.py",
                                                region['userId'], region['name'], region['ipCam'], region_end_time])

        except Exception as error:
            print(error)

    def regions(self, url):
        return requests.get(url).json()


if __name__ == '__main__':
    SecurityMaster().start()
