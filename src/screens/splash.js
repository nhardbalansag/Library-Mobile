import React from 'react';
import {View, Text, Image} from 'react-native';

import {styles} from '../styles/styles';

const SplashScreen = () =>{
    return(
        <View>
            <View style={styles.flex1}>
                <Image
                    source={require('../image/LIBRARY HELPDESK APP.png')}
                    resizeMode={'cover'}
                    style={{width:"100%", height: 150, paddingHorizontal:10 }} 
                />
            </View>
            <View style={[ styles.justifyCenter, styles.alignCenter] }>
                <Text style={[styles.splashTitle, styles.textCenter]}>© Copyright 2020-2021 | All Rights Reserved | Powered by Project</Text>
            </View>
        </View>
    );
}

export default SplashScreen;