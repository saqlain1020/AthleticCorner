const axios = require("axios");
const cheerio = require("cheerio");
const http = require("http");
const fs = require("fs");
const { initializeApp } = require("firebase/app");
const { getMessaging } = require("firebase/messaging");
var admin = require("firebase-admin");

admin.initializeApp({
  apiKey: "AIzaSyCXIxdFez2RIdUBYRZbRyDVZ5Db4isGNj0",
  authDomain: "wallet-tracker-js-ce5d2.firebaseapp.com",
  // databaseURL: "https://wallet-tracker-js-ce5d2.firebaseio.com",
  projectId: "wallet-tracker-js-ce5d2",
  storageBucket: "wallet-tracker-js-ce5d2.appspot.com",
  messagingSenderId: "713905702729",
  appId: "1:713905702729:web:8cdaecfc0dc26679b63c98",
  databaseURL: "https://wallet-tracker-js-ce5d2.firebaseio.com",
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "wallet-tracker-js-ce5d2",
    private_key_id: "8d95e1932a61d682dc7c1628a369c6143da851ed",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChZyZDI7S3ZjXX\nfnP/xDTMABMbzVgAAVpCdHE4UAUoWg8BElurO3ku6/6AcWxNIkdCqR+FrXe57404\nDmq61LIlghcsXA6j1z6RHA7GosiVzvwdf6Fgx8Q5uGc3scsRM43pbXrYpncVpGPj\n4BH99//NtBged25qTAqTlF6MBOKePMBugkfgEWzAcNqRPLQ+GR+Z3FL688020tlv\n1zLKxOkFKv5EmBLTTM5YdapgTRCv/xKYr4WniP8x7YG+aMkHx57JCp2RSz3mMdRE\n278SJpSJfngEtSuj7CzdsRDEEheurug6N2XAnVZ1Rx4nO+CKATyehdJFvfh36IWH\npswxgRM5AgMBAAECggEAMNhwHmp8YvJmQfiNb254EfLF1aifxKSkJa9qokGpRex3\nVPoyzs/ZXUdjRojM300L5tMa7JAyRw2FndzTFQaQgURs8epMLe5Si4TDvf5+mMPC\nzcSV2J2sN1Gkvxip3WNOQ8HzpwQ9zslox4pEt6jpe93QXMwFGNs5ai9BK7vAv2Uk\njkA6I81IWYp/j3arfbmVFE6GdBkwchAYboUJQY7bqtgVXoLQEn22ebLKSeNCSd2t\nXhDisTTXKPlNtUj0lfzxQ7bfTLXSI9nCIftmAGfwPbAP0qHPYTnFGl6T/qnMDrIw\n8GoE4AGVhF76IhUFAc4+CG7kHT4FRMS503T4rtp/TwKBgQDioFhYQfSIx2knY7gJ\nugBDc1GsPBi4ku/PbIsN6FewOqzyeQsktIuaI5eNQ0bmIbPuiO9ihrTG3Qc40gcs\nQPLWuSWW/EOKB6PpO4Fs1CdIhOQtS1FVQM2oLKuU+SexNv0y1u7k+5KP5/HPWvV1\nGlR8z/qOl/sbyAMJmZ/H5ry9rwKBgQC2UqLFQu3cOWAt4GZQla0V0o7S1FAFh1xh\n1W5j9J5EawGYmfA4PL3Slq1I9Sv0/QBOkAjSfNvUqaTXeoXEkjNe2fWFcSb6tAg1\nwtoV/iHG/fvVWQVuovhv5VHxT9iB94u2taB5+uR8PpQW8K9eeRMdKF/Zex+daTjD\nA+bWMFsflwKBgCntmoqxoSlRI25LL7h09imEg17HO5eib8XDgjKPgvGy2V5+8IXY\n9V8OKLLU+KAJKj3+jbN/0qBcMkLb8MHKPmNlm8PEZkZ6RWQYQ0i8M4xiMckDf0ez\nlpj/srr8IdDSqKOoSkiJFsOTGRTQ8kq5FVqGLAgHrEimh5FWH86fLNo3AoGAXeia\nZjhfA7uZyod2q7Msf70AS5+HyBE8iDfCsEFi86KaI9vGW3EN5NYvUxDVH07hRZXy\ntVgScqseeM5m8CTNyOFDEQSDK0ZnpClE42cORsyzVeSQY7gVdq0LU9vojKjQkb9j\ndPDBly00Ycx+x45dRftxwzcjxZRY5DmyQEiP5ukCgYEAlW7EYT1pubZCNjJ2L44H\nvoLBDEPSBzz394OHvkQJi2wluub+aKDr7+3aqs9u1CKnAJ75NaDfqY9UlnkvMVE1\noasnihGl1JucwY0iD7NkdLirqdRU7i9349pLSfLGj3Dg2lvUhyrOI4IH+47LZnMK\n1HpGzFo/v6Kiy/rGPQzXUBY=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-rx88c@wallet-tracker-js-ce5d2.iam.gserviceaccount.com",
    client_id: "110615120703682886107",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rx88c%40wallet-tracker-js-ce5d2.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});

