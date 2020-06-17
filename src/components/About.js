import React from 'react'

const Nav = () => {
    return(
        <div className="container">
            <div class="jumbotron bg-warning" style={{borderRadius:"10px"}}>
                <h1 class="display-3">Classic X-O game</h1>
                <p class="lead">The Opponent (PC player) will choose the best possible outcome out of all possibilities.
                It is based on the Minimax Algorithm of AI and for optimisation Alpha-Beta pruning is used</p>
                <i>If you don't make any mistakes in your moves, game will end up in a tie - You cannot WIN!</i>
                <br />
                <cite>~Developed by Vashanth</cite>
            </div>
        </div>
    )
}

export default Nav