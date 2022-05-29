import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Keyboard, Button} from 'react-native';
import Web3 from 'web3';
import NameHash from 'eth-ens-namehash';

function DetailsScreen({navigation}) {

    const [owner, setOwner] = useState('');
    const [ens, setEns] = useState('');

    function fetchOwner2() {
        Keyboard.dismiss();
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
        contract.methods.owner(NameHash.hash(ens + '.beagles.eth')).call().then((value) => {
            console.log('Get Owner:', value);
            setOwner(value);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <View style={{padding: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TextInput style={{borderBottomWidth: StyleSheet.hairlineWidth, flex: 2, height: 40}}
                           placeholder="请输入您的ENS名字" value={ens} onChangeText={(text) => setEns(text)}>
                </TextInput>
                <View style={{borderRightWidth: StyleSheet.hairlineWidth, height: 20}}></View>
                <Text style={{padding: 4, flex: 1}}> .beagles.eth</Text>
            </View>
            <Button title={'查询'} color="green" onPress={fetchOwner2}></Button>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, paddingTop: 10}}></View>
            <View style={{paddingTop: 10}}>
                <Text style={{fontSize: 20, paddingBottom: 10, fontWeight: 'bold'}}>
                    钱包地址:
                </Text>
                <Text>
                    {owner}
                </Text>
            </View>
        </View>
    );
}

export default DetailsScreen;
