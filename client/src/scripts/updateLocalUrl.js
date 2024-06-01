const fs = require('fs');
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

// Function to get the system's IP address
const getSystemIP = () => {
  const interfaces = os.networkInterfaces();
  for (const ifaceName in interfaces) {
    const iface = interfaces[ifaceName];
    if (iface) {
      for (const alias of iface) {
        if (alias.family === 'IPv4' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
  return null;
};

// Get the system's IP address
const systemIP = getSystemIP();
if (!systemIP) {
  console.error('Could not determine the system IP address.');
  process.exit(1);
}

// Path to the .env file, relative to the script's directory
const envFilePath = path.resolve(__dirname, '../../.env');

// Load the .env file if it exists, otherwise create an empty config
let envConfig = {};
if (fs.existsSync(envFilePath)) {
  envConfig = dotenv.parse(fs.readFileSync(envFilePath));
}

// Set the LOCAL_API_URL with the new IP address
const port = 5000; // The port number you want to use
envConfig['LOCAL_API_URL'] = `http://${systemIP}:${port}`;

// Serialize the updated .env configuration
const updatedEnvContent = Object.entries(envConfig)
  .map(([key, value]) => `${key}="${value}"`)
  .join('\n');

// Write the updated content back to the .env file (create if it doesn't exist)
fs.writeFileSync(envFilePath, updatedEnvContent, {encoding: 'utf8'});

console.log(`LOCAL_API_URL has been set to ${envConfig['LOCAL_API_URL']}`);
