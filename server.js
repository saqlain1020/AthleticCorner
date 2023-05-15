const axios = require("axios");
const cheerio = require("cheerio");

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
    await sendSms(newProds.map((p) => p.link).toString());
  console.log(newProds);
  return products;
}

async function sendSms(msg) {
  const authHeader =
    "Basic " +
    Buffer.from("saqlain@dechains.com:496#B@&AkyaUPWG").toString("base64");
  const res = await axios.post(
    "https://rest.clicksend.com/v3/sms/send",
    {
      messages: [
        {
          from: "Saqlain",
          body: msg,
          to: "+923000580479",
        },
      ],
    },
    {
      headers: {
        Authorization: authHeader,
      },
    }
  );
}

fetchAllProducts();
setInterval(() => {
  fetchAllProducts();
}, 60 * 1000);
