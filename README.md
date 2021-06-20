# GuessModal Package
A library of React components created using `create-react-app`. It contains a modal which can be used by any project by just importing.
## Installation
Run the following command in your terminal : 
`npm install guess-modal-lib`
## How to use
After importing, create one state variable for component visibility and function to toggle modal.
Pass this visibility variable and function into components props.

Also use this component at the end of file a it is a modal.

Here is one code example.

```javascript
import React, { Component } from 'react';
import { Button } from 'shards-react';
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
                <Button size="lg" theme="dark" pill className="guess-btn" onClick={this.toggleModal} >Guess pokemon</Button>
                <GuessModal showModal={this.state.showModal} toggleModal={this.toggleModal} />
            </>
        )
    }
}
```