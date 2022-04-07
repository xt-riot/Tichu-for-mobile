import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

const CustomButton = ({ onPress, title, size, color, disabled }) => {
    return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={{
      flex: 1,
      margin: 1,
      backgroundColor: '#009688',
      justifyContent: 'center',
      underlayColor: 'grey'
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