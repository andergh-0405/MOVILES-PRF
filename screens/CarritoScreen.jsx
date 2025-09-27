import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function CarritoScreen({ carrito, setCarrito, pedidos, setPedidos, navigation }) {

  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = (nuevoCarrito[index].cantidad || 1) + 1;
    setCarrito(nuevoCarrito);
  };


  const disminuirCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      setCarrito(nuevoCarrito);
    }
  };


  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };


  const confirmarPedido = () => {
    if (!carrito || carrito.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos al carrito primero');
      return;
    }

    const pedidosActuales = Array.isArray(pedidos) ? pedidos : [];
    const carritoActual = Array.isArray(carrito) ? carrito : [];

    setPedidos([...pedidosActuales, ...carritoActual]);
    setCarrito([]);
    Alert.alert('✅ Pedido Confirmado', 'Tu pedido ha sido procesado correctamente');

    navigation.reset({
      index: 0,
      routes: [
        { name: 'Home' },
        { name: 'Pedidos' }
      ],
    });
  };


  const calcularSubtotalProducto = (producto) => {
    const cantidad = producto.cantidad || 1;
    return producto.precio * cantidad;
  };


  const subtotal = carrito?.reduce((sum, producto) => sum + calcularSubtotalProducto(producto), 0) || 0;
  const iva = subtotal * 0.15;
  const totalConIva = subtotal + iva;
  const totalProductos = carrito?.reduce((sum, producto) => sum + (producto.cantidad || 1), 0) || 0;

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.confirmButton, (!carrito || carrito.length === 0) && styles.disabledButton]}
        onPress={confirmarPedido}
        disabled={!carrito || carrito.length === 0}
      >
        <Text style={styles.confirmButtonText}>✅ Confirmar Pedido</Text>
      </TouchableOpacity>


      <View style={styles.resumenContainer}>
        <Text style={styles.totalText}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.ivaText}>IVA (15%): ${iva.toFixed(2)}</Text>
        <Text style={styles.totalConIvaText}>Total: ${totalConIva.toFixed(2)}</Text>
      </View>


      {!carrito || carrito.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Tu carrito está vacío</Text>
          <Text style={styles.emptySubText}>Agrega productos desde la tienda</Text>
        </View>
      ) : (
        <FlatList
          data={carrito}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.productCard}>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.productPrice}>${item.precio} c/u</Text>
                <Text style={styles.productSubtotal}>
                  Subtotal: ${calcularSubtotalProducto(item).toFixed(2)}
                </Text>
              </View>


              <View style={styles.cantidadContainer}>
                <TouchableOpacity
                  style={styles.cantidadButton}
                  onPress={() => disminuirCantidad(index)}
                >
                  <Text style={styles.cantidadButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.cantidadText}>{item.cantidad || 1}</Text>

                <TouchableOpacity
                  style={styles.cantidadButton}
                  onPress={() => aumentarCantidad(index)}
                >
                  <Text style={styles.cantidadButtonText}>+</Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarProducto(index)}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  disabledButton: {
    backgroundColor: '#6c757d',
    opacity: 0.6
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  resumenContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 5
  },
  ivaText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5
  },
  totalConIvaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#198754',
    marginBottom: 10
  },
  itemsText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 3
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c757d',
    marginBottom: 10
  },
  emptySubText: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center'
  },
  listContent: {
    paddingBottom: 20
  },
  productCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  productInfo: {
    flex: 3
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  productPrice: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 3
  },
  productSubtotal: {
    fontSize: 14,
    color: '#198754',
    fontWeight: 'bold'
  },
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  cantidadButton: {
    backgroundColor: '#0d6efd',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cantidadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cantidadText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    marginLeft: 20,
    borderRadius: 5,
    flex: 0.5,
    alignItems: 'center'
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  }
});