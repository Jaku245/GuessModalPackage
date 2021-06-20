# GuessModal Package
A library of React components created using `create-react-app`. It contains a modal which can be used by any project by just importing.

It shows any random pokemon at the start and after that you can guess what this pokemon is or you can guess another random pokemon or random pokemon with the same type.
## Installation
Run the following command in your terminal : `npm install guess-modal-lib`
## How to use
After importing, create one state variable for component visibility and function to toggle modal.
Pass this visibility variable and function into the component props.

Also use this component at the end of file as it is a modal.

Here is one code example.

```javascript
import React, { Component } from 'react';
import { GuessModal } from 'guess-modal';

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