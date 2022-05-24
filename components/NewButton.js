import React from 'react';
import {Component} from 'react';
import Web3 from 'web3';
import {Text} from 'react-native';

class NewButton extends Component {
    async componentDidMount() {
        const web3 = new Web3(
            new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'),
        );
        console.log('WEB3 ============================');
        web3.eth.getBlock('latest').then(function (value) {
            console.log(value);
        }).catch(error => console.log(error));
        console.log('WEB3 ============================');

        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        console.log('WEB4 ============================');
    }

    render() {
        return <Text>Hello World 444422</Text>;
    }
}

export default NewButton;
