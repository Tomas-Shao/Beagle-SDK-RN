import React, {useState} from 'react';
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

    const [chainId, setChainId] = useState('null');

    function getChainId() {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        console.log('get chainID');
        web3.eth.getChainId().then((value) => {
            console.log('ChainID:', value);
            setChainId(value);
        });
    }

    function fetchOwner() {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        let contract = new web3.eth.Contract([
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'indexed': true,
                        'name': 'label',
                        'type': 'bytes32',
                    },
                    {
                        'indexed': false,
                        'name': 'owner',
                        'type': 'address',
                    },
                ],
                'name': 'NewOwner',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'indexed': false,
                        'name': 'owner',
                        'type': 'address',
                    },
                ],
                'name': 'Transfer',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'indexed': false,
                        'name': 'resolver',
                        'type': 'address',
                    },
                ],
                'name': 'NewResolver',
                'type': 'event',
            },
            {
                'anonymous': false,
                'inputs': [
                    {
                        'indexed': true,
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'indexed': false,
                        'name': 'ttl',
                        'type': 'uint64',
                    },
                ],
                'name': 'NewTTL',
                'type': 'event',
            },
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'name': 'label',
                        'type': 'bytes32',
                    },
                    {
                        'name': 'owner',
                        'type': 'address',
                    },
                ],
                'name': 'setSubnodeOwner',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'name': 'resolver',
                        'type': 'address',
                    },
                ],
                'name': 'setResolver',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'name': 'owner',
                        'type': 'address',
                    },
                ],
                'name': 'setOwner',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'constant': false,
                'inputs': [
                    {
                        'name': 'node',
                        'type': 'bytes32',
                    },
                    {
                        'name': 'ttl',
                        'type': 'uint64',
                    },
                ],
                'name': 'setTTL',
                'outputs': [],
                'payable': false,
                'stateMutability': 'nonpayable',
                'type': 'function',
            },
            {
                'constant': true,
                'inputs': [
                    {
                        'name': 'node',
                        'type': 'bytes32',
                    },
                ],
                'name': 'owner',
                'outputs': [
                    {
                        'name': '',
                        'type': 'address',
                    },
                ],
                'payable': false,
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'constant': true,
                'inputs': [
                    {
                        'name': 'node',
                        'type': 'bytes32',
                    },
                ],
                'name': 'resolver',
                'outputs': [
                    {
                        'name': '',
                        'type': 'address',
                    },
                ],
                'payable': false,
                'stateMutability': 'view',
                'type': 'function',
            },
            {
                'constant': true,
                'inputs': [
                    {
                        'name': 'node',
                        'type': 'bytes32',
                    },
                ],
                'name': 'ttl',
                'outputs': [
                    {
                        'name': '',
                        'type': 'uint64',
                    },
                ],
                'payable': false,
                'stateMutability': 'view',
                'type': 'function',
            },
        ], '0x98325eDBE53119bB4A5ab7Aa35AA4621f49641E6');

        console.log(contract.methods)
        contract.methods.owner('0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2').call().then((value) => {
            console.log("Get Owner:", value)
        })
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                Detail Screen
            </Text>
            <Button title="Go to Detail page" onPress={() => navigation.navigate('Detail')}></Button>
            <Button title="getLatestBlock" onPress={getLatestBlock}></Button>
            <Button title="Get chainID" onPress={getChainId}></Button>
            <Text>{chainId}</Text>
            <Button title="Fetch owner" onPress={fetchOwner}></Button>
        </View>
    );
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
