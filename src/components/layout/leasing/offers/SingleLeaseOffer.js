import React, { Component } from 'react'
import M from "materialize-css"
import { cancelOffer, approveNFT, endleaseOffer, borrowNFT } from '../../../../services/web3/leaseNFTContract'
import { OFFER_STATUS } from "../../../../assets/consts/offersConsts"
import { EthAddress } from "rimble-ui";


class SingleLeaseOffer extends Component {

  componentDidMount() {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {});
  }

  getOfferEndingTime = (endLeaseTimeStamp) => {
    if (endLeaseTimeStamp === "0") {
      return "Ending time not set";
    }
    else return Intl.DateTimeFormat('en-GB').format(this.props.leaseOffer.endLeaseTimeStamp * 1000);
  }

  cancelOfferButton = (e) => {
    e.preventDefault();
    cancelOffer(this.props.leaseOffer.leaseID, this.props.userAddress);
  }

  requestCollateral = (e) => {
    e.preventDefault();
    endleaseOffer(this.props.leaseOffer.leaseID, this.props.userAddress);
  }

  approveReturn = (e) => {
    e.preventDefault();
    approveNFT(this.props.leaseOffer.smartContractAddressOfNFT,
              this.props.userAddress,
              this.props.leaseOffer.tokenIdNFT);
  }

  returnNFT = (e) => {
    e.preventDefault();
    endleaseOffer(this.props.leaseOffer.leaseID, this.props.userAddress);
  }

  acceptOffer = (e) => {
    e.preventDefault();
    borrowNFT(this.props.userAddress, this.props.leaseOffer.leaseID,
            this.props.leaseOffer.collateralAmount, this.props.leaseOffer.leasePrice);
  }

  getAvailableButtons = () => {
    let buttons = [];

    if (this.props.leaseOffer.lessor === this.props.userAddress) {
      if (OFFER_STATUS[this.props.leaseOffer.status] === "Pending") {
        // if offer is pending lender can cancel it
        buttons.push(
          <div class="card-action">
            <a href='/' onClick={this.cancelOfferButton}>Cancel</a>
          </div>
        );
      } else if (OFFER_STATUS[this.props.leaseOffer.status] === "Active" &&
                this.props.leaseOffer.endleaseTimeStamp * 1000 <= Date.now()) {
          buttons.push(
            <div class="card-action">
              <a href='/' onClick={this.requestCollateral}>Request Collateral</a>
            </div>
          )
      }
    } else if (this.props.leaseOffer.lessee === this.props.userAddress &&
              OFFER_STATUS[this.props.leaseOffer.status] === "Active") {
      buttons.push(
        <div class="card-action">
          <a href='/' onClick={this.approveReturn}>1. Approve Return</a>
          <a href='/' onClick={this.returnNFT}>2. Return NFT</a>
        </div>
      )
    } else {
      if (OFFER_STATUS[this.props.leaseOffer.status] === "Pending" &&
         this.props.leaseOffer.borrower !== this.props.userAddress) {
        buttons.push(
          <div class="card-action">
            <a href='/' onClick={this.acceptOffer}>Accept Offer</a>
          </div>
        )
      }
    }
    return buttons;
  }

  render() {
    const actions = this.getAvailableButtons();
    return(
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">{this.props.nftAsset.name}</div>
          <div class="collapsible-body">
            <div class="card transparent z-depth-0 center-align">
              <div class="card-content black-text">
                <span class="card-title">{this.props.nftAsset.name}</span>
                <div className="row">
                  <img src={this.props.nftAsset.image_url} />
                </div>
                <div className="row">
                  {this.props.nftAsset.description}
                </div>
                <div className="row">
                  <a className="btn waves-effect waves-light indigo lighten-1 button-offer" href={this.props.nftAsset.permalink}>OpenSea</a>
                </div>
                <br/>
                <div className="row left-align">
                  <p><b>Lessor </b> <EthAddress address={this.props.leaseOffer.lessor} /></p>
                </div>
                <div className="row left-align">
                  <p><b>Lessee </b> <EthAddress address={this.props.leaseOffer.lessee} /></p>
                </div>
                <div className="row left-align">
                  <p><b>Collateral Amount: </b>{this.props.leaseOffer.collateralAmount / Math.pow(10, 18)}</p>
                </div>
                <div className="row left-align">
                  <p><b>Leasing Price: </b>{this.props.leaseOffer.leasePrice / Math.pow(10, 18)}</p>
                </div>
                <div className="row left-align">
                  <p><b>Leasing Period (days): </b>{this.props.leaseOffer.leasePeriod / 86400}</p>
                </div>
                <div className="row left-align">
                  <p><b>End Leasing Time: </b>{this.getOfferEndingTime(this.props.leaseOffer.endleaseTimeStamp)}</p>
                </div>
                <div className="row left-align">
                  <p><b>Leasing Status: </b>{OFFER_STATUS[this.props.leaseOffer.status]}</p>
                </div>
                {actions}
              </div>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

export default SingleLeaseOffer;
