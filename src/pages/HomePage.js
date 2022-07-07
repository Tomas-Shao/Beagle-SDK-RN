import React, {useState} from 'react';
import {Button, Text, useColorScheme, View, StyleSheet, SafeAreaView, TextInput, Keyboard} from 'react-native';
import Web3 from 'web3';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as PublicResolver from '.././resources/JSON/PublicResolver.json';
import * as ReverseRegistrar from '.././resources/JSON/ReverseRegistrar.json';

const NameHash = require('eth-ens-namehash');

function HomePage({navigation}) {
    const [chainId, setChainId] = useState('null');
    const [owner, setOwner] = useState('');
    const [value, onChangeText] = React.useState('');
    const [record, setRecord] = useState('null');

    function getChainId() {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        console.log('get chainID');
        web3.eth.getChainId().then((value) => {
            console.log('ChainID:', value);
            setChainId(value);
        }).catch((error) => {
            console.error('Fetch ChainID with error:', error);
        });
    }

    function fetchOwner() {
        Keyboard.dismiss();
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        let contract = new web3.eth.Contract(ReverseRegistrar.abi, '0x98325eDBE53119bB4A5ab7Aa35AA4621f49641E6');
        contract.methods.owner(NameHash.hash(value)).call().then((value) => {
            console.log('Get Owner:', value);
            setOwner(value);
        }).catch((error) => {
            console.error('Get owner with error:', error);
        });
    }

    function fetchTextRecords() {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        let contract = new web3.eth.Contract(PublicResolver.abi, '0xf6305c19e814d2a75429Fd637d01F7ee0E77d615');
        contract.methods.text(NameHash.hash('111.beagle.eth'), 'carrierId').call().then((value) => {
            console.log('Get TextRecord:', value);
            setRecord(value);
        }).catch((error) => {
            console.error('Fetch text records with error:', error);
        });
    }

    function getLatestBlock() {
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        web3.eth.getBlock('latest').then(function (value) {
            console.log('Get LatestBlock:', value);
        }).catch(error => {
            console.error('Get Latest Block with error: ', error);
        });
    }

    return (
        <SafeAreaView>
            <View>
                <Button title="Go to Detail page" onPress={() => navigation.navigate('Detail')}></Button>
                <Button title="Go to Wallet page" onPress={() => navigation.navigate('Wallet')}></Button>
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
