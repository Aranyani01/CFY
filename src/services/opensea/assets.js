import axios from 'axios';
import { OPENSEA_ASSETS, OPENSEA_SINGLE_ASSET, API_KEY} from "../../assets/consts/assetsConsts"




async function getmaticassets(account){
  let logindata = fetch("https://nft-marketplace.api.matic.network/api/v1/users/login", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "authorization": "null",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://matic.opensea.io/",
  "referrerPolicy": "origin",
  "body": "{\"address\":\"0xA66748Aa582a81fACFA9De73469eF217Bf839f4E\",\"signature\":\"0x0003125589cff31b19a8a2e9eddd427760a11f8b908cd4a694486193a6bfa0651fb3fdfda2e02cd6b136d734fa7288611b1745902698b39a4253e06be6cfa8061b\"}",
  "method": "POST",
  "mode": "cors"
}).then((response) => {
return response.json();
})
.then((data) => {
console.log(data);
});

console.log(logindata);
return logindata
}

//const assets = getmaticassets();
export async function getAssetsOpensea(account) {
      const options = {method: 'GET'};
      const baseurl = 'https://api.opensea.io/api/v2/assets/matic?owner=';
      const url = baseurl.concat(account) ;
      return axios.get('https://api.opensea.io/api/v2/assets/matic?owner=0xEF5dc33A53DD2ED3F670B53F07cEc5ADD4D80504')
          .then((response) => response.json())
          .then(data => {
              return data;
          })
          .catch(error => {
              console.error(error);
          });
        }


export async function getAssetsOpensea2(account) {
      const data = await getAssetsOpensea(account);
      return data;

  // const url = 'https://api.opensea.io/api/v1/assets?owner=' + String(account);
}

export const getAllLeaseAssets = async (leaseOffers) => {
  const leaseAssets = leaseOffers.map( (offer) =>
    getAssetRequest(offer.smartContractAddressOfNFT, offer.tokenIdNFT)
  );
  return Promise.all(
    leaseOffers.map(
      (offer) => getAssetRequest(offer.smartContractAddressOfNFT, offer.tokenIdNFT)
    )
  )
  return leaseAssets;
}

fetch("https://nft-marketplace.api.matic.network/api/v1/users/details", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxMDcsImlhdCI6MTYyMTAyMjkwNCwiZXhwIjoxNjIxMTA5MzA0fQ.-bKcMvTnNdfILRJ1qzkC5l5zqn9Tod7yzDX-YKexWjk",
    "if-none-match": "W/\"b7-9eMaxG9sybGDg7TxhBM0T4Thd2A\"",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://matic.opensea.io/",
  "referrerPolicy": "origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
export const getAllLoanAssets = async (loanRequests) => {
  const loanAssets = loanRequests.map( (request) =>
    getAssetRequest(request.smartContractAddressOfNFT, request.tokenIdNFT)
  );
  return Promise.all(
    loanRequests.map(
      (request) => getAssetRequest(request.smartContractAddressOfNFT, request.tokenIdNFT)
    )
  )
  return loanAssets;
}




export const getAssetRequest = async (contractAddress, tokenIdNFT) => {
  try {
    const options = {method: 'GET'};
    //let data = await fetch(OPENSEA_SINGLE_ASSET + "/" + contractAddress + "/" + tokenIdNFT, options);
let data = await axios.get('https://api.opensea.io/api/v1/asset/0x85f0e02cb992aa1f9f47112f815f519ef1a59e2d/1000639345')
        .then((response) => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error(error);
        });
    return data;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
