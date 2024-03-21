Penambahan: 

users:
/api/users/profile (untuk get all data user)

cart: 
/api/cart/add-to-cart (post data ke cart by Product id)
/api/cart/my-cart (get data dari cart by user id)
/api/cart/remove-from-cart/:cartItemId (remove item from cart by product id)

product:
  stocks: { type: Number, required: true}, (wajib ada input stock)
  chooseItem: { type: [String], required: true },  (wajib ada input choose item)

Note: Disini aku buat choose item sebagai array

Nanti frontend bisa ngeconsume misal product.chooseItem[0] (ini untuk menampilkan data dari array di urutan paling depan)
Jadi nanti data yang bakal masuk ke cart itu data array yang di pilih
 