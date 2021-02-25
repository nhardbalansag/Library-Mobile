import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';

import {styles} from '../styles/styles';

import { Dimensions } from 'react-native';

import { Avatar } from 'react-native-elements';

const SplashScreen = () =>{

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return(
        
            <ImageBackground source={require('../image/marialaura-gionfriddo-XJqCp_LJbwU-unsplash.jpg')} style={{width:"100%", height: windowHeight }} resizeMode={'cover'}>
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
                        <Text style={[styles.font20, styles.textBold, styles.pXHalf, styles.textCenter, styles.textWhite, styles.pY2, {backgroundColor:'rgba(0, 0, 0, .4)'}]}>
                            Eulogio Amang Rodriguez Vocational High School
                        </Text>
                    </View>
                </View>
                </View>
            </ImageBackground>
       
    );
}

export default SplashScreen;

