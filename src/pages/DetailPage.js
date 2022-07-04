import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet, Keyboard, Button} from 'react-native';
import Web3 from 'web3';
import NameHash from 'eth-ens-namehash';
import * as ENS from '.././resources/JSON/ENS.json'

function DetailPage({navigation}) {

    const [owner, setOwner] = useState('');
    const [ens, setEns] = useState('');

    function fetchOwner2() {
        Keyboard.dismiss();
        const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/84ae00fec54f4d65bd1c0505b0e96383'));
        let contract = new web3.eth.Contract(ENS.abi, '0x98325eDBE53119bB4A5ab7Aa35AA4621f49641E6');
        contract.methods.owner(NameHash.hash(ens + '.beagles.eth')).call().then((value) => {
            console.log('Get Owner:', value);
            setOwner(value);
        }).catch((error) => {
            console.error(error);
        });
    }

    function walletWidget() {
        if (owner === '') {
            return null;
        }
        return (
            <View style={{paddingTop: 10}}>
                <Text style={{fontSize: 20, paddingBottom: 10, fontWeight: 'bold'}}>
                    钱包地址:
                </Text>
                <Text>
                    {owner}
                </Text>
            </View>
        );
    }

    return (
        <View style={{padding: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20}}>
                <TextInput style={{borderBottomWidth: StyleSheet.hairlineWidth, flex: 2, height: 40}}
                           placeholder="请输入您的ENS名字" value={ens} onChangeText={(text) => setEns(text)}>
                </TextInput>
                <View style={{borderRightWidth: StyleSheet.hairlineWidth, height: 20}}></View>
                <Text style={{padding: 4, flex: 1}}> .beagles.eth</Text>
            </View>
            <View style={[styles.button]}>
                <Button title={'查询'} color="green" onPress={fetchOwner2}></Button>
            </View>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, paddingTop: 20}}></View>
            {walletWidget()}
            <Button title="Go to Counter" onPress={() => navigation.navigate('Counter')}></Button>
        </View>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: 'pink',
        borderRadius: 4,
    },
});

export default DetailPage;
