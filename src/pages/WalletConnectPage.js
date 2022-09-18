import React from 'react';
import {Button, View} from 'react-native';
import {useWalletConnect, withWalletConnect} from '@walletconnect/react-native-dapp';

function WalletConnectPage({navigation}) {

    const connector = useWalletConnect();

    const renderButtonWalletConnectAuth = () => {
        if (!connector.connected) {
            return <Button title={"Connect"} onPress={() => connector.connect()}></Button>
        } else {
            return <Button title={"Kill Session"} onPress={() => connector.killSession()}></Button>
        }
    }

    return (
        <View>{renderButtonWalletConnectAuth()}</View>
    )
}

export default WalletConnectPage;
