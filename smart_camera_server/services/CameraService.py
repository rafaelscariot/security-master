from controllers.Bot import Bot
import cv2
import sqlite3
import time


class CameraService:
    def __init__(self, userId):
        self.chatId = [],
        self.userId = userId

    def get_frame(self, capture):
        while True:
            _, frame = capture.read()

            if self.check_if_person_has_been_detected(capture, frame):
                self.get_chatId()
                if type(self.chatId) == tuple:
                    pass
                else:
                    for number in self.chatId:
                        self.telegram_notification(frame, number, self.userId)

                    time.sleep(30)

            _, jpeg = cv2.imencode('.jpg', frame)
            return jpeg.tobytes()

    def get_chatId(self):
        conn = sqlite3.connect('../application/data.db')
        c = conn.cursor()
        chatsIds = []
        for row in c.execute('SELECT chat_id FROM users_devices WHERE userID=?', self.userId):
            chatId = list(row)[0]
            chatsIds.append(chatId)
            self.chatId = chatsIds

        conn.close()

    def telegram_notification(self, frame, chatId, userId):
        cv2.imwrite('static/temp_img.jpg', frame)
        Bot().send("[[INFO]] Atividade suspeita registrada!", chatId, userId)

    def check_if_person_has_been_detected(self, capture, frame):
        in_width = 300
        in_height = 300
        wh_ratio = in_width / float(in_height)

        net = cv2.dnn.readNetFromCaffe(
            'static/models/MobileNetSSD_deploy.prototxt',
            'static/models/MobileNetSSD_deploy.caffemodel'
        )

        blob = cv2.dnn.blobFromImage(
            frame, 0.007843, (in_width, in_height), 127.5)
        net.setInput(blob)
        detections = net.forward()

        cols = frame.shape[1]
        rows = frame.shape[0]

        if cols / float(rows) > wh_ratio:
            crop_size = (int(rows * wh_ratio), rows)
        else:
            crop_size = (cols, int(cols / wh_ratio))

        y1 = int((rows - crop_size[1]) / 2)
        y2 = int(y1 + crop_size[1])
        x1 = int((cols - crop_size[0]) / 2)
        x2 = int(x1 + crop_size[0])

        frame = frame[y1:y2, x1:x2]

        cols = frame.shape[1]
        rows = frame.shape[0]

        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]

            if confidence > 0.8:
                class_id = int(detections[0, 0, i, 1])

                if class_id == 15:
                    return True
                else:
                    return False

                    # Record(capture).record()

                    # print('[INFO] Converting video...')
                    # os.system('ffmpeg -i output.mp4 -vcodec libx264 detection.mp4')

                    # f = open('video_name.txt', 'r')
                    # name = f.readline()
                    # video_name = int(name) + 1
                    # f.close()

                    # f = open('video_name.txt', 'w')
                    # f.write(str(video_name))
                    # f.close()

                    # os.rename('detection.mp4', 'detection{}.mp4'.format(str(video_name)))
                    # os.remove('output.mp4')

                    # os.system('mv {} ../../front/public/Videos'.format('detection'+str(video_name)+'.mp4'))

                    # print('[INFO] Activitie registred')
