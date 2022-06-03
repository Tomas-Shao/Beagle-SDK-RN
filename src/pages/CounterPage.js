import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, View} from 'react-native';
import {asyncIncrement, decrement, increment} from '../slices/countSlice';

export function CounterPage() {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const count = useSelector(state => state.counter);

    return (
        <View>
            <View>
                <Button title="Increment value" onPress={() => dispatch(increment({step: 1}))}>
                </Button>
                <Text>{count.count}</Text>
                <Button title="Decrement value" onPress={() => dispatch(decrement({step: 3}))}>
                </Button>
                <Button title={'Async Increment 1'} onPress={() => dispatch(asyncIncrement({step: 1}))}>
                </Button>
                <Text>{posts[1].title}</Text>
            </View>
        </View>
    );
}
