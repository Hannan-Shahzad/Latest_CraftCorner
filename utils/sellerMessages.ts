interface ProductMessage {
  productName: string
  quantity: number
}

interface ShippingAddress {
  fullName: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  country: string
}

export function sendMessageToSeller(sellerId: string, products: ProductMessage[], shippingAddress: ShippingAddress) {
  const sellerMessages = JSON.parse(localStorage.getItem(`sellerMessages_${sellerId}`) || '[]')
  const newMessage = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    products,
    shippingAddress,
  }
  sellerMessages.push(newMessage)
  localStorage.setItem(`sellerMessages_${sellerId}`, JSON.stringify(sellerMessages))
}

