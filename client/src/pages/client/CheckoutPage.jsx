import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartProvider";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/userAuthSlice";
import paymentAPI from "@/api/payment_method.api";
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
} from "@/api/address.api";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.userAuth);
  const [addressBook, setAddressBook] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("other");
  const [items, setItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  // Thông tin giao hàng
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
  });

useEffect(() => {
  if (isAuthenticated && user) {
    const addresses = user.addresses || [];
    setAddressBook(addresses);

    const defaultAddress = addresses.find(addr => addr.is_default);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      setShippingInfo({
        name: defaultAddress.receiver_name,
        phone: defaultAddress.receiver_phone,
        address: defaultAddress.address_line,
        province: defaultAddress.city,
        district: defaultAddress.district,
        ward: defaultAddress.ward,
        note: defaultAddress.note || "",
      });
    }
  }
}, [isAuthenticated, user]);


useEffect(() => {
  const loadProvinces = async () => {
    try {
      const data = await fetchProvinces();
      setProvinces(data);
    } catch (err) {
      console.error("Fetch provinces error:", err);
    }
  };

  loadProvinces();
}, []);

useEffect(() => {
  if (!selectedProvinceId) return;

  const loadDistricts = async () => {
    try {
      const data = await fetchDistricts(selectedProvinceId);
      setDistricts(data);
      setWards([]);
      setSelectedDistrictId("");

      setShippingInfo((prev) => ({
        ...prev,
        district: "",
        ward: "",
      }));
    } catch (err) {
      console.error("Fetch districts error:", err);
    }
  };

  loadDistricts();
}, [selectedProvinceId]);

