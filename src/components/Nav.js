import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Tic-Tac-Toe</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            </ul>
        </div>
        </nav>
    )
}

export default Nav