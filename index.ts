const jsonString = `[{
    "productId": 1,
    "productName": "The First Beer",
    "sizeName": "like a little buzzed",
    "storeId": 1,
    "storePrice": 0.99
  }, {
    "productId": 1,
    "productName": "The First Beer",
    "sizeName": "like a little buzzed",
    "storeId": 2,
    "storePrice": 1.39
  }, {
    "productId": 1,
    "productName": "The First Beer",
    "sizeName": "like dont drive",
    "storeId": 1,
    "storePrice": 3.99
  }, {
    "productId": 2,
    "productName": "Scotchy Scotch Scotch",
    "sizeName": "decanter",
    "storeId": 2,
    "storePrice": 59.99
  }]`;
  
  // const deNormalized = [{
  //   productId: 1,
  //   productName: "The First Beer",
  //   sizes: [{
  //     sizeName: "like a little buzzed",
  //     stores: [{
  //       storeId: 1,
  //       price: .99,
  //     }, {
  //       storeId: 2,
  //       price: 1.39,
  //     }]
  //   }, {
  //     sizeName: "like dont drive",
  //     stores: [{
  //       storeId: 1,
  //       price: 3.99,
  //     }]
  //   }]
  // }, {
  //   productId: 2,
  //   productName: "Scotchy Scotch Scotch",
  //   sizes: [{
  //     sizeName: "decanter",
  //     stores: [{
  //       storeId: 2,
  //       price: 59.99,
  //     }]
  //   }]
  // }];

  // lets start TDDing
const json = JSON.parse(jsonString);
const getProducts = () => {
  const productHash: { [key: string]: boolean } = {};
  json.forEach(({ productId }: any) => {
    if (!productHash[productId]) {
      productHash[productId] = true;
    }
  })
  return Object.keys(productHash).map((hashKey) => ({
    productId: hashKey,
  }));
}

const testDeNorm = () => {
  console.log(getProducts())
}

testDeNorm();

// output
// [ { productId: '1' }, { productId: '2' } ]