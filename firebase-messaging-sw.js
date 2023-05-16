importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging.js"
);

firebase.initializeApp({
  messagingSenderId: "713905702729",
});

const messaging = firebase.messaging();
