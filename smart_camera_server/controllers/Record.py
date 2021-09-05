import cv2
import time

class Record:
    def __init__(self, capture):
        self.capture = capture
        self.w = int(self.capture.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.h = int(self.capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
        self.fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        self.video_writer = cv2.VideoWriter("output.mp4", self.fourcc, 12, (self.w, self.h))

    def record(self):
        clock = time.localtime()
        started_in = clock.tm_min
        stop_in = started_in + 1

        while True:
            clock2 = time.localtime()
            if clock2.tm_min == stop_in:
                break
            
            ret, frame = self.capture.read()

            if ret:
                self.video_writer.write(frame)

        print('[INFO] Suspicious activitie recorded...')