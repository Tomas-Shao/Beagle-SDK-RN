import React from 'react';
import {AsyncStorage, Button, Platform, Text} from 'react-native';
import WalletConnectProvider, {useWalletConnect} from '@walletconnect/react-native-dapp';

function WalletConnectPage({navigation}) {

    const connector = useWalletConnect();

    if (connector.connected) {
        // connected
    } else {
        return <Button title="Connect" onPress={() => connector.connect()}/>;
    }

    return (
        <WalletConnectProvider
            bridge="https://bridge.walletconnect.org"
            clientMeta={{
                description: 'Connect with WalletConnect',
                url: 'https://walletconnect.org',
                icons: ['https://walletconnect.org/walletconnect-logo.png'],
                name: 'WalletConnect',
            }}
            redirectUrl={Platform.OS === 'Web' ? window.location.origin : 'beagle://'}
            storage={{
                asyncStorage: AsyncStorage,
            }}
            renderQrcodeModal={props => {
                console.log(props);
                return Text(props.uri);
            }
            }>

        </WalletConnectProvider>
    );
}

export default WalletConnectPage;