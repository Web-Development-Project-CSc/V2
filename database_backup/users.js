const Accounts = require('../models/accounts');
const users = [
    {
        "name": "The Flavoured Monarch",
        "password": "12345",
        "country": "Flavoured Kingdom",
        "phone": 1000000000,
        "address": "Flavoured Throne",
        "birthDate": {
          "$date": "1999-01-01T00:00:00Z"
        },
        "email": "flavouredmiu@gmail.com",
        "paymentMethod": "Cash",
        "card": null,
        "numPurchases": 0,
        "boughtProducts": null,
        "role": "admin"
    },
    {
        "name": "Tester",
        "password": "pass",
        "country": "Egypt",
        "phone": 15,
        "address": "Cairo",
        "birthDate": {
          "$date": "2006-12-31T00:00:00Z"
        },
        "email": "tester@flavoured.com",
        "paymentMethod": "Card",
        "card": {
          "cvv": "45",
          "cardNumber": 12,
          "expMonth": "July",
          "expYear": "2023",
          "_id": {
            "$oid": "64763ef1531a3f03487d4193"
          }
        },
        "numPurchases": 0,
        "boughtProducts": null,
        "role": "customer",
        "updatedAt": {
          "$date": "2023-05-30T18:22:41.568Z"
        }
    }
]
for(let i = 0; i < users.length; i++){
    const user = new Accounts(users[i]);
    user.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}