import { useSQLiteContext } from "expo-sqlite"

export type ProductDb = {
  id: number
  name: string
  stock: number
  price: number
}

export function useProductDb () {
  const database = useSQLiteContext()
  
  const searchByName = async (name: string) => {    
    try {
      const query = 'SELECT * FROM products WHERE name LIKE ?'
      
      const response = await database.getAllAsync<ProductDb>(query, [`%${name}%`])
      return response
    } catch (error) {
      throw error
    }
  }

  const create = async (data: Omit<ProductDb, 'id'>) => {
    const statement = await database.prepareAsync(
      'INSERT INTO products (name, stock, price) VALUES ($name, $stock, $price)'
    )

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $stock: data.stock,
        $price: data.price
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }
  
  const update = async (data: ProductDb) => {
    const statement = await database.prepareAsync(
      'UPDATE products SET name = $name, stock = $stock, price = $price WHERE id = $id'
    )

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $stock: data.stock,
        $price: data.price
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }
  
  return { searchByName, create, update }
}
