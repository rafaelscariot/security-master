from flask import Blueprint, jsonify, Response
from services.CameraService import CameraService
import cv2

ROUTES = Blueprint('routes', __name__, static_folder='static')


def get_blueprint():
    """Return the blueprint for the main app module"""
    return ROUTES


def gen(camera_service):
    capture = cv2.VideoCapture(0)

    while True:
        frame = camera_service.get_frame(capture)
        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n'
        )


@ROUTES.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'API is online'}), 200


@ROUTES.route('/monitoring', methods=['GET'])
def monitoring():
    return Response(gen(CameraService), mimetype='multipart/x-mixed-replace; boundary=frame')
