import React, {Component} from  'react'
import "./Xo.css"
import { Link } from 'react-router-dom'

class Xo extends Component
{
    state = {
        Player :  "",
        class : "",
        allow : true,
        ar : [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']],
        winner:"-",
        winConfig : [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],
        opponent:""
        }

    componentDidMount()
    {
        this.setState({
            Player : this.props.match.params.id,
            class : this.props.match.params.id,
            opponent : this.props.match.params.id == 'x' ? 'o' : 'x'
        })
    }

    gameOver = (arr) => {
        const localConfig = this.state.winConfig
        for(var i=0;i<localConfig.length;i+=1)
        {
            const a = localConfig[i][0]
            const b = localConfig[i][1]
            const c = localConfig[i][2]
            if(arr[parseInt(a/3)][a%3]!=='-' && arr[parseInt(a/3)][a%3]==arr[parseInt(b/3)][b%3] && arr[parseInt(b/3)][b%3]==arr[parseInt(c/3)][c%3])
                return i
        }
        return  -1
    }


    displayWinnerLine = (i) => {
        var  it,obj
        for(var j=0;j<3;j+=1)
        {
            it = this.state.winConfig[i][j]+1
            obj="obj"+it
            document.getElementById(obj).style.backgroundColor="#ffff33 "
        }
    }


    fillar = (s) => {
        s-=1
        const r = parseInt(s/3)
        const c = s%3
        const newArr = this.state.ar
        newArr[r][c] = this.state.Player
        this.setState({arr:newArr})
    }

    freeMoves = (ar) => {
        for(var i=0;i<3;i++)
        for(var j=0;j<3;j++)
        if(ar[i][j]=="-")
        return true
        return false;
    }

    miniMax = (arr,max,alpha,beta,depth) => {
        const ind = this.gameOver(arr)
        if(ind !== -1)
        {
            const r = parseInt(this.state.winConfig[ind][0]/3)
            const c = parseInt(this.state.winConfig[ind][0]%3)
            const val = arr[r][c]
            if(val === this.state.opponent)
            return 100-depth
            else 
            return -100+depth
        }
        
        if(!this.freeMoves(arr))
        return 0

        if(max)
        {
            var best = -Infinity
            for(var i=0;i<3;i++)
            {
                for(var j=0;j<3;j++)
                {
                    if(arr[i][j] === '-')
                    {
                        arr[i][j] = this.state.opponent
                        best = Math.max(best, this.miniMax(arr,false,alpha,beta,depth+1))
                        alpha = Math.max(alpha, best)
                        arr[i][j]='-'
                        if(alpha >= beta)
                        break
                    }
                }
            }
            return best
        }
        else
        {
            var best = Infinity
            for(var i=0;i<3;i++)
            {
                for(var j=0;j<3;j++)
                {
                    if(arr[i][j]=='-')
                    {
                        arr[i][j]=this.state.Player
                        best = Math.min(best, this.miniMax(arr,true,alpha,beta,depth+1))
                        beta = Math.min(beta, best)
                        arr[i][j]='-'
                        if(alpha >= beta)
                        break
                    }
                }
            }
            return best
        }
    }

    miniMaxInit = () => {     
        const ar = this.state.ar
        var best = -Infinity
        var  pair
        for(var i=0;i<3;i++)
        {
            for(var j=0;j<3;j++)
            {
                if(ar[i][j] === '-')
                {
                    ar[i][j] = this.state.opponent
                    var score = this.miniMax(ar, false, -Infinity, Infinity, 0)
                    ar[i][j]="-"
                    if(score > best)
                    {
                        best = score
                        pair = {i,j}
                    }
                }
            }
        }

        ar[pair.i][pair.j] = this.state.opponent

        const img = `obj${pair.i*3 + pair.j + 1}`
        document.getElementById(img).className+=` ${this.state.opponent}img`
        document.getElementById(img).style.pointerEvents="none"     

        this.setState({allow:true,
                        arr:ar})
        
        const isOver = this.gameOver(this.state.ar)

        if(isOver !== -1)
        {
            alert("AI Won")
            this.displayWinnerLine(isOver)
            document.getElementById("tab").style.pointerEvents="none"
            return
        }

        if(!this.freeMoves(this.state.ar))
        {
            alert("TIE!")
            document.getElementById("tab").style.pointerEvents="none"
            return
        }
    }

    fire = (e) => {
        const num = e.target.id[e.target.id.length-1]
        if(this.state.allow && this.state.ar[parseInt((num-1)/3)][(num-1)%3]==="-")
        {
            const starter = document.getElementById("start")
            if(starter)
            starter.remove()

           document.getElementById("reset").style.display="block"

            this.fillar(num)
            
            this.setState({allow:false})

            document.getElementById(e.target.id).className+=` ${this.state.Player}img`
            document.getElementById(e.target.id).style.pointerEvents="none"

            this.setState({
                freeMoves : this.state.freeMoves-1
            })

            const isOver = this.gameOver(this.state.ar)

            if(isOver !== -1)
            {
                alert("You Won")
                this.displayWinnerLine(isOver)
                document.getElementById("tab").style.pointerEvents="none"
                return
            }

            if(!this.freeMoves(this.state.ar))
            {
                alert("TIE!")
                document.getElementById("tab").style.pointerEvents="none"
                return
            }

            this.miniMaxInit()
        }
    }

    startAI = () => {
        const starter = [1,3,7,9]
        const index = Math.floor(Math.random()*4)
        const r = parseInt((starter[index]-1)/3)
        const c = (starter[index]-1)%3
        const ar = this.state.ar
        ar[r][c] = this.state.opponent
        this.setState({ar})
        const img = "obj"+starter[index]
        document.getElementById(img).className+=` ${this.state.opponent}img`
        document.getElementById(img).style.pointerEvents="none"
        document.getElementById("start").remove()
        document.getElementById("reset").style.display="block"
    }

    render()
    {
        return(
            <div className="container">
                <div id="board">
                    <table id="tab">
                        <tr id="row1">
                            <td id="obj1" className={`square ${this.state.class}`} onClick={this.fire}></td>
                            <td id="obj2" class={`square ${this.state.class} v`} onClick={this.fire}></td>
                            <td id="obj3" class={`square ${this.state.class}`} onClick={this.fire}></td>
                        </tr>
                        <tr id="row2">
                            <td id="obj4" class={`square ${this.state.class} h`} onClick={this.fire}></td>
                            <td id="obj5" class={`square ${this.state.class} v h`} onClick={this.fire}></td>
                            <td id="obj6" class={`square ${this.state.class} h`} onClick={this.fire}></td>
                        </tr>
                        <tr id="row3">
                            <td id="obj7" class={`square ${this.state.class}`} onClick={this.fire}></td>
                            <td id="obj8" class={`square ${this.state.class} v`} onClick={this.fire}></td>
                            <td  id="obj9" class={`square ${this.state.class}`} onClick={this.fire}></td>
                        </tr>
                    </table>
                    <br />
                    <button id="start" className="btn btn-primary" onClick={this.startAI}>Let Opponent Start</button>
                    &nbsp;&nbsp;&nbsp;
                    <Link to="/" style={{textDecoration:"none"}}><button id="reset" className="btn btn-success" style={{display:"none"}}>Restart</button></Link>
                </div>
            </div>  
        )
    }
}

export default Xo