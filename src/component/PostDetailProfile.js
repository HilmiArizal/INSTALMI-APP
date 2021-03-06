import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Header, Icon, Overlay, Input } from 'react-native-elements';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { API_URL } from '../helpers/API_URL';
import { connect } from 'react-redux';
import { deletePost, getHomeListPost, editingPost, cancelEditPost } from '../actions'

class PostDetailProfile extends Component {

    state = { isVisible: false, deleteVisible: false }


    componentDidUpdate() {
        if (!this.props.id) {
            this.props.getHomeListPost()
            this.props.navigation.goBack()
        }
    }

    deletePost = () => {
        this.setState({ deleteVisible: false })
        this.props.deletePost(this.props.id)
    }

    savePost = () => {

    }

    renderHeader = () => {
        if (this.props.editPost) {
            return (
                <Header
                    placement="left"
                    leftComponent={{
                        icon: 'clear',
                        color: 'black',
                        onPress: this.props.cancelEditPost
                    }}
                    centerComponent={{
                        text: 'Edit Info',
                        color: '#4388d6'
                        // onPress: this.saveProfile
                    }}
                    rightComponent={{
                        icon: 'done',
                        color: 'black',
                        onPress: this.onSaveProfile

                    }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === 'ios' ? 0 : - 25,
                        elevation: 2
                    }}
                />
            )
        }
        return (
            <Header
                placement="left"
                centerComponent={{
                    text: 'Post',
                    style: { color: 'black', fontSize: 18, fontWeight: '700' }
                }}
                leftComponent={{
                    icon: 'arrow-back',
                    color: 'black',
                    onPress: () => this.props.navigation.goBack()
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    justifyContent: 'space-around',
                    marginTop: Platform.OS === 'ios' ? 0 : - 25,
                    elevation: 2
                }}
            />
        )
    }

    render() {
        return (
            <View>
                {this.renderHeader()}

                <Card>
                    <CardItem>
                        <Left style={{ flex: 3 }}>
                            <Thumbnail source={{ uri: `${API_URL}${this.props.profileimage}` }} />
                            <Body>
                                <Text>{this.props.username}</Text>
                                <Text note>InstalMi</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Icon
                                name='more-vert'
                                size={30}
                                onPress={() => this.setState({ isVisible: true })}
                            />
                        </Right>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{ uri: `${API_URL}${this.props.image}` }} style={{ height: 350, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text>{this.props.caption}</Text>
                        </Left>

                    </CardItem>
                </Card>
                <Overlay
                    isVisible={this.state.isVisible}
                    height={'auto'}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    <View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.setState({ isVisible: false })
                                this.props.editingPost()
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    paddingVertical: 15
                                }}
                            >
                                Edit
                        </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.setState({ isVisible: false, deleteVisible: true })}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    paddingVertical: 15
                                }}
                            >
                                Delete
                        </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </Overlay>
                <Overlay
                    isVisible={this.state.deleteVisible}
                    height={'auto'}
                >
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            alignItems: 'center',
                            height: 100,
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                paddingBottom: 10
                            }}>
                                Confirm Deletion
                            </Text>
                            <Text note>
                                Delete this post?
                            </Text>
                        </View>
                        <TouchableWithoutFeedback onPress={this.deletePost}>
                            <View style={{
                                paddingVertical: 12,
                                borderTopWidth: 0.3,
                                borderTopColor: '#dedede',
                                width: '100%',
                                alignItems: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#4388d6',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Delete
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.setState({ deleteVisible: false })}>
                            <View style={{
                                paddingVertical: 12,
                                borderTopWidth: 0.3,
                                borderTopColor: '#dedede',
                                width: '100%',
                                alignItems: 'center'
                            }}>
                                <Text
                                    style={{
                                        fontSize: 16
                                    }}
                                >
                                    Don't delete
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Overlay>
                <Overlay
                    isVisible={this.props.deleteLoading}
                    height={'auto'}
                    width={'auto'}
                >
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 16 }}>
                            Deleting ...
                        </Text>
                    </View>
                </Overlay>
            </View>
        );
    }
}

const mapStatetoProps = ({ postDetailPhoto }) => {
    return { ...postDetailPhoto }
}

export default connect(mapStatetoProps, { deletePost, getHomeListPost, editingPost, cancelEditPost })(PostDetailProfile);