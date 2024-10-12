import { useEffect, useState } from "react"
import { View, Button, Alert, FlatList } from "react-native"

import Constants from "expo-constants"

import Input from "@/components/Input"
import { ProductDb, useProductDb } from "@/db/useProductDb"
import { Product } from "@/components/Product"

export default function Index() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<ProductDb[]>([])

  const productDb = useProductDb()
  
  const list = async () => {
    try {
      const response = await productDb.searchByName(search)      
      setProducts(response)
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'No se ha podido obtener la lista de productos.')
    }
  }

  const create = async () => {
    try {
      if (isNaN(Number(price))) {
        return Alert.alert('Error', 'El precio debe ser un número.')
      } else if (isNaN(Number(stock))) {
        return Alert.alert('Error', 'El stock debe ser un número.')
      }
      
      const response = await productDb.create({ name, price: Number(price), stock: Number(stock) })

      list()

      Alert.alert('Se ha creado el producto.', `ID: ${response.insertedRowId}`)
    } catch (error) {
      console.error(error)
    }
  }
  
  const update = async () => {
    try {
      if (isNaN(Number(price))) {
        return Alert.alert('Error', 'El precio debe ser un número.')
      } else if (isNaN(Number(stock))) {
        return Alert.alert('Error', 'El stock debe ser un número.')
      }
      
      await productDb.update({
        id: Number(id),
        name,
        price: Number(price),
        stock: Number(stock)
      })

      list()

      Alert.alert('Operación exitosa.', `Se ha actualizado el producto`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    list()
  }, [search])

  const details = (item: ProductDb) => {
    setId(String(item.id))
    setName(item.name)
    setPrice(String(item.price))
    setStock(String(item.stock))
  }

  const handleSave = async () => {
    if (id) {
      update()
    } else {
      create()
    }

    setId('')
    setName('')
    setPrice('')
    setStock('')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 32, gap: 16, marginTop: Constants.statusBarHeight }}>
      <Input placeholder="Nombre" value={name} onChangeText={setName} />
      <Input placeholder="Precio" value={price} onChangeText={setPrice} />
      <Input placeholder="Stock" value={stock} onChangeText={setStock} />
      
      <Button title="Guardar" color={'#284473'} onPress={handleSave} />
      
      <Input placeholder="Buscar..." value={search} onChangeText={setSearch} />

      <FlatList 
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (<Product data={item} onPress={() => details(item)} />)}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  )
}
