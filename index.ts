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

// promote to hash outside of function
const productHash: { [key: number]: any } = {};
const productSizeHash: { [key: number]: { [key: string]: boolean } } = {}; // maybe a better type if there are more size stuff we need

const checkAndAddProductToHash = ({ productId, productName }: any) => {
  if (!productHash[productId]) {
      productHash[productId] = {
        productId,
        productName,
      };
  }
}

const checkAndAddSizeHash = ({ productId, sizeName }: any) => {
  if (!productSizeHash[productId]) {
      productSizeHash[productId] = {};
  }
  if (!productSizeHash[productId][sizeName]) {
      productSizeHash[productId][sizeName] = true;
  }
}

const calcHash = () => {
  json.forEach((flat: any) => {
    checkAndAddProductToHash(flat);
    checkAndAddSizeHash(flat);
  })
}

const getSizesByProductId = (productId: number) => {
  const sizeHash = productSizeHash[productId];
  if (!sizeHash) { return []; }

  return Object.keys(sizeHash).map((hashKey) => {
    return {
      sizeName: hashKey,
    }
  });
}

const getProductById = (productId: number) => {
  return productHash[productId];
}
const getProducts = () => {
  return Object.keys(productHash).map((hashKey) => {
    // json number but object.keys is always string
    const intKey = parseInt(hashKey);
    return {
      productId: intKey,
      productName: getProductById(intKey).productName,
      sizes: getSizesByProductId(intKey),
    }
  });
}

const testDeNorm = () => {
  console.log(JSON.stringify(getProducts()))
}
calcHash();
testDeNorm();

// output
// [{"productId":1,"productName":"The First Beer","sizes":[{"sizeName":"like a little buzzed"},{"sizeName":"like dont drive"}]},{"productId":2,"productName":"Scotchy Scotch Scotch","sizes":[{"sizeName":"decanter"}]}]