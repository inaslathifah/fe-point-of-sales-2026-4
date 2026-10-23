import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Label } from "@/component/ui/label";
import { Input } from "@/component/ui/input";
import api from "@/services/api.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";

const FormTransaction = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const ext = prev.find((item) => item.id === product.id);
      if (ext) {
        if (ext.qty >= product.stock) return prev;
        return prev.map((item) => {
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item;
        });
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart((prev) => {
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.qty + delta;
            return nextQty > 0 && nextQty <= item.stock
              ? { ...item, qty: nextQty }
              : item;
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  const tax_rate = 0.1;
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const tax = Math.round(totalAmount * tax_rate);
  const total = totalAmount + tax;
  const change = Number(cashAmount) - total;

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const payload = {
        order_number: Date.now(),
        payment_method: paymentMethod === "Cash" ? 2 : 1,
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
          price: item.price,
        })),
        subtotal: totalAmount,
        pay: cashAmount,
        tax: tax,
        total: total,
      };
      console.log(payload);
      const response = await api.post("/transaction", payload);

      if (!response.status) {
        alert(response.message || "Failed process transaction");
        return;
      }

      if (paymentMethod === "QRIS" && response.payment_gateway?.redirect_url) {
        window.location.href = response.payment_gateway.redirect_url;
        return;
      }
      navigate("/transaction/print");
    } catch (error) {
      console.log("error transaction order", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-col-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <Card className="shadow-sm border-border p-6">
            <CardHeader className="py-4 px-5 border-b">
              <CardTitle className="text-sm font-semibold">
                Available Product
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 p-4 md:grid-cols-3 gap-4 overflow-y-auto max-h-[620px]">
              {product.map((item, index) => (
                <button
                  onClick={() => addToCart(item)}
                  key={index}
                  className="flex flex-col justify-between p-3.5 rounded-lg border border-border/80 bg-card hover:border-primary/70 text-left transition-all group"
                >
                  <div>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {item.category_name}
                    </span>
                    <h4 className="font-semibold text-sm line-clamp-1 mt-0.5 group-hover:text-primary">
                      {item.name}
                    </h4>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium text-xs">
                      {Number(item.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {item.stock}
                    </span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="border border-border/80 shadow-sm">
            <CardHeader className="py-4 px-5 border-b">
              <CardTitle className="text-sm font-semibold">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-3 overflow-y-auto divide-y divide-border/60">
                {cart.map((item) => (
                  <div>
                    <div className="pt-5 flex items-center justify-center text-sm">
                      <div className="flex-1 pr-2">
                        <p className="font-medium text-xs">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {Number(item.price).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 text-xs"
                        onClick={() => updateQty(item.id, -1)}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center text-xs font-mono font-medium">
                        {item.qty}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 text-xs"
                        onClick={() => updateQty(item.id, 1)}
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 text-xs text-rose-600 hover:text-rose-400 hover:bg-red-200"
                      >
                        x
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment" className="h-8 text-xs w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="QRIS">QRIS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {paymentMethod === "Cash" && (
                <div className="space-y-1">
                  <Label className="text-xs">Pay</Label>
                  <Input
                    className="h-8 text-xs"
                    id="cash"
                    type="number"
                    placeholder="Enter Your Cash"
                    size="sm"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-1.5 pt-3 border-t text-xs">
                <div className="flex justify-between font-semibold text-sm">
                  <span>Subtotal</span>
                  <span>
                    {Number(totalAmount).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-sm">
                  <span>Tax (10%)</span>
                  <span>
                    {Number(tax).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-sm">
                  <span>Total</span>
                  <span>
                    {Number(total).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Change</span>
                  <span>
                    {Number(change).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button
                onClick={handleCheckout}
                className="w-full text-xs font-semibold"
              >
                {loading ? "Loading..." : "Save Transaction"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FormTransaction;
