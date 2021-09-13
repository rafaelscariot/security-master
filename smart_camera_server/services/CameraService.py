from TelegramService import TelegramService
import cv2
import numpy as np


class CameraService:
    def __init__(self, userId):
        self.chatId = [],
        self.userId = userId

    def get_frame(self, capture):
        while True:
            _, frame = capture.read()

            detections = self.check_if_person_vechicle_has_been_detected(frame)

            if detections != False:
                print(detections)

            _, jpeg = cv2.imencode('.jpg', frame)
            return jpeg.tobytes()

    def check_if_person_vechicle_has_been_detected(self, frame):
        RESIZED_DIMENSIONS = (300, 300)
        IMG_NORM_RATIO = 0.007843

        neural_network = cv2.dnn.readNetFromCaffe('../static/models/MobileNetSSD_deploy.prototxt', '../static/models/MobileNetSSD_deploy.caffemodel')

        (h, w) = frame.shape[:2]

        frame_blob = cv2.dnn.blobFromImage(cv2.resize(frame, RESIZED_DIMENSIONS), IMG_NORM_RATIO, RESIZED_DIMENSIONS, 127.5)

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
