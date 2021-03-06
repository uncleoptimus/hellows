/*
project: hellows
file: index.js
author: Andrew Roy Chen
last update: oct 3 2015
*/
import Firebase from 'firebase';
var Backbone = require('backfire');
import React from 'react.backbone'; // includes react


class Notepad extends React.Component {

    makeNewCard() {
      cardstack.add({
        phrase: document.querySelector('#phrase').value,
        origin: document.querySelector('#origin').value
      });
      document.querySelector('#phrase').value = '';
      document.querySelector('#origin').value = '';
    }

    render() {
      return (
        <div className="notepad paper-bg paper">
          <h2>rulez:</h2>
          <ul className="notepad__rules">
            <li>~40 letters above & below</li>
            <li> <strong>be kind :)</strong></li>
          </ul>
          <p className="notepad__section">
            <label>greetings:</label>
            <input id="phrase" type="text" name="phrase"
            placeholder="greetings!" required maxlength="40" />
          </p>
          <p className="notepad__section">
            <label>from:</label>
            <input id="origin" type="text" name="origin"
            placeholder="a friend" required maxlength="30"/>
          </p>
          <button onClick={this.makeNewCard}>POST!</button>
        </div>
      );
    }
}

class Card extends React.Component {

    trashCard() {
      this.props.removeCard(this.props.model);
    }


    render() {
        let model = this.props.model;
        return (
          <div>
            <a href="#" className="card-pin" onClick={this.trashCard.bind(this)}>
              <span className="card-pin__remove">X</span>
            </a>
            <div className="welcome-card paper-bg paper">
                <p>
                  <span className="welcome-phrase">{model.attributes.phrase}</span>
                </p>
                from <span className="welcome-origin">{model.attributes.origin}</span>
            </div>
          </div>
        );
    }
}

// class Container extends React.Component {
var Container = React.createBackboneClass ({

    removeCard(model) {
        event.preventDefault();
        console.dir(model);
        this.getCollection().remove(model);
        console.log('remove triggered.');
    },

    render() {
        let all_cards = this.getCollection().map(card => {
          // return <Card data={card.attributes} removeCard={this.removeCard} />;
          return <Card model={card} removeCard={this.removeCard} />;
        });
        return (
          <div>
            <Notepad />
            <div className="card-board">{all_cards}</div>
          </div>
        );
    }
});


// define the Card model
// two properties: phrase and origin (both strings)
var CardData = Backbone.Model.extend({
  defaults: {
    phrase: 'Hi!',
    origin: 'Friendly Stranger'
  }
});

// instantiate the collection and seed with data
var CardStack = Backbone.Firebase.Collection.extend({
  model: CardData,
  url: 'https://hellows.firebaseio.com/',
});
var cardstack = new CardStack();


React.render(<Container collection={cardstack} />, document.querySelector('.container'));
