import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

const CustomButton = ({ onPress, title, size, color }) => {
    return (
    <TouchableOpacity onPress={onPress} style={{
      flex: 1,
      margin: 1,
      backgroundColor: '#009688',
      justifyContent: 'center',
    }}>
      <Text style={[{
                      color: 'white',
                      padding:7,
                      fontWeight: 'bold',
                      alignSelf:'center',
                      textTransform: 'uppercase'
                    },
                      color && { color }
                  ]}>
          {title}
      </Text>
    </TouchableOpacity>
    );
  };

export default CustomButton;