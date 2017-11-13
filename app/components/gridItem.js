import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width

/**
 * 网格按钮Item
 * 
 * @class GridItem
 * @extends {Component}
 */
class GridItem extends Component {
    static defaultProps = {
        onClick: () => { },

        dot: false,
        badge: 0,

        title: 'text',
        titleStyle: {},
        columns: 4,
        style: { height: 80 },//默认高度80，不能设置宽度，宽度是根据columns来设置的

        defaultImage: null,
        image: require('../resources/images/menu_icon.png'),
    };
    render() {
        const { columns, image, defaultImage, dot, badge, onClick } = this.props;
        //dot和bade不能同时存在
        let badgeWidth = 0;
        let badgeNumber = '';

        if (badge > 99) {
            badgeWidth = 36;
            badgeNumber = '99+';
        } else if (badge > 9) {
            badgeWidth = 26;
            badgeNumber = badge;
        } else if (badge > 0) {
            badgeWidth = 16;
            badgeNumber = badge;
        } else {
            badgeWidth = 0
            badgeNumber = ''
        }
        let cornerView;
        if (dot) {
            cornerView = <View style={styles.dotStyle} />;
        } else {
            cornerView = badgeWidth == 0 ? null :
                <View style={[styles.badgeView, { width: badgeWidth }]}>
                    <Text style={styles.badgeText}>{badgeNumber}</Text>
                </View>
        }

        return (
            <TouchableOpacity
                style={[styles.container, this.props.style, { width: SCREEN_WIDTH / columns }]}
                onPress={onClick}
                activeOpacity={0.8}>
                <ImageBackground source={image}
                    defaultSource={defaultImage}
                    style={styles.imageStyle}
                    resizeMode='contain' >
                    {cornerView}
                </ImageBackground>
                <Text ellipsizeMode='middle'
                    numberOfLines={1}
                    style={styles.titleStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    imageStyle: {
        height: 40,
        width: 40,
        marginTop: 10,
        marginBottom: 5,
        alignItems: 'center',
    },
    titleStyle: {
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'transparent',
    },
    dotStyle: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginRight: -40,
        marginTop: -5,
        backgroundColor: '#f00',
    },
    badgeView: {
        marginRight: -40,
        marginTop: -5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f00',
        height: 16,
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
    }
})

export default GridItem;