class App extends React.Component {
constructor() {
    super();
    this.state = {
        numberUser: 0,
        activeUser: [],
        user: ['gaearon', 'acdlite', 'yyx990803', 'unclebob', 'martinfowler'],
        loading: false,
        imageload: true
    };
}

    getResponse(userx) {
        this.setState({imageload:false, loading: true})
        const url = `https://api.github.com/users/${userx}`;
        fetch(url)
        .then(response => response.json())
        .then(responseJson => this.setState({activeUser: responseJson, loading: false, imageload:true}))
    }
    componentDidMount() {
        this.getResponse('gaearon')
    }
    previousButton(){
        let prevIndex = this.state.numberUser - 1;
        if (prevIndex< 0) {
          prevIndex = 4;
        }
        this.setState({ numberUser: prevIndex });
        this.getResponse(this.state.user[prevIndex]);
    }
    nextButton() {
        let nextIndex = this.state.numberUser + 1;
        if (nextIndex> 4) {
          nextIndex = 0;
        }
        this.setState({ numberUser: nextIndex });
        this.getResponse(this.state.user[nextIndex]);
    }
    render() {
        return (
        <div>
            {console.log("active state: " + this.state.numberUser)}
            <User  user={this.state.activeUser} loading={this.state.loading} imageload={this.state.imageload}/>
            <div className={'buttons'}>
                <button className={'buttonPrevious'} onClick={ () => {
                    this.previousButton();
                }} ><i className="left"></i>  previous </button>
                <button className={'buttonNext'} onClick={ () => {
                    this.nextButton();
                }} > next  <i className="right"></i> </button>
            </div>

        </div>
        );
    }
}

class User extends React.Component {
    render() {
        return (
            <div>
            	<p className={'loadingText'} style={{ display: (this.props.loading) ? 'block' : 'none' }}>Loading...</p>
                <img style={{ display: (this.props.imageload) ? 'block' : 'none' }} src={this.props.user.avatar_url}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);