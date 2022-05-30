import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '../app/counterSlice';
import {Button, Text, View} from 'react-native';

export function CounterPage() {

    const count = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

    return (
        <View>
            <View>
                <Button title="Increment value" onPress={() => dispatch(increment())}>
                    Increment
                </Button>
                <Text>{count}</Text>
                <Button title="Decrement value" onPress={() => dispatch(decrement())}>
                    Decrement value
                </Button>
            </View>
        </View>
    );
}
