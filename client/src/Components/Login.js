import React, { Component } from 'react'
import logo from './Asserts/Images/gamelogo.png'

class Login extends Component {
    render() {
        return (
            <div>
                <section id="showcase">
                    <div className="main">
                        <img alt="Facebook Logo" src={logo} className="logo" />
                        <h2 className="highlight">full-stack-game-app-v1</h2>
                        <p>
                            full-stack-game-app-v1 is a coolest game ever !! This Multiple choice or objective response is a form of an objective assessment in which respondents are asked to select only correct answers from the choices offered as a list. The multiple choice format is most frequently used in educational testing, in market research, and in elections, when a person chooses between multiple candidates or parties.
						</p>
                        <a ><button className="button">Login With Facebook</button></a>
                    </div>
                </section>

            </div>
        )
    }
}

export default Login;
