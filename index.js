
class EventEmitter {

  constructor() {
    this.listeners = {};
  }
    
  on(eventName, callback) {
    if (!this.listeners.eventName) {
      this.listeners = {
        ...this.listeners,
        [eventName]: [],
      }
    }
    if (this.listeners[eventName].findIndex(callback) === -1) {
      this.listeners[eventName].push(callback);
    }
    return this;
  }
    
  addListener(eventName, callback) {
    this.on(eventName, callback)
  }
    
  removeListener(eventName, callback) {
    this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback);
    return this;
  }
    
  emit(eventName) {
    this.listeners[eventName].forEach(callback => {
      callback();
    });
  } 

}

module.exports = EventEmitter;