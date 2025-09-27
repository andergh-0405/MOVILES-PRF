import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Image,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const entrar = () => {
    if (email.trim().toLowerCase() !== 'store@gmail.com' || password !== 'store') {
      Alert.alert('Error', 'Credenciales incorrectas');
      return;
    }
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />

      <View style={styles.card}>
        <View style={styles.logoContainer}>
          
          <Image source={{ uri: "https://i.pinimg.com/736x/48/d6/54/48d6547db77250e7be9ce4ef472d9618.jpg" }} style={{ width: 64, height: 64 }} /> 
          
        </View>

        <Text style={styles.title}>Bienvenido a la Tienda</Text>
        <Text style={styles.subtitle}>Inica Sesion</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Correo Electronico</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}><CLAVE></CLAVE></Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={entrar} activeOpacity={0.9}>
            <Text style={styles.loginButtonText}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18122B', 
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#18122B',
  },
  card: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#191721ff', 
    borderRadius: 24,
    padding: 38,
    alignItems: 'center',
    shadowColor: '#5C5470',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 2,
    borderColor: '#443C68',
  },
  logoContainer: {
    marginBottom: 18,
  },
  logo: {
    fontSize: 54,
    color: '#FFD700', 
    textShadowColor: '#5C5470',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#c8a177ff',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1.2,
    textShadowColor: '#4f28feff',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 17,
    color: '#B7B7B7',
    textAlign: 'center',
    marginBottom: 34,
    lineHeight: 23,
    fontStyle: 'italic',
  },
  formContainer: {
    width: '100%',
    gap: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    marginBottom: 8,
  },
  input: {
    height: 54,
    backgroundColor: '#443C68', 
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#FFD700',
    borderWidth: 2,
    borderColor: '#FFD700', 
    marginBottom: 2,
  },
  loginButton: {
    height: 56,
    backgroundColor: '#f7d40b38',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#ffe658ff',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 14,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  loginButtonText: {
    color: '#35217560',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});