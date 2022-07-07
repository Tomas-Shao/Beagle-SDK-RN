import React from 'react';
import {Button, Platform, Text} from 'react-native';
import WalletConnectProvider, {useWalletConnect} from '@walletconnect/react-native-dapp';

function WalletConnectPage({navigation}) {

    const connector = useWalletConnect();

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
            // storage={{
            //     asyncStorage: AsyncStorage,
            // }}
            renderQrcodeModal={props => {
                console.log(props);
                return Text(props.uri);
            }
            }>

            <Text>"xxx"</Text>

        </WalletConnectProvider>
    );
}

export default WalletConnectPage;