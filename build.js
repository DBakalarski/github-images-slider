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
            numberUser: 0,
            activeUser: [],
            user: ['gaearon', 'acdlite', 'yyx990803', 'unclebob', 'martinfowler'],
            loading: false,
            imageload: true
        };
        return _this;
    }

    _createClass(App, [{
        key: 'getResponse',
        value: function getResponse(userx) {
            var _this2 = this;

            this.setState({ imageload: false, loading: true });
            var url = 'https://api.github.com/users/' + userx;
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                return _this2.setState({ activeUser: responseJson, loading: false, imageload: true });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getResponse('gaearon');
        }
    }, {
        key: 'previousButton',
        value: function previousButton() {
            var prevIndex = this.state.numberUser - 1;
            if (prevIndex < 0) {
                prevIndex = 4;
            }
            this.setState({ numberUser: prevIndex });
            this.getResponse(this.state.user[prevIndex]);
        }
    }, {
        key: 'nextButton',
        value: function nextButton() {
            var nextIndex = this.state.numberUser + 1;
            if (nextIndex > 4) {
                nextIndex = 0;
            }
            this.setState({ numberUser: nextIndex });
            this.getResponse(this.state.user[nextIndex]);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                console.log("active state: " + this.state.numberUser),
                React.createElement(User, { user: this.state.activeUser, loading: this.state.loading, imageload: this.state.imageload }),
                React.createElement(
                    'div',
                    { className: 'buttons' },
                    React.createElement(
                        'button',
                        { className: 'buttonPrevious', onClick: function onClick() {
                                _this3.previousButton();
                            } },
                        React.createElement('i', { className: 'left' }),
                        '  previous '
                    ),
                    React.createElement(
                        'button',
                        { className: 'buttonNext', onClick: function onClick() {
                                _this3.nextButton();
                            } },
                        ' next  ',
                        React.createElement('i', { className: 'right' }),
                        ' '
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
                React.createElement('img', { style: { display: this.props.imageload ? 'block' : 'none' }, src: this.props.user.avatar_url })
            );
        }
    }]);

    return User;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
