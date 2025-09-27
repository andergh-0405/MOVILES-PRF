import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react'; 
import { ScrollView, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 



const USER_DATA_KEY = 'userProfile'; 

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await AsyncStorage.getItem(USER_DATA_KEY);
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.log('Error al cargar datos:', error);
        Alert.alert('Error', 'No se pudieron cargar tus datos');
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, []);

  
  const guardarCambios = async () => {
    if (!userData.nombre || !userData.apellido || !userData.correo) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (!userData.correo.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
      setIsEditing(false);
      Alert.alert('Éxito', 'Datos actualizados correctamente');
    } catch (error) {
      console.log('Error al guardar:', error);
      Alert.alert('Error', 'No se pudieron guardar los cambios');
    }
  };

  const cerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/48/d6/54/48d6547db77250e7be9ce4ef472d9618.jpg',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.welcomeText}>
          ¡Hola, {userData.nombre || 'Usuario'}!
        </Text>
        <Text style={styles.subtitle}>Gestiona tu perfil aquí</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Información Personal</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userData.nombre}
            onChangeText={(text) => setUserData({ ...userData, nombre: text })}
            editable={isEditing}
            placeholder="Ingresa tu nombre"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Apellido *</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userData.apellido}
            onChangeText={(text) => setUserData({ ...userData, apellido: text })}
            editable={isEditing}
            placeholder="Ingresa tu apellido"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Correo Electrónico *</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userData.correo}
            onChangeText={(text) => setUserData({ ...userData, correo: text })}
            editable={isEditing}
            placeholder="tu.correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={userData.telefono}
            onChangeText={(text) => setUserData({ ...userData, telefono: text })}
            editable={isEditing}
            placeholder="+593 999 999 9999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.buttonsContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={guardarCambios}
              >
                <Text style={styles.buttonText}>💾 Guardar Cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonText}>❌ Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#0d6efd',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  formContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  disabledInput: {
    backgroundColor: '#f8f9fa',
    color: '#666',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#0d6efd',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});