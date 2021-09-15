import requests
import subprocess
from datetime import datetime


def regions_request(url):
    return requests.get(url).json()


def main():
    try:
        regions = regions_request('http://localhost:3000/region')

        if regions == []:
            print("[INFO] Nothing to monitor...")
        else:
            for region in regions:
                region_start_time = region['startTime'].replace(':', '.')
                region_end_time = region['endTime'].replace(':', '.')

                current_hour = f'{datetime.now().hour}.{datetime.now().minute}'

                if current_hour >= region_start_time:
                    subprocess.run(["python.exe", "services/CameraService.py",
                                    region['userId'], region['name'], region['ipCam'], region_end_time])

    except Exception as error:
        print(error)


main()
