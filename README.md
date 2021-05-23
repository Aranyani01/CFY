## CFY.FINANCE

NFT-Collateralised Loans on Polygon

![alt text](https://raw.githubusercontent.com/Aranyani01/CFY/main/public/logo512.png)

Beta is now Live on Matic Mainnet! Contract Addresses:

- LeaseNFT.sol : 0xbe7Ba64cCAab7a4aaB4D32e4070Bf85D057D2B5c
- LoanNFT.sol : 0x48CddE6c5af7D19BF1A436159b54AD42d753141C

## Webapp (Frontend) live on: http://cfy.finance:3000

*Summary:*

CFY.Finance is a Decentralised Finance (DeFi) protocol for NFT-collateralised loans, and NFT lending. NFTs is a fast growing market that is currently plagued with extreme lack of liquidity. Moreover, unlike ERC20 tokens, holders of ERC721 NFT tokens do not have any way to earn passive income/access liquidity from their holdings. CFY.Finance changes that by allowing peer-to-peer NFT-collateralised loans using any ERC721 NFT.

Contracts:
[Note: LOAN NFT functionality is fully functional; Lease NFT is still a work in progress]

LoanNFT.sol allows you to:

1. Lock up any ERC721 token as collateral for a loan request
2. Setup loan request parameters, including loan amount, interest amount, and maximum interest periods
3. After loan is funded, you can extend the loan period upto the maximum interest periods
4. Upon repayment of the loan with interest within the time specified, the LoansNFT.sol contract releases your NFT back to you
5. If you fail to repay the loan within the promised time, the NFT collateral is transferred to the creditor

In this way, we allow a peer to peer, trustless liquidity protocol where investors can gain interest on their funds while their principal is secured by valuable NFTs. Meanwhile, NFT hodlers can access liquidity as needed without having to sell/risk their precious NFTs. The scalability of the Polygon chain makes it ideal for running complicated smart contracts like CFY.finance cheaply. *CFY.FINANCE* is also the first trustless NFT application, and first NFT-collateralised loan dApp on Polygon. We hope to provide the DeFi infrastructre for NFTs to grow and thrive on the Polygon Chain.























This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
