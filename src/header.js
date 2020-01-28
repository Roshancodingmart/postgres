import React, { Component } from 'react'
import "./header.css"
export default class Header extends Component {
    render() {
        return (
           <>
                <div className="header-main">
                   <div className="btn-holder">
                   <button>Sign Up</button>
                   <button>Sign In</button>
                   </div> 
                </div>
           </>
        )
    }
}
