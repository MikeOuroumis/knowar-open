# Knowar - Multiplayer Quiz Game

Welcome to the _knowar-open_! A production-ready project and version of
[Knowar](https://play.google.com/store/apps/details?id=com.knowar_client) quiz
game!

If you want to learn how to build multiplayer games with React Native and
Node.js, or how sockets work for real-time communication, this is the place! You
can clone the project and practice for yourself, or even contribute!

The backend of the project contains all the configurations for deploying to an
EC2 machine on AWS. There is even a `server-deploy.yml` file inside the
`.github/workflows/backup/` directory so you can get an understanding of
advanced CI/CD pipelines.

Although it is production-ready, there is no need to run anything on the cloud,
you can run everything locally by simply following the instructions below.

### How to Run the Project Locally

To run the _Knowar_ project locally, follow these steps:

#### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js and npm (Node Package Manager)
- Expo CLI (for running the React Native app)
- MongoDB (for the database)

#### Clone the Repository

```bash
git clone https://github.com/your-username/knowar-open.git
cd knowar-open
```

#### Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

#### Configure Environment Variables

First, you'll need to find the system's IP address because `localhost` can't
connect your phone to the backend, like a browser does.

**How to find the system IP:**

_On MacOS:_

1. Open the terminal and run the command:

   ```
   ifconfig
   ```

2. Under `en0`, you'll find an `inet` value. This IP next to `inet` is your
   system's IP address. Copy it and paste it inside the `.env` file as displayed
   below.

_On Windows:_

1. Open the Command Prompt (cmd.exe) and run the command:

   ```
   ipconfig
   ```

2. Look for the `IPv4 Address` under your active network connection. This is
   your system's IP address. Copy it and paste it inside the `.env` file as
   displayed below.

_On Linux:_

1. Open the terminal and run the command:

   ```
   ip addr show
   ```

2. Look for the `inet` value under your active network connection. This is your
   system's IP address. Copy it and paste it inside the `.env` file as displayed
   below.

Create a `.env` file in the `client` directory and add the following variable:

```plaintext
LOCAL_API_URL="http://{your-machine's-ip}:5000"
```

#### Start the Server

```bash
# From the server directory
npm run dev
```

#### Start the Client

```bash
# From the client directory
npm run android
```

### Sneak Peek

![ezgif com-video-to-gif-converter (1)](https://github.com/MikeOuroumis/Knowar/assets/93167319/02a77bcd-7b6e-40fc-a242-1725212ab42d)

## About the game

_Knowar_ challenges players with a wide array of questions from the Open Trivia
Database across various categories and difficulties. The game promotes friendly
competition with an engaging real-time experience.

## Features

- Cross-platform mobile application built with React Native.
- Real-time multiplayer gameplay facilitated by Socket.IO.
- MVC architectural pattern in Node.js for a scalable backend.
- MongoDB for efficient data management.

## Play the Game

_Knowar_ is available on the Google Play Store. You can download and play the
game by visiting the following link:

[Play Knowar on Google Play Store](https://play.google.com/store/apps/details?id=com.knowar_client)
