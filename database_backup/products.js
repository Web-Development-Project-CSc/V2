const Products = require('../models/products');

const products = [
    {
        "name": "Cheetos",
        "price": 16.75,
        "numPurchases": 4,
        "imgUrl": "/IMAGES/Flavours/Cheetos.jpg",
        "updatedAt": {
          "$date": "2023-05-31T09:20:58.706Z"
        }
    },
    {
        "name": "Borio",
        "price": 12,
        "numPurchases": 0,
        "imgUrl": "/IMAGES/Flavours/borio.png"
      },
    {
        "name": "Takis",
        "price": 47,
        "numPurchases": 5,
        "imgUrl": "/IMAGES/Flavours/takis.png"
    },
    {
        "name": "ObourLand",
        "price": 6.66,
        "numPurchases": 1,
        "imgUrl": "/IMAGES/Flavours/Obourland.png"
    },
    {
        "name": "Bimbo",
        "price": 16,
        "numPurchases": 3,
        "imgUrl": "/IMAGES/Flavours/Bimbo.jpg"
    },
    {
        "name": "Sentimient Rice Pudding",
        "price": 19.99,
        "numPurchases": 2,
        "imgUrl": "/IMAGES/Flavours/Roz belaban.jpg"
    },
    {
        "name": "Salmon Nigiri",
        "price": 57,
        "numPurchases": 0,
        "imgUrl": "/IMAGES/Flavours/Sushi.png"
    },
    {
        "name": "Molokhia",
        "price": 20.22,
        "numPurchases": 8,
        "imgUrl": "/IMAGES/Flavours/Molokhia.jpg"
    },
    {
        "name": "Maltesers",
        "price": 22,
        "numPurchases": 0,
        "imgUrl": "/IMAGES/Flavours/maltesers.jpg"
    },
    {
        "name": "McFries",
        "price": 30,
        "numPurchases": 2,
        "imgUrl": "/IMAGES/Flavours/McFries.jpg"
    },
    {
        "name": "Nacho Cheese Doritos",
  "price": 15,
  "numPurchases": 0,
  "imgUrl": "/IMAGES/Flavours/doritos_nacho.jpg"
    },
    {
        "name": "Kentucky Fried Chicken",
        "price": 45.02,
        "numPurchases": 7,
        "imgUrl": "/IMAGES/Flavours/KFC-logo-696x391.jpg"
    },
    {
        "name": "M&Ms",
        "price": 17.5,
        "numPurchases": 3,
        "imgUrl": "/IMAGES/Flavours/m-ms-logo-yellow-background.jpg"
    },
    {
        "name": "Cinnabon",
        "price": 36,
        "numPurchases": 6,
        "imgUrl": "/IMAGES/Flavours/Cinnabon.png"
    },
    {
        "name": "Om Ali",
        "price": 27.19,
        "numPurchases": 0,
        "imgUrl": "/IMAGES/Flavours/Om Ali.jpg"
    },
    {
        "name": "Redbull",
  "price": 45,
  "numPurchases": 1,
  "imgUrl": "/IMAGES/Flavours/redbull.png"
    },
    {
        "name": "Cool Ranch Doritos",
        "price": 15,
        "numPurchases": 2,
        "imgUrl": "/IMAGES/Flavours/doritos cool ranch.jpg"
    },
    {
        "name": "Sour Cream Pringles",
        "price": 30.25,
        "numPurchases": 0,
        "imgUrl": "/IMAGES/Flavours/Pringles.png"
    },
    {
        "name": "Taro",
        "price": 27.99,
        "numPurchases": 1,
        "imgUrl": "/IMAGES/Flavours/Taro.png"
    },
    {
        "name": "Cheese-Cake Factory New York Style",
        "price": 48,
        "numPurchases": 4,
        "imgUrl": "/IMAGES/Flavours/cheesecake factory.jpg"
    },
    {
        "name": "Toblerone",
  "price": 66.47,
  "numPurchases": 0,
  "imgUrl": "/IMAGES/Flavours/1.-Toblerone-preview.jpg"
    },
    {
        "name": "Twinkies",
  "price": 8,
  "numPurchases": 0,
  "imgUrl": "/IMAGES/Flavours/Twinkies.jpg"
    },
    {
        "name": "Krispy Kreme Original Glazed",
        "price": 20,
        "numPurchases": 1,
        "imgUrl": "/IMAGES/Flavours/Krispy_Kreme.jpg"
    },
    {
        "name": "Flamin Hot Cheetos",
        "price": 18.75,
        "numPurchases": 1,
        "imgUrl": "/IMAGES/Flavours/Cheetos flamin hot.png"
    },
    {
        "name": "Skittles",
  "price": 12.08,
  "numPurchases": 0,
  "imgUrl": "/IMAGES/Flavours/skittles.png"
    },
    {
        "name": "Coca-cola",
  "price": 10,
  "numPurchases": 0,
  "imgUrl": "/IMAGES/Flavours/Coca-cola.png"
    },
    {
        "name": "Papa Johns Pizza",
  "price": 35,
  "numPurchases": 0,
  "imgUrl": "/IMAGES/Flavours/papa johns.jpg"
    }

]
for(let i =0;i<products.length;i++)
{
const product = new Products(products[i]);
product.save().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})
}