// admin.messaging().send({
//   webpush: {
//     notification: {
//       title: "Atheletic Corner Shoes",
//       body: "Hellow",
//     },
//     fcmOptions: {
//       link: "/data",
//     },
//   },
//   token:
//     "dWeQ13M2NEkGiVycQGt8yk:APA91bFdcNmbYswzvsYZD5GI39-1wI2F-7OfsSyWWbsZ1b4AHONj_0VkP1iOinj36hkFngOE4qjtU9eL1o5ASBDicaO4hZpBwNjh4bm-bmY2ahE2d1XeoE7vzeP_4P80k5LV95avLnn5",
// });

var htmldata = "";

const PORT = process.env.PORT || 8080;

http
  .createServer(function (request, response) {
    if (request.url === "/") {
      fs.readFile("./index.html", function (err, html) {
        if (err) throw err;

        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
      });
    } else if (request.url === "/firebase-messaging-sw.js") {
      fs.readFile("./firebase-messaging-sw.js", function (err, html) {
        if (err) throw err;

        response.writeHeader(200, { "Content-Type": "application/javascript" });
        response.write(html);
        response.end();
      });
    } else if (request.url === "/data.html") {
      response.writeHeader(200, { "Content-Type": "text/html" });
      response.write(htmldata);
      response.end();
    }
  })
  .listen(PORT);

const url = "https://www.athleticorner.com/collections/football-shoes";
let oldProducts = [];

async function fetchProducts(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const products = [];
  let numberOfProducts = $(".card--standard").length;

  $(".card--standard").each((i, el) => {
    let name = $(el).find(".card__heading").text().trim();
    // get img src from img tag
    const img = $(el).find("img").attr("src").replace("//", "");
    const link = "https://www.athleticorner.com" + $(el).find("a").attr("href");

    const priceEle = $(el).find(".price__sale").text().trim();
    // const availability = $(el).find("span.availability").text().trim();
    // if (i === 0) {
    let splitted = name.split("\n");
    const info = splitted[5].trim();
    const size = info.split(" ")[1].replace("/", "");
    name = splitted[0];
    splitted = priceEle.split("\n");
    const regularPrice = Number(
      splitted[4].trim().replace("Rs ", "").replace(",", "")
    );
    const salePrice = Number(
      splitted[9].trim().replace("Rs ", "").replace(",", "")
    );
    const price = salePrice;
    // }
    // console.log({ name, price, size, img, info });
    if (
      (size.includes("41") || size.includes("41.5")) &&
      name.includes(" TF ")
    ) {
      products.push({ name, price, size, link, img });
    }
  });

  return { products, numberOfProducts };
}

async function fetchAllProducts() {
  let page = 1;
  let products = [];
  while (true) {
    const urlWithPage = `${url}?page=${page}`;
    const { products: pageProducts, numberOfProducts } = await fetchProducts(
      urlWithPage
    );

    if (numberOfProducts === 0) break;

    products = [...products, ...pageProducts];
    page++;
  }
  let newProds = [];

  products.forEach((p) => {
    const isOld = oldProducts.some(
      (op) =>
        op.link === p.link &&
        op.name === op.name &&
        op.price === op.price &&
        op.size === op.size &&
        op.img === op.img
    );
    if (!isOld) {
      newProds.push(p);
    }
  });
  oldProducts = products;
  if (newProds.length > 0)
    await sendSms(
      newProds.map((p, i) => `<a href="${p.link}">link${i}</a><br/>`)
    );
  console.log(newProds);
  return products;
}

async function sendSms(msg) {
  htmldata = msg;
  admin.messaging().send({
    webpush: {
      notification: {
        title: "Atheletic Corner Shoes",
        body: "Click to view new products",
      },
      fcmOptions: {
        link: "/data.html",
      },
    },
    token:
      "dWeQ13M2NEkGiVycQGt8yk:APA91bFdcNmbYswzvsYZD5GI39-1wI2F-7OfsSyWWbsZ1b4AHONj_0VkP1iOinj36hkFngOE4qjtU9eL1o5ASBDicaO4hZpBwNjh4bm-bmY2ahE2d1XeoE7vzeP_4P80k5LV95avLnn5",
  });

  // const authHeader =
  //   "Basic " +
  //   Buffer.from("saqlain@dechains.com:496#B@&AkyaUPWG").toString("base64");
  // const res = await axios.post(
  //   "https://rest.clicksend.com/v3/sms/send",
  //   {
  //     messages: [
  //       {
  //         from: "Saqlain",
  //         body: msg,
  //         to: "+923000580479",
  //       },
  //     ],
  //   },
  //   {
  //     headers: {
  //       Authorization: authHeader,
  //     },
  //   }
  // );
}

fetchAllProducts();
setInterval(() => {
  fetchAllProducts();
}, 60 * 1000);
