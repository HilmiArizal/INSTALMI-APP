import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { getHomeListPost } from '../actions';
import PostCard from './PostCard';

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    }
})

class Home extends Component {
    componentDidMount() {
        this.props.getHomeListPost()
    }

    render() {
        const { containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <Header
                    leftComponent={{
                        text: 'INSTALMI',
                        style: { color: 'black', fontSize: 18, fontWeight: '700' }
                    }}
                    leftContainerStyle={{ flex: 3 }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : -25,
                        elevation: 2
                    }}
                />
                <FlatList
                    data={this.props.homeListPost}
                    renderItem={({ item }) => <PostCard post={item} />}
                    keyExtractor={item => item.id.toString()}
                    style={{ width: '95%' }}
                    onRefresh={() => this.props.getHomeListPost()}
                    refreshing={this.props.loading}
                />
            </View>
        );
    }
}

const mapStatetoProps = ({ homeListPost }) => {
    return {
        homeListPost: homeListPost.listPost,
        loading: homeListPost.loading
    }
}

export default connect(mapStatetoProps, { getHomeListPost })(Home);