useEffect(() => {
  if (!selectedDistrictId) return;

  const loadWards = async () => {
    try {
      const data = await fetchWards(selectedDistrictId);
      setWards(data);

      setShippingInfo((prev) => ({
        ...prev,
        ward: "",
      }));
    } catch (err) {
      console.error("Fetch wards error:", err);
    }
  };

  loadWards();
}, [selectedDistrictId]);


  useEffect(() => {
    if (location.state?.buyNow && location.state?.items) {
      setItems(location.state.items);
    } else if (cart.length > 0) {
      const mappedCart = cart.map((item) => ({
        product: item.product ?? item,
        quantity: item.quantity,
        size: item.size,
      }));
      setItems(mappedCart);
    } else {
      console.log("Cart trống, không thể thanh toán !");
    }
  }, [location, cart, navigate]);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await paymentAPI.getAll({ is_active: true });
        setPaymentMethods(res.data.data || []);
      } catch (err) {
        console.error("Fetch payment methods error:", err);
      }
    };

    fetchPayments();
  }, []);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }

    const orderPayload = {
      items,
      paymentMethod,
      shippingInfo,
      total: subtotal,
    };

    console.log("ORDER PAYLOAD:", orderPayload);
    alert("Đặt hàng thành công!");
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 mx-auto md:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-blue-500">SNEAKERSTORE</h1>
            {isAuthenticated && (
          <select
            className="w-full px-3 py-3 mb-2 border rounded"
            value={selectedAddressId}
            onChange={(e) => {
              const addrId = e.target.value;
              setSelectedAddressId(addrId);

              if (addrId === "other") {
                setShippingInfo({
                  name: user.name || "",
                  phone: "",
                  address: "",
                  province: "",
                  district: "",
                  ward: "",
                  note: "",
                });
              } else {
                const addr = addressBook.find((a) => a.id == addrId);
                if (addr) {
                  setShippingInfo({
                    name: addr.receiver_name,
                    phone: addr.receiver_phone,
                    address: addr.address_line,
                    province: addr.city,
                    district: addr.district,
                    ward: addr.ward,
                    note: addr.note || "",
                  });
                  // update province/district select
                  const provinceObj = provinces.find(p => p.full_name === addr.city);
                  if (provinceObj) setSelectedProvinceId(provinceObj.id);
                  const districtObj = districts.find(d => d.full_name === addr.district);
                  if (districtObj) setSelectedDistrictId(districtObj.id);
                }
              }
            }}
          >
            <option value="other">Địa chỉ khác</option>
            {addressBook.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.address_line}, {addr.ward}, {addr.district}, {addr.city}
              </option>
            ))}
          </select>
              )}
          {/* Thông tin nhận hàng */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Thông tin nhận hàng</h2>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Đăng xuất
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Đăng nhập
                </Link>
              )}
            </div>

            {isAuthenticated && (
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border rounded"
              />
            )}

            <input
              type="text"
              placeholder="Họ và tên"
              value={shippingInfo.name}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, name: e.target.value })
              }
              className="w-full px-4 py-3 border rounded"
            />

            <input
              type="text"
              placeholder="Số điện thoại (tuỳ chọn)"
              value={shippingInfo.phone}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, phone: e.target.value })
              }
              className="w-full px-4 py-3 border rounded"
            />

           {/* Province / District / Ward */}
            <div className="space-y-3">
              {/* Tỉnh / Thành */}
              <select
                className="w-full px-3 py-3 border rounded"
                value={selectedProvinceId}
                onChange={(e) => {
                  const id = e.target.value;
                  const province = provinces.find((p) => p.id === Number(id));

                  setSelectedProvinceId(id);
                  setShippingInfo((prev) => ({
                    ...prev,
                    province: province?.full_name || "",
                  }));
                }}
              >
                <option value="">Tỉnh / Thành</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name}
                  </option>
                ))}
              </select>

              {/* Quận / Huyện */}
              <select
                className="w-full px-3 py-3 border rounded"
                value={selectedDistrictId}
                disabled={!districts.length}
                onChange={(e) => {
                  const id = e.target.value;
                  const district = districts.find((d) => d.id === Number(id));

                  setSelectedDistrictId(id);
                  setShippingInfo((prev) => ({
                    ...prev,
                    district: district?.full_name || "",
                  }));
                }}
              >
                <option value="">Quận / Huyện</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.full_name}
                  </option>
                ))}
              </select>

              {/* Phường / Xã */}
              <select
                className="w-full px-3 py-3 border rounded"
                value={shippingInfo.ward}
                disabled={!wards.length}
                onChange={(e) =>
                  setShippingInfo((prev) => ({
                    ...prev,
                    ward: e.target.value,
                  }))
                }
              >
                <option value="">Phường / Xã</option>
                {wards.map((w) => (
                  <option key={w.id} value={w.full_name}>
                    {w.full_name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Địa chỉ chi tiết (tuỳ chọn)"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              className="w-full px-4 py-3 border rounded"
            />

            <textarea
              placeholder="Ghi chú (tuỳ chọn)"
              value={shippingInfo.note}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, note: e.target.value })
              }
              className="w-full px-4 py-3 border rounded"
            />
          </div>
        </div>

        {/* MIDDLE */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Vận chuyển</h2>
            <div className="px-4 py-3 text-blue-700 border border-blue-200 rounded bg-blue-50">
              Vui lòng nhập đầy đủ địa chỉ giao hàng
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Thanh toán</h2>

            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded transition ${
                  paymentMethod === method.code
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-400"
                }`}
              >
                <label className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method.code}
                    onChange={() => setPaymentMethod(method.code)}
                  />

                  {/* Logo */}
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="object-contain w-8 h-8"
                  />

                  <span className="font-medium">{method.name}</span>
                </label>

                {paymentMethod === method.code && (
                  <div className="px-10 pb-4 text-sm text-gray-600">
                    {method.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="pl-6 space-y-6 border-l">
          <h2 className="text-lg font-semibold">
            Đơn hàng ({items.length} sản phẩm)
          </h2>

          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              {/* Image + quantity badge */}
              <div className="relative">
                <img
                  src={item.product.images?.[0]?.url}
                  className="w-16 h-16 border rounded"
                />

                <span className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 rounded-full -top-2 -right-2">
                  {item.quantity}
                </span>
              </div>

              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
              </div>

              <span className="font-semibold text-blue-600">
                {(
                  item.product.discountPrice ?? item.product.price
                ).toLocaleString()}
                đ
              </span>
            </div>
          ))}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>-</span>
            </div>
          </div>

          <div className="flex justify-between pt-4 text-lg font-semibold border-t">
            <span>Tổng cộng</span>
            <span className="text-blue-500">{subtotal.toLocaleString()}đ</span>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/cart" className="text-blue-500 hover:underline">
              ← Quay về giỏ hàng
            </Link>

            <button
              onClick={handlePlaceOrder}
              className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
