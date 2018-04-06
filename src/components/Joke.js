import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, } from 'reactstrap';
function JokeSetup(props){
    return(
        <Card body inverse style={{ backgroundColor: '#85144b', borderColor: '#85144b' }}>
         {props.jokeLoaded ?
            <span>
               <CardTitle>Joke About {props.jokeType.charAt(0).toUpperCase() + props.jokeType.slice(1)}</CardTitle>
               <CardText>{props.jokeSetup}</CardText>
               {/* <Button color="info" onClick={props.showClicked}>TELL ME</Button> */}
            </span>
            :
            <CardTitle>Getting a Joke</CardTitle>
         }
         {props.showResult ?
            <div> </div>
            :
            <Button color="info" onClick={() => { props.showClicked(props.index) }}>TELL ME</Button>
         }
      </Card>
    )
}
function Punchline(props){
    if (props.showResult){
        return(
            <div>
                <h5>{props.punch} — HA! HA! HA!</h5>
                <Button color="secondary" onClick={props.getAnotherClicked}>Show Another</Button>
            </div>
        )
    }else{
        return null;
    }
}
class Joke extends Component {
    constructor(props){
        super(props);
        // you have to have super(props); ... you might be able to use =>...but use super
        this.state = {
            jokeLoaded: false,
            objResult: {},
            showResult: false,
            error: null
        }
        
        // without this binding, showClicked calling this.setState is not available
        this.showClicked = this.showClick.bind(this);
        this.getAnotherClicked = this.getAnotherClicked.bind(this);
    }
    componentDidMount(){
        // lifecycle hook
        console.log('componentDidMount');
        // now go get the joke
        this.getJoke();
    }
    showClick(){
        console.log('clicked on show button');
        this.setState({
            showResult: true
        })
    }
    getAnotherClicked(){
        console.log('getAnother clicked');
        this.setState({
            jokeLoaded: false,
            objResult: {},
            showResult: false,
            error: null
        }, this.getJoke());
    }
    getJoke(){
        console.log('getJoke');
        fetch('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke')
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result', result);
                this.setState({
                    jokeLoaded: true,
                    objResult: result
                });
            },
            (error) => {
                this.setState({
                    jokeLoaded: true,
                    error: error
                });
        });
}
    render(){
        const {error, jokeLoaded, objResult, showResult} = this.state;
        
        if (error){
            return (
                <div>
                    <div>Error: {error.message}</div>
                </div>
            )
        } else if (!jokeLoaded){
            return <div>Loading...</div>
        } else{
            return(
                <div>
                    <JokeSetup 
                    jokeLoaded={jokeLoaded} 
                    jokeSetup={objResult.setup}
                    jokeType={objResult.type} 
                    showResult={showResult}
                    showClicked={this.showClicked}/>
                    <Punchline
                    showResult={showResult}
                    punch={objResult.punchline}
                    getAnotherClicked={this.getAnotherClicked} />
                </div>
            )
        }
    };
}
export default Joke;