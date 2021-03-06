import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ToastMessage } from "rimble-ui"

import { getAccountAddressAction, getAccountAssetAction } from './store/actions/accountActions'
import { getLeaseOffersAction, getLeaseAssetsAction } from './store/actions/leaseActions'
import { getLoanRequestsAction, getLoanAssetsAction } from './store/actions/loanActions'

import './assets/css/mystyles.css'
import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/layout/home/HomePage'
import NewLeaseOffersPage from './components/layout/leasing/newlease/NewLeaseOfferPage'
import MyLeaseOffers from './components/layout/leasing/offers/MyLeaseOffers'
import AllLeaseOffersPage from './components/layout/leasing/offers/AllLeaseOffersPage'
import NewLoanRequestPage from './components/layout/loans/newloan/NewLoanRequestPage'
import MyLoanRequestsPage from './components/layout/loans/requests/MyLoanRequestsPage'
import AllLoanRequestsPage from './components/layout/loans/requests/AllLoanRequestsPage'

import { LENDING_CONTRACT_ADDRESS } from "./assets/consts/requestsConsts"
import { LEASING_CONTRACT_ADDRESS } from './assets/consts/offersConsts'
import contractInterface from './contractsInterfaces/LoansNFT.json'
import Web3 from 'web3'
import { Magic } from 'magic-sdk'



const PolygonOptions = {
  /* Smart Chain Testnet RPC URL */
  rpcUrl: 'https://rpc-mainnet.matic.network',
  chainId: 137, // Smart Chain Testnet Chain ID
};

const magic = new Magic('pk_test_058AAE9FA7BEE23B', {
  network: PolygonOptions,
});
/* Initialize Matic Smart Chain Web3 provider */
const web3 = new Web3('https://rpc-mainnet.matic.network')
// web3.personal.sign()

fetch("https://nft-marketplace.api.matic.network/api/v1/users/login", {
  "referrer": "https://matic.opensea.io/",
  "referrerPolicy": "origin",
  "body": "{\"address\":\"0xA66748Aa582a81fACFA9De73469eF217Bf839f4E\",\"signature\":\"0x0003125589cff31b19a8a2e9eddd427760a11f8b908cd4a694486193a6bfa0651fb3fdfda2e02cd6b136d734fa7288611b1745902698b39a4253e06be6cfa8061b\"}",
  "method": "POST",
  "mode": "cors"
});
// const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');


class App extends Component {

  componentDidMount() {
    this.props.getAccountAddressAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userAddress !== this.props.userAddress) {
      this.props.getAccountAssetAction(this.props.userAddress);
      this.props.getLeaseOffersAction(this.props.userAddress);
      this.props.getLoanRequestsAction(this.props.userAddress);
      this.subscribeToEvents();
    }
    if (prevProps.leaseOffers.length !== this.props.leaseOffers.length) {
      this.props.getLeaseAssetsAction(this.props.leaseOffers);
    }
    if (prevProps.loanRequests.length !== this.props.loanRequests.length) {
      this.props.getLoanAssetsAction(this.props.loanRequests);
    }
  }

  subscribeToEvents = () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const crtLending = new web3.eth.Contract(contractInterface, LENDING_CONTRACT_ADDRESS, {from: this.props.userAddress});
      const crtLeasing = new web3.eth.Contract(contractInterface, LEASING_CONTRACT_ADDRESS, {from: this.props.userAddress});
      crtLending.events.allEvents().on('data', (event) => {
        this.props.getAccountAssetAction(this.props.userAddress);
        this.props.getLoanRequestsAction(this.props.userAddress);
      });
      crtLeasing.events.allEvents().on('data', (event) => {
        this.props.getAccountAssetAction(this.props.userAddress);
        this.props.getLeaseOffersAction(this.props.userAddress);
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        <Navbar />
        <Switch>
          <Route path='/newlease' component={NewLeaseOffersPage} />
          <Route path='/myleaseoffers' component={MyLeaseOffers} />
          <Route path='/allleaseoffers' component={AllLeaseOffersPage} />
          <Route path='/newloan' component={NewLoanRequestPage} />
          <Route path='/myloans' component={MyLoanRequestsPage} />
          <Route path='/allloans' component={AllLoanRequestsPage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAddress: state.account.accountAddress.address,
    leaseOffers: state.leasing.leaseOffers,
    loanRequests: state.loans.loanRequests
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAccountAddressAction: () => dispatch(getAccountAddressAction()),
    getAccountAssetAction: (address) => dispatch(getAccountAssetAction(address)),
    getLeaseOffersAction: (address) => dispatch(getLeaseOffersAction(address)),
    getLeaseAssetsAction: (leaseOffers) => dispatch(getLeaseAssetsAction(leaseOffers)),
    getLoanRequestsAction: (address) => dispatch(getLoanRequestsAction(address)),
    getLoanAssetsAction: (loanRequests) => dispatch(getLoanAssetsAction(loanRequests))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
