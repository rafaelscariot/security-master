import requests
import subprocess


def main():
    regions_request = requests.get('http://localhost:3000/region')
    regions = regions_request.json()

    devices_request = requests.get('http://localhost:3000/region')
    devices = regions_request.json()

    if regions == []:
        print('Nenhuma região cadastrada')
    else:
        for region in regions:
            print(region)
            subprocess.run(["python.exe", "services/CameraService.py", region])


if __name__ == '__main__':
    main()
