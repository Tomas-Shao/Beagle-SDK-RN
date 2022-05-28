import React, {useState} from 'react';
import {Button, Text, useColorScheme, View, StyleSheet} from 'react-native';
import Web3 from 'web3';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function HomePage({navigation}) {
    const [chainId, setChainId] = useState('null');
    const [owner, setOwner] = useState('');

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

        console.log(contract.methods);
        contract.methods.owner('0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2').call().then((value) => {
            console.log('Get Owner:', value);
            setOwner(value);
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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>
                Detail Screen
            </Text>
            <Button title="Go to Detail page" onPress={() => navigation.navigate('Detail')}></Button>
            <Button title="getLatestBlock" onPress={getLatestBlock}></Button>
            <Section title="Get ChainId">
                Click <Button title="HERE" onPress={getChainId}></Button> to fetch chain id <Text style={styles.highlight}>{chainId}</Text>
            </Section>
            <Section title="Fetch Owner: addr.reverse">
                Click <Button title="HERE" onPress={fetchOwner}></Button> to fetch owner <Text style={styles.highlight}>{owner}</Text>
            </Section>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        alignSelf: 'flex-start',
    },
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
});

const Section = ({children, title}): Node => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
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
