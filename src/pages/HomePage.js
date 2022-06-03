import React, {useState} from 'react';
import {Button, Text, useColorScheme, View, StyleSheet, SafeAreaView, TextInput, Keyboard} from 'react-native';
import Web3 from 'web3';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const NameHash = require('eth-ens-namehash');

function HomePage({navigation}) {
    const [chainId, setChainId] = useState('null');
    const [owner, setOwner] = useState('');
    const [value, onChangeText] = React.useState('');

    function getChainId() {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        console.log('get chainID');
        web3.eth.getChainId().then((value) => {
            console.log('ChainID:', value);
            setChainId(value);
        }).catch((error) => {
            console.error(error)
        });
    }

    function fetchOwner() {
        Keyboard.dismiss()
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
        contract.methods.owner(NameHash.hash(value)).call().then((value) => {
            console.log('Get Owner:', value);
            setOwner(value);
        }).catch ((error) => {
            console.error(error)
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

    return (
        <SafeAreaView>
            <View>
                <Button title="Go to Detail page" onPress={() => navigation.navigate('Detail')}></Button>
                <Button title="getLatestBlock" onPress={getLatestBlock}></Button>
                <Section title="Get ChainId">
                    Click <Button title="HERE" onPress={getChainId}></Button> to fetch chain id <Text
                    style={styles.highlight}>{chainId}</Text>
                </Section>

                <View style={[styles.row]}>
                    <Text style={[styles.sectionTitle, Colors.black]}>
                        Fetch Owner:
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Button title="查询" onPress={fetchOwner}></Button>
                        <TextInput style={{
                            backgroundColor: 'white',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            padding: 6,
                            borderRadius: 4,
                            flex: 1,
                        }}
                                   placeholder="Input subdomain Placeholder" value={value}
                                   onChangeText={text => onChangeText(text)}>
                        </TextInput>
                    </View>
                    <Text style={[styles.sectionDescription, Colors.dark]}>
                        结果: {owner}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    row: {
        padding: 14,
        margin: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderLeftWidth: StyleSheet.hairlineWidth,
    },
});

const Section = ({children, title}): Node => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={[styles.row]}>
            <Text style={[styles.sectionTitle, {color: isDarkMode ? Colors.white : Colors.black}]}>
                {title}
            </Text>
            <Text style={[styles.sectionDescription, {color: isDarkMode ? Colors.light : Colors.dark}]}>
                {children}
            </Text>
        </View>
    );
};

export default HomePage;
