import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  onReceive = null;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAiuvZgc9iLMezprc5zYLBw9PsrgRkXjrE',
        authDomain: 'meetupchat-dbce1.firebaseapp.com',
        databaseURL: 'https://meetupchat-dbce1.firebaseio.com',
        storageBucket: 'meetupchat-dbce1.appspot.com',
      });
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });
  }

  setUid(value) {
    this.uid = value;
  }

  getUid() {
    return this.uid;
  }

  loadMessages(callback) {
    this.closeChat();
    this.messagesRef = firebase.database().ref('messages');
    this.onReceive = (data) => {
      const message = data.val();
      if (!message || typeof message.text !== 'string' || !message.text.trim()) {
        return;
      }
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', this.onReceive);
  }

  sendMessage(message) {
    if (!this.messagesRef || !message || !message.length) {
      return;
    }
    for (let i = 0; i < message.length; i++) {
      const text = (message[i].text || '').trim();
      if (!text) {
        continue;
      }
      this.messagesRef.push({
        text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }

  closeChat() {
    if (this.messagesRef && this.onReceive) {
      this.messagesRef.off('child_added', this.onReceive);
    }
    this.onReceive = null;
  }
}

export default new Backend();
