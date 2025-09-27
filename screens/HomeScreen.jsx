import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, } from 'react-native';
import { products } from '../data/products';

export default function HomeScreen({ navigation, carrito, setCarrito }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  const handleLongPress = (item) => {
    Alert.alert('Producto', `Nombre: ${item.nombre}\nPrecio: $${item.precio}`);
  };

  const agregarAlCarrito = (item) => {
    const yaEnCarrito = carrito.some(producto => producto.id === item.id);

    if (yaEnCarrito) {
      Alert.alert('Ya agregado', `${item.nombre} ya está en tu carrito`);
      return;
    }

    setCarrito([...carrito, item]);
    Alert.alert('Agregado', `${item.nombre} ha sido agregado a tu carrito`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d6efd" style={styles.spinner} />
        <Text style={styles.loadingText}>Cargando productos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.carritoButton}
          onPress={() => navigation.navigate('Carrito')}
        >
          <Text style={styles.carritoText}>🛒 Carrito ({carrito.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pedidosButton}
          onPress={() => navigation.navigate('Pedidos')}
        >
          <Text style={styles.pedidosText}>📦 Ver Pedidos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detalles', { producto: item })}
            onLongPress={() => handleLongPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.imagen }}
                style={styles.image}
                onError={() => console.log('Error loading image')}
              />
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.price}>${item.precio}</Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => agregarAlCarrito(item)}
              >
                <Text style={styles.addButtonText}>🛒 Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  spinner: {
    marginBottom: 20,
    transform: [{ scale: 1.8 }],
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  carritoButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 110,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  pedidosButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 110,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  carritoText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  pedidosText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 14,
    marginBottom: 14,
    backgroundColor: '#f8fafc',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e293b',
    lineHeight: 22,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d6efd',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#0d6efd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.4,
  },
});