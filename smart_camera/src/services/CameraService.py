import cv2
import sys
import numpy as np
from datetime import datetime
from TelegramService import TelegramService


class CameraService:
    def __init__(self):
        self.user_id = sys.argv[1],
        self.region_name = sys.argv[2],
        self.ip_cam = sys.argv[3],
        self.region_end_time = sys.argv[4]

    def start(self):
        try:
            capture = cv2.VideoCapture(self.ip_cam)

            while True:
                has_frame, frame = capture.read()

                if not has_frame:
                    raise Exception(f'Error to access the camera {self.ip_cam}')

                detections = self.check_if_person_or_vechicle_has_been_detected(frame)

                if not detections == False:
                    cv2.imwrite('../static/temp_img.jpg', frame)
                    TelegramService().send_notification(detections, self.user_id)

                current_hour = f'{datetime.now().hour}.{datetime.now().minute}'

                if self.region_end_time >= current_hour:
                    break
        except Exception as error:
            return error

    def check_if_person_or_vechicle_has_been_detected(self, frame):
        try:
            neural_network = cv2.dnn.readNetFromCaffe(
                'src/models/MobileNetSSD_deploy.prototxt',
                'src/models/MobileNetSSD_deploy.caffemodel'
            )

            frame_blob = cv2.dnn.blobFromImage(cv2.resize(
                frame, (300, 300)), 0.007843, (300, 300), 127.5)

            neural_network.setInput(frame_blob)

            neural_network_output = neural_network.forward()

            for i in np.arange(0, neural_network_output.shape[2]):
                confidence = neural_network_output[0, 0, i, 2]

                if confidence > 0.30:
                    idx = int(neural_network_output[0, 0, i, 1])

                    if idx == 2: 
                        return f'Alerta: Bike identificada na região {self.region_name}'
                    
                    elif idx == 6:
                        return f'Alerta: Ônibus identificado na região {self.region_name}'

                    elif idx == 7:
                        return f'Alerta: Carro identificado na região {self.region_name}'

                    elif idx == 14:
                        return f'Alerta: Moto identificada na região {self.region_name}'

                    elif idx == 15:
                        return f'Alerta: Pessoa identificada na região {self.people}'

                return False
        except Exception as error:
            return error


CameraService().start()
