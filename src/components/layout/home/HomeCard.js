import React from 'react'
import { NavLink } from 'react-router-dom'

const HomeCard = () => {
  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card grad2 lighten-1 center-align rounded-corner">
          <div className="card-content white-text">
            <span className="card-title white-text">Get Started</span>
            <br/>
            <p>
              CFY.finance is a DeFi app offering NFT-collatralised loans and NFT rental.
              Check out Docs for more info.
            </p>
            <br/>
          </div>
          <div className="card-action">
            <NavLink to='/' className="indigo-text text-lighten-2">Docs</NavLink>
          </div>
          <div className="card-action">
            <NavLink to='/newlease' className="indigo-text text-lighten-2">Create Lease Offer</NavLink>
          </div>
          <div className="card-action">
            <NavLink to='/newloan' className="indigo-text text-lighten-2">Create Loan Request</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCard;
