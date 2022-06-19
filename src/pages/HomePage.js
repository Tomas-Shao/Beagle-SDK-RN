import React, {useState} from 'react';
import {Button, Text, useColorScheme, View, StyleSheet, SafeAreaView, TextInput, Keyboard} from 'react-native';
import Web3 from 'web3';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const NameHash = require('eth-ens-namehash');

function HomePage({navigation}) {
    const [chainId, setChainId] = useState('null');
    const [owner, setOwner] = useState('');
    const [value, onChangeText] = React.useState('');
    const [record, setRecord] = useState('null')

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

    function fetchTextRecords() {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383"));
        let contract = new web3.eth.Contract([
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "interfaceID",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "setDNSRecords",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "key",
                        "type": "string"
                    },
                    {
                        "name": "value",
                        "type": "string"
                    }
                ],
                "name": "setText",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "interfaceID",
                        "type": "bytes4"
                    }
                ],
                "name": "interfaceImplementer",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "contentTypes",
                        "type": "uint256"
                    }
                ],
                "name": "ABI",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "x",
                        "type": "bytes32"
                    },
                    {
                        "name": "y",
                        "type": "bytes32"
                    }
                ],
                "name": "setPubkey",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "hash",
                        "type": "bytes"
                    }
                ],
                "name": "setContenthash",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    }
                ],
                "name": "addr",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "name",
                        "type": "bytes32"
                    }
                ],
                "name": "hasDNSRecords",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "key",
                        "type": "string"
                    }
                ],
                "name": "text",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "contentType",
                        "type": "uint256"
                    },
                    {
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "setABI",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    }
                ],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "setName",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "coinType",
                        "type": "uint256"
                    },
                    {
                        "name": "a",
                        "type": "bytes"
                    }
                ],
                "name": "setAddr",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "name",
                        "type": "bytes32"
                    },
                    {
                        "name": "resource",
                        "type": "uint16"
                    }
                ],
                "name": "dnsRecord",
                "outputs": [
                    {
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    }
                ],
                "name": "clearDNSZone",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    }
                ],
                "name": "contenthash",
                "outputs": [
                    {
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    }
                ],
                "name": "pubkey",
                "outputs": [
                    {
                        "name": "x",
                        "type": "bytes32"
                    },
                    {
                        "name": "y",
                        "type": "bytes32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "a",
                        "type": "address"
                    }
                ],
                "name": "setAddr",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "interfaceID",
                        "type": "bytes4"
                    },
                    {
                        "name": "implementer",
                        "type": "address"
                    }
                ],
                "name": "setInterface",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "coinType",
                        "type": "uint256"
                    }
                ],
                "name": "addr",
                "outputs": [
                    {
                        "name": "",
                        "type": "bytes"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    },
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "authorisations",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_ens",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "target",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "isAuthorised",
                        "type": "bool"
                    }
                ],
                "name": "AuthorisationChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "name": "indexedKey",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "key",
                        "type": "string"
                    }
                ],
                "name": "TextChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "x",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "y",
                        "type": "bytes32"
                    }
                ],
                "name": "PubkeyChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "NameChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "name": "interfaceID",
                        "type": "bytes4"
                    },
                    {
                        "indexed": false,
                        "name": "implementer",
                        "type": "address"
                    }
                ],
                "name": "InterfaceChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "bytes"
                    },
                    {
                        "indexed": false,
                        "name": "resource",
                        "type": "uint16"
                    },
                    {
                        "indexed": false,
                        "name": "record",
                        "type": "bytes"
                    }
                ],
                "name": "DNSRecordChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "name",
                        "type": "bytes"
                    },
                    {
                        "indexed": false,
                        "name": "resource",
                        "type": "uint16"
                    }
                ],
                "name": "DNSRecordDeleted",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    }
                ],
                "name": "DNSZoneCleared",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "hash",
                        "type": "bytes"
                    }
                ],
                "name": "ContenthashChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "a",
                        "type": "address"
                    }
                ],
                "name": "AddrChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "coinType",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "newAddress",
                        "type": "bytes"
                    }
                ],
                "name": "AddressChanged",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "name": "contentType",
                        "type": "uint256"
                    }
                ],
                "name": "ABIChanged",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "node",
                        "type": "bytes32"
                    },
                    {
                        "name": "target",
                        "type": "address"
                    },
                    {
                        "name": "isAuthorised",
                        "type": "bool"
                    }
                ],
                "name": "setAuthorisation",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "data",
                        "type": "bytes[]"
                    }
                ],
                "name": "multicall",
                "outputs": [
                    {
                        "name": "results",
                        "type": "bytes[]"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ], '0xf6305c19e814d2a75429Fd637d01F7ee0E77d615');
        contract.methods.text(NameHash.hash('111.beagle.eth'), 'carrierId').call().then((value) => {
            console.log('Get TextRecord:', value);
            setRecord(value)
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

                <Section title="Get TextRecord">
                    Click <Button title="HERE" onPress={fetchTextRecords}></Button> TextRecords <Text
                    style={styles.highlight}>{record}</Text>
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
