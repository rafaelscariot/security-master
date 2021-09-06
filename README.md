# Security Master 📷🔒

System built in order to monitor, notify and detect the traffic of people and vehicles in a certain region and time with one or more security cameras.

The project is divided into two modules:

- **smart_camera_server**: contain a server to process video streaming from surveillance cameras and trigger alerts to users.

- **webapp**: contain the WebApp for viewing and recording information regarding the progress of property security.

The system features can be seen in the use case diagram below:

<img src="https://github.com/rafaelscariot/security-master/blob/master/resources/usecases.png" />

## Use
In the *docker* directory run the following command:
```bash
./build.sh
```

Now access the *localhost:3000* address in your browser and enjoy the application's functionalities.
