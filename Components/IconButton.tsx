import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';

const IconButton = ({ onPress, name, size, color, style }: any) => {
    return (
        <Pressable style={({ pressed }) => pressed ? [style, styles.pressed] : style} onPress={onPress}>
            <View>
                <Ionicons name={name} size={size} color={color} />
            </View>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.50
    }
});