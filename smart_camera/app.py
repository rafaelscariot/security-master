import requests
import subprocess
from datetime import datetime


class SecurityMaster():
    def start(self):
        try:
            while True:
                regions = self.regions('http://localhost:3000/region')

                if regions == []:
                    print('[INFO] Nothing to monitor...')
                else:
                    for region in regions:
                        print(f'[INFO] Starting to monitor region {region["name"]}')

                        region_start_time = region['startTime'].replace(':', '.')
                        region_end_time = region['endTime'].replace(':', '.')

                        current_hour = f'{datetime.now().hour}.{datetime.now().minute}'

                        if current_hour >= region_start_time:
                            subprocess.run(["python.exe", "src/services/CameraService.py", region['userId'], region['name'], region['ipCam'], region_end_time])
                            
        except Exception as error:
            print(error)

    def regions(self, url):
        return requests.get(url).json()


if __name__ == '__main__':
    SecurityMaster().start()
