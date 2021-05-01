import axios from 'axios';
import { OPENSEA_ASSETS, OPENSEA_SINGLE_ASSET, API_KEY} from "../../assets/consts/assetsConsts"



  async function getasset(account) {
      const options = {method: 'GET'};
      const baseurl = 'https://api.opensea.io/api/v1/assets?owner=';
      const url = baseurl.concat(account) ;
      let data = await axios.get('https://api.opensea.io/api/v1/assets?owner=0x185a408d23e25616365EfD28B0Dc1B20F618cF15')
          .then((response) => response.json())
          .then(data => {
              return data;
          })
          .catch(error => {
              console.error(error);
          });

      console.log(data)
      return data;
      }



export async function getAssetsOpensea(account) {
      const data = await getasset(account);
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
