const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors'); // Import cors
const path = require('path');
const app = express();
const port = 5500; // Run everything on port 5500

// Set up Web Push VAPID keys (these can be generated with web-push npm package)
const vapidKeys = webpush.generateVAPIDKeys();
console.log('VAPID PUBLIC KEY:', vapidKeys.publicKey);
console.log('VAPID PRIVATE KEY:', vapidKeys.privateKey);

// Configure web-push
webpush.setVapidDetails(
  'mailto:your-email@example.com', // Replace with your email
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Use CORS to allow requests from the frontend URL (even though we're using the same port, CORS is still required for cross-origin requests)
app.use(cors());

// Serve static files (index.html and other files)
app.use(express.static(path.join(__dirname, 'public')));

// Store subscriptions (in a real app, you'd use a database)
let subscriptions = [];

// Endpoint to handle subscription (save subscription object)
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription); // Save the subscription
  console.log('New subscription:', subscription);
  res.status(201).json({ message: 'Subscription saved successfully' });
});

// Endpoint to send a push notification
app.post('/sendNotification', (req, res) => {
  const message = req.body.message;

  const notificationPayload = {
    notification: {
      title: 'Test Push Notification',
      body: message,
      icon: 'https://via.placeholder.com/150',
    },
  };

  // Send push notification to each subscription
  Promise.all(
    subscriptions.map((sub) =>
      webpush.sendNotification(sub, JSON.stringify(notificationPayload))
    )
  )
    .then(() => {
      res.status(200).json({ message: 'Notification sent' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Notification failed', details: err });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});