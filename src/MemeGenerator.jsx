import { Component, Fragment} from 'react';
export default class extends Component {
    constructor() {
        super();
        this.state = {
            topText : "",
            bottomText : "",
            defaultImg : "http://i.imgflip.com/1bij.jpg",
            memes : []
        };
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes").then(r => r.json()).then(response => {  
            const memes = (response.data && Array.isArray(response.data.memes) && response.data.memes) || [];
            this.setState({memes});
        })
    }

    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = e => {
        e.preventDefault();  //grab the event to avoid page refresh and reset to default 
        const randNum = Math.floor(Math.random() * this.state.memes.length),
        defaultImg = (this.state.memes[randNum] && this.state.memes[randNum].url) || this.state.defaultImg;
        this.setState({defaultImg})
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.topText} name ="topText" onChange ={this.handleChange}/>
                <input type="text" value={this.state.bottomText} name ="bottomText" onChange ={this.handleChange}/>
                <input type="submit" value= "Gen" />
                </form>
                <br/> 
                <div>
                <h2>{this.state.topText}</h2>
                <img src={this.state.defaultImg} alt = "Problem?" width="500" height="500" />
                <h2>{this.state.bottomText}</h2>
                </div>
            </Fragment>
            
        );
    }
}


