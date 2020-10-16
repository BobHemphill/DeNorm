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
// we could probably break this down into its component indices but we will roll with this for now
const productSizeHash: { [key: number]: { [key: string]: { [key: number]: number } } } = {};

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
      productSizeHash[productId][sizeName] = {};
  }
}

const checkAndAddStoreHash = ({ productId, sizeName, storeId, storePrice }: any) => {
  if (!productSizeHash[productId]) {
      productSizeHash[productId] = {};
  }
  if (!productSizeHash[productId][sizeName]) {
      productSizeHash[productId][sizeName] = {};
  }
  if (!productSizeHash[productId][sizeName][storeId]) {
      productSizeHash[productId][sizeName][storeId] = storePrice;
  }
}

const calcHash = () => {
  json.forEach((flat: any) => {
    checkAndAddProductToHash(flat);
    checkAndAddSizeHash(flat);
    checkAndAddStoreHash(flat);
  });
}
const getStoresByProductSizeIds = (productId: number, sizeName: string) => {
  const sizeHash = productSizeHash[productId];
  if (!sizeHash) { return []; }
  const storeHash = sizeHash[sizeName];
  if (!storeHash) { return []; }

  return Object.keys(storeHash).map((hashKey) => {
    // json number but object.keys is always string
    const intKey = parseInt(hashKey);
    return {
      storeId: intKey,
      storePrice: storeHash[intKey],
    }
  });
}

const getSizesByProductId = (productId: number) => {
  const sizeHash = productSizeHash[productId];
  if (!sizeHash) { return []; }

  return Object.keys(sizeHash).map((hashKey) => {
    return {
      sizeName: hashKey,
      stores: getStoresByProductSizeIds(productId, hashKey)
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
// [
//   {
//     "productId": 1,
//     "productName": "The First Beer",
//     "sizes": [
//       {
//         "sizeName": "like a little buzzed",
//         "stores": [
//           {
//             "storeId": 1,
//             "storePrice": 0.99
//           },
//           {
//             "storeId": 2,
//             "storePrice": 1.39
//           }
//         ]
//       },
//       {
//         "sizeName": "like dont drive",
//         "stores": [
//           {
//             "storeId": 1,
//             "storePrice": 3.99
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "productId": 2,
//     "productName": "Scotchy Scotch Scotch",
//     "sizes": [
//       {
//         "sizeName": "decanter",
//         "stores": [
//           {
//             "storeId": 2,
//             "storePrice": 59.99
//           }
//         ]
//       }
//     ]
//   }
// ]