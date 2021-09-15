import requests
import subprocess
import time
from datetime import datetime
from config import BASE_URL


class SecurityMaster():
    def start(self):
        try:
            while True:
                regions = self.regions(f'{BASE_URL}/region')

                if regions == []:
                    print('[INFO] Nothing to monitor...')
                else:
                    for region in regions:
                        region_start_time = region['startTime'].replace(':', '.')
                        region_end_time = region['endTime'].replace(':', '.')

                        current_hour = f'{datetime.now().hour}.{datetime.now().minute}'

                        if current_hour >= region_start_time:
                            subprocess.run(["python.exe", "src/services/CameraService.py", region['userId'], region['name'], region['ipCam'], region_end_time])

                time.sleep(1)
        except Exception as error:
            print(error)

    def regions(self, url):
        return requests.get(url).json()


SecurityMaster().start()
