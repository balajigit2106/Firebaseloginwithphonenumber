import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <Text>Open up App.js to start working on your app!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
