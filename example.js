const EventEmitter = require('./index.js');

let eventEmitter = new EventEmitter();

let respond = () => {
  console.log('hello back');
}

eventEmitter.on('HELLO', respond);

console.log('HELLO');
eventEmitter.emit('HELLO');

eventEmitter.removeListener('HELLO', respond);

console.log('HELLO');
eventEmitter.emit('HELLO');

class Store extends EventEmitter {

  constructor(getList) {
    super();
    this.state = {
      page: 0,
      data: [],
      isFetching: false,
      isError: false,
    }
    this.getList = getList;
    this._setState = this._setState.bind(this);
  }

  getState() {
    return this.state;
  }

  _setState(changes) {
    this.state = {
      ...this.state,
      ...changes,
    }
    this.emit('CHANGE');
  }

  fetch(params) {
    let _this = this;
    this.setState({
      isFetching: true
    });
    let response = this.getList(params);
    // .then((response) => {
    _this.setState({ 
      data: response,
      isFetching: false
    });
  }

}

const userStore = new Store(() => {
  return 'hello'
});

userStore.on('CHANGE', () => {
  console.log(userStore.getState());
})

userStore.fetch();
