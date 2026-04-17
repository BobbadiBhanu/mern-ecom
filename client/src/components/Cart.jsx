import { useEffect, useState } from "react";
import API from "../api/axios";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : !cart || !cart.items || cart.items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item._id} className="card p-3 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.productId.name}</h5>
                  <p>₹{item.productId.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}

          <div className="card p-3">
            <h4>Total: ₹{getTotal()}</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
