import React from 'react';
import {Button, Text, View} from 'react-native';
import Web3 from 'web3';

function HomePage({navigation}) {
    // React.useEffect(() => {
    //     console.log('use effect in home page');
    //     web3.eth.getChainId().then(r => {
    //         console.log('get chainID in the then: ', r);
    //     });
    //     return () => {
    //         console.log('clean up for use effect');
    //     };
    // })

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                Detail Screen
            </Text>
            <Button title="Go to Detail page" onPress={() => navigation.navigate('Detail')}></Button>
            <Button title="getLatestBlock" onPress={getLatestBlock}></Button>
            <Button title="Get chainID" onPress={getChainId}></Button>

        </View>
    );
}

function getChainId() {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
    console.log('get chainID');
    web3.eth.getChainId().then((value) => {
        console.log('ChainID:', value);
    });
}

function getLatestBlock() {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
    console.log('getLatestBlock begin ============================');
    web3.eth.getBlock('latest').then(function (value) {
        console.log('===================1=================');
        console.log(value);
        console.log('===================2=================');
        console.debug('value: ', value.transactions);
        console.log('===================3=================');
    }).catch(error => console.log(error));
    console.log('getLatestBlock done ============================');
}

export default HomePage;
