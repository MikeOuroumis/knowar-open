# Knowar - Multiplayer Quiz Game

![Knowar Logo](./client/src/assets/images/Knowar_logo.png)

Welcome to the **knowar-open**! This is a production-ready version of
[Knowar](https://play.google.com/store/apps/details?id=com.knowar_client), a
multiplayer quiz game.

If you're interested in building multiplayer games with React Native and Node.js
or understanding how sockets work for real-time communication, this is the
place! Clone the project to practice or contribute!

The backend includes configurations for deploying to an EC2 machine on AWS,
including a `server-deploy.yml` file in the `.github/workflows/backup/`
directory to help you understand advanced CI/CD pipelines.

Although it's production-ready, you can run everything locally by following the
instructions below.

## Give it a Star ⭐

If you find this project helpful or interesting, please consider giving it a
star. It helps me grow and reach more developers who might benefit from this
project. Thank you for your support!

## How to Run the Project Locally

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js and npm (Node Package Manager)
- React Native CLI
- MongoDB (for the database)
- Android Studio (for running the Android app)

### Clone the Repository

```bash
git clone https://github.com/MikeOuroumis/knowar-open.git
cd knowar-open
```

### Install Dependencies

#### Server Dependencies

```bash
cd server
npm install
```

#### Client Dependencies

```bash
cd ../client
npm install
```

### Configure Environment Variables

To create the `.env` file, simply run:

```bash
npm run update-local-url
```

Please note that every time you change your Wi-Fi connection, you will need to
run this script again to update the IP address.

### Fallback Option if "npm run update-local-url" Doesn't Work

First, find your system's IP address since `localhost` can't connect your phone
to the backend like a browser does.

**How to find the system IP:**

#### On MacOS

1. Open the terminal and run:
   ```bash
   ifconfig
   ```
2. Under `en0`, find the `inet` value. This IP next to `inet` is your system's
   IP address. Copy it and paste it into the `.env` file as shown below.

#### On Windows

1. Open the Command Prompt (`cmd.exe`) and run:
   ```bash
   ipconfig
   ```
2. Look for the `IPv4 Address` under your active network connection. This is
   your system's IP address. Copy it and paste it into the `.env` file as shown
   below.

#### On Linux

1. Open the terminal and run:
   ```bash
   ip addr show
   ```
2. Look for the `inet` value under your active network connection. This is your
   system's IP address. Copy it and paste it into the `.env` file as shown
   below.

Create a `.env` file in the `client` directory and add the following variable:

```plaintext
LOCAL_API_URL="http://{your-machine's-ip}:5000"
```

### Configure `gradle.properties` for Android Builds

#### Using the gradle.properties Template

To set up your local `gradle.properties` file, follow these steps:

**Copy the Template File**:

Copy the `gradle.properties.template` file to create your local
`gradle.properties` file:

```bash
cp android/gradle.properties.template android/gradle.properties
```

### Start the Server

```bash
# From the server directory
npm run dev
```

### Start the Client

```bash
# From the client directory
npm run android
```

## Sneak Peek

![Gameplay Preview](https://github.com/MikeOuroumis/Knowar/assets/93167319/02a77bcd-7b6e-40fc-a242-1725212ab42d)

## About the Game

**Knowar** challenges players with a wide array of questions from the Open
Trivia Database across various categories and difficulties. The game promotes
friendly competition with an engaging real-time experience.

## Features

- Cross-platform mobile application built with React Native.
- Real-time multiplayer gameplay facilitated by Socket.IO.
- MVC architectural pattern in Node.js for a scalable backend.
- MongoDB for efficient data management.

## Play the Game

**Knowar** is available on the Google Play Store. Download and play the game by
visiting the following link:

[Play Knowar on Google Play Store](https://play.google.com/store/apps/details?id=com.knowar_client)
