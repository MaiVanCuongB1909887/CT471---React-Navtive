import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function Footer() {

  return (
        <View style={style.footer}>
            <View>
                <View style={style.footerText}>
                    <Text style={{ color: 'white', padding: 10, }}>Contact us</Text>
                    <Text style={{ color: 'white', padding: 10, }}>Cookies</Text>
                    <Text style={{ color: 'white', padding: 10, }}>Legal</Text>
                </View>
                <View style={style.logos}>
                    <View style={style.icons}>
                        <TouchableOpacity  >
                            <View style={style.icon}>
                                <Icon name='twitter' size={20} color={'#1964E6'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={style.icons}>
                        <TouchableOpacity>
                            <View style={style.icon}>
                                <Icon name='youtube-play' size={20} color={'#CC0000'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'white', padding: 10, }}>Copyright © 2023 Sony Group Corporation. All rights reserved.</Text>
                </View>
            </View>
        </View>
    )
}

export default Footer