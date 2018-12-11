class App extends React.Component {
    constructor() {
        super();
        this.state = {
            numberActiveUser: 0,
            activeUser: [],
            users: ['gaearon', 'acdlite', 'yyx990803', 'unclebob', 'martinfowler'],
            loading: false,
            imageShow: true
        };
    }

    changeImage(userx) {
        this.setState({imageShow:false, loading: true})
        const url = `https://api.github.com/users/${userx}`;
        fetch(url)
        .then(response => response.json())
        .then(responseJson => this.setState({activeUser: responseJson, loading: false, imageShow:true}))
    }
    componentDidMount() {
        this.changeImage('gaearon')
    }
    changeImageLeft(){
        let prevIndex = this.state.numberActiveUser - 1;
        if (prevIndex< 0) {
          prevIndex = 4;
        }
        this.setState({ numberActiveUser: prevIndex });
        this.changeImage(this.state.users[prevIndex]);
    }
    changeImageRight() {
        let nextIndex = this.state.numberActiveUser + 1;
        if (nextIndex> 4) {
          nextIndex = 0;
        }
        this.setState({ numberActiveUser: nextIndex });
        this.changeImage(this.state.users[nextIndex]);
    }
    render() {
        return (
        <div>
            <User  user={this.state.activeUser} loading={this.state.loading} imageShow={this.state.imageShow}/>
            <div className={'buttons'}>
                <button className={'buttonPrevious'} onClick={ () => {this.changeImageLeft()}} > 
                <i className="left"></i> previous
                </button>
                <button className={'buttonNext'} onClick={ () => {this.changeImageRight()}}>
                    next <i className="right"></i> 
                </button>
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
                <img style={{ display: (this.props.imageShow) ? 'block' : 'none' }} src={this.props.user.avatar_url}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);