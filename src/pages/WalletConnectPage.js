import React from 'react';
import {Button, Platform, Text} from 'react-native';
import WalletConnectProvider, {QrcodeModal, useWalletConnect} from '@walletconnect/react-native-dapp';
import WalletConnect from '@walletconnect/client';

function WalletConnectPage({navigation}) {

    // const connector = new WalletConnect({
    //     bridge: "https://bridge.walletconnect.org",
    //     qrcodeModal: QrcodeModal,
    // })
    //
    // if (!connector.connected) {
    //     console.log("begin to connect")
    //     connector.createSession().then(r =>
    //         console.log(r)
    //     );
    // }
    //
    // connector.on("connect", (error, payload) => {
    //     console.log("[Connect]: payload: " + payload + "error" + error)
    //     if (error) {
    //         throw error
    //     }
    //     // Get provided accounts and chainId
    //     const { account, chainId} = payload.params[0]
    // })
    //
    // connector.on("session_update", (error, payload) => {
    //     console.log("[Session_update]: payload: " + payload + "error" + error)
    //     if (error) {
    //         throw error
    //     }
    //     // Get updated accounts and chainId
    //     const { account, chainId} = payload.params[0]
    // })
    //
    // connector.on("disconnected", (error, payload) => {
    //     console.log("[Disconnected]: payload: " + payload + "error" + error)
    //     if (error) {
    //         throw error
    //     }
    // })

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
