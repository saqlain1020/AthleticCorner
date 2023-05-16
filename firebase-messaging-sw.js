// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// import * as msg from "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging.js";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCXIxdFez2RIdUBYRZbRyDVZ5Db4isGNj0",
  authDomain: "wallet-tracker-js-ce5d2.firebaseapp.com",
  databaseURL: "https://wallet-tracker-js-ce5d2.firebaseio.com",
  projectId: "wallet-tracker-js-ce5d2",
  storageBucket: "wallet-tracker-js-ce5d2.appspot.com",
  messagingSenderId: "713905702729",
  appId: "1:713905702729:web:8cdaecfc0dc26679b63c98",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
