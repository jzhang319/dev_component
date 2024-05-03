from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins =[
        'http://devcomponent.onrender.com',
        'https://devcomponent.onrender.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat message")
def handle_chat(data):
    emit("chat message", data, broadcast=True)
