import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors, SearchBar} from 'react-native-elements';
import Theme from '../style/theme.style';

export default class App extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                placeholder="Enter a building name..."
                onChangeText={this.updateSearch}
                value={search}
                inputContainerStyle={{backgroundColor: 'white'}}
                containerStyle={{backgroundColor: colors.grey4, borderWidth: 0, borderBottomColor: colors.grey4, borderTopColor: colors.grey4}}
            />
        );
    }
}
