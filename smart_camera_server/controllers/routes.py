from flask import Blueprint, Response, request
from controllers.SmartCamera import SmartCamera
import cv2

REQUEST_API = Blueprint('request_api', __name__)


def get_blueprint():
    """Return the blueprint for the main app module"""
    return REQUEST_API


def gen(camera):
    capture = cv2.VideoCapture(0)

    while True:
        frame = camera.get_frame(capture)
        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n'
        )


@REQUEST_API.route('/monitoring')
def monitoring():
    userId = request.args.get('userId', default='*', type=str)
    smart_camera = SmartCamera(userId)
    return Response(gen(smart_camera), mimetype='multipart/x-mixed-replace; boundary=frame')
