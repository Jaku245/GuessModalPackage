# GuessModal Package
A library of React components created using `create-react-app`. It contains a modal which can be used by any project by just importing.

It shows any random pokemon at the start and after that you can guess what this pokemon is or you can guess another random pokemon or random pokemon with the same type.
## Installation and Set-up
Run the following command in your terminal : `npm i guess-modal-lib`.

After installing, you have two import two styling files in index.js (please maintain the order of this two imports for better UI)

index.js
```javascript
.
.
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
.
.
```
## How to use
Create one state variable for component visibility and function to toggle modal.
Pass this visibility variable and function into the component props.

Also use this component at the end of file as it is a modal.

Here is one code example.

```javascript
import React, { Component } from 'react';
import { GuessModal } from 'guess-modal-lib';

export default class Example extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    toggleModal = async () => {
        await this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <>
                <button onClick={this.toggleModal} >Guess pokemon</button>
                <GuessModal showModal={this.state.showModal} toggleModal={this.toggleModal} />
            </>
        )
    }
}
```

## Examples
Starting screen will look like this :

![start](/samples/start.png)

You can see error when you try to check answer wih out typing anything :

![error](/samples/error.png)

Animation for correct guess will be shown like this :

![correct](/samples/correct.png)

Animation for wrong guess will be shown like this :

![wrong](/samples/wrong.png)

On clicking guess related pokemon, same type pokemon will be shown :

![same](/samples/same.png)

On clicking guess random pokemon, any random pokemon will be shown :

![random](/samples/random.png)


Happy Using!!!