import cv2
import numpy as np
import sys

print(sys.argv[1])


class CameraService:
    def start(self, ip_cam):
        try:
            capture = cv2.VideoCapture(ip_cam)

            while True:
                has_frame, frame = capture.read()

                if not has_frame:
                    raise Exception(f'Error to access the camera {ip_cam}')

                detections = self.check_if_person_or_vechicle_has_been_detected(
                    frame)

                if not detections == False:
                    print(detections)

        except Exception as error:
            return error

    def check_if_person_or_vechicle_has_been_detected(self, frame):
        try:
            neural_network = cv2.dnn.readNetFromCaffe(
                '../static/models/MobileNetSSD_deploy.prototxt',
                '../static/models/MobileNetSSD_deploy.caffemodel'
            )

            frame_blob = cv2.dnn.blobFromImage(cv2.resize(
                frame, (300, 300)), 0.007843, (300, 300), 127.5)

            neural_network.setInput(frame_blob)

            neural_network_output = neural_network.forward()

            for i in np.arange(0, neural_network_output.shape[2]):
                confidence = neural_network_output[0, 0, i, 2]

                if confidence > 0.30:
                    idx = int(neural_network_output[0, 0, i, 1])

                    # 2 bikes - 6 bus - 7 cars - 14 motorbikes - 15 people
                    if idx == 2 or idx == 6 or idx == 7 or idx == 14 or idx == 15:
                        return idx

                return False

        except Exception as error:
            return error
