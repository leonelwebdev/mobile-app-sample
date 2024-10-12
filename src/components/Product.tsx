import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
  data : {
    name: string
    price: number
    stock: number
  }
}

export function Product({ data, ...rest }: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: '#eee',
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: 'row',
      }}
      {...rest}
    >
      <Text>
        {data.name} - {data.price} - {data.stock}
      </Text>
    </Pressable>
  )
}
