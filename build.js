'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            numberActiveUser: 0,
            activeUser: [],
            users: ['gaearon', 'acdlite', 'yyx990803', 'unclebob', 'martinfowler'],
            loading: false,
            imageShow: true
        };
        return _this;
    }

    _createClass(App, [{
        key: 'getResponse',
        value: function getResponse(userx) {
            var _this2 = this;

            this.setState({ imageShow: false, loading: true });
            var url = 'https://api.github.com/users/' + userx;
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                return _this2.setState({ activeUser: responseJson, loading: false, imageShow: true });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getResponse('gaearon');
        }
    }, {
        key: 'changeImageLeft',
        value: function changeImageLeft() {
            var prevIndex = this.state.numberActiveUser - 1;
            if (prevIndex < 0) {
                prevIndex = 4;
            }
            this.setState({ numberActiveUser: prevIndex });
            this.getResponse(this.state.users[prevIndex]);
        }
    }, {
        key: 'changeImageRight',
        value: function changeImageRight() {
            var nextIndex = this.state.numberActiveUser + 1;
            if (nextIndex > 4) {
                nextIndex = 0;
            }
            this.setState({ numberActiveUser: nextIndex });
            this.getResponse(this.state.users[nextIndex]);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(User, { user: this.state.activeUser, loading: this.state.loading, imageShow: this.state.imageShow }),
                React.createElement(
                    'div',
                    { className: 'buttons' },
                    React.createElement(
                        'button',
                        { className: 'buttonPrevious', onClick: function onClick() {
                                _this3.changeImageLeft();
                            } },
                        React.createElement('i', { className: 'left' }),
                        ' previous'
                    ),
                    React.createElement(
                        'button',
                        { className: 'buttonNext', onClick: function onClick() {
                                _this3.changeImageRight();
                            } },
                        'next ',
                        React.createElement('i', { className: 'right' })
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

var User = function (_React$Component2) {
    _inherits(User, _React$Component2);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'p',
                    { className: 'loadingText', style: { display: this.props.loading ? 'block' : 'none' } },
                    'Loading...'
                ),
                React.createElement('img', { style: { display: this.props.imageShow ? 'block' : 'none' }, src: this.props.user.avatar_url })
            );
        }
    }]);

    return User;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
