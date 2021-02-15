import React from 'react';
import {View, Text, Image} from 'react-native';

import {styles} from '../styles/styles';

import { Dimensions } from 'react-native';

import { Avatar } from 'react-native-elements';

const SplashScreen = () =>{

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return(
        <View style={[styles.flex1, styles.justifyCenter, styles.alignCenter]}>
            <View style={styles.flex2, styles.justifyCenter, styles.alignCenter}>
                <View>
                    <Avatar
                    size="xlarge"
                    rounded
                    source={require('../image/Library.png')}
                    />
                </View>
                <View style={[styles.mT10]}>
                    <Text style={[styles.font20, styles.textBold, styles.pXHalf, styles.textCenter]}>
                        Eulogio Amang Rodgriquez Institute Vocational High School
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default SplashScreen;