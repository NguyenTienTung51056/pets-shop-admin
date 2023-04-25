import {  useLocation } from "react-router-dom";
import "./orderDetails.css";
import { useSelector } from "react-redux";
import {  useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../../requestMethods";

export default function Product() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [order, setOrder] = useState({});
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await publicRequest.get("/orders/" + orderId);
        setOrder(res.data);
      } catch (err) {}
    };
    getOrder();
  }, [orderId]);


  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Order</h1>
      </div>
      <div className="orderTop">
        <div className="orderTopRight">
          <div className="orderInfoBottom">
            <div className="orderInfoItem">
              <span className="orderInfoKey" style={{fontWeight:"bold",marginRight:"5px"}}>id:</span>
              <span className="orderInfoValue">{order._id}</span>
            </div>
            <div className="orderInfoItem">
              <span className="orderInfoKey" style={{fontWeight:"bold",marginRight:"5px"}}>Total</span>
              <span className="orderInfoValue">{order.amount} $</span>
            </div>
            <div className="orderInfoItem">
              <span className="orderInfoKey" style={{fontWeight:"bold",marginRight:"5px"}}>status:</span>
              <span className="orderInfoValue">{order.status}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="orderBottom">
        <form className="orderForm">
          <div className="orderFormLeft">
            <label>Địa chỉ nhận hàng</label>
            <label>Thành Phố</label>
            <p>{order.address?.city}</p>
            <label>Quốc gia</label>
            <p>{order.address?.line1}</p>
            <label>Postal_code</label>
            <p>{order.address?.postal_code}</p>
            <label>Ngày tạo</label>
            <p>{order.createdAt}</p>          
          </div>
          <div className="orderFormRight">
          <label style={{color:"gray"}}>Chi tiết sản phẩm</label>
          {order.products?.map((p) => (
            <div className="orderUpdateRightInfo">
            <div className="orderUpload">
                <div className="ULeft">
                  <div className="Lwrapper">
                  <label style={{marginRight:"8px",color:"gray"}}>Tên:</label><span>{products.find((a)=>a._id===p.productId)?.title}</span>
                  </div>
                  <div className="Lwrapper">
                  <label style={{marginRight:"8px",color:"gray"}}>Giá:</label>
                   <span>{products.find((a)=>a._id===p.productId)?.price}$</span>
                  </div>
                  <div className="Lwrapper">
                  <label style={{marginRight:"8px",color:"gray"}}>Số lượng: </label>
                      <span>{p.quantity}</span>
                  </div>
                </div>
                <div className="URight">
                <img src={products.find((a)=>a._id===p.productId)?.img} alt="" className="orderUploadImg"  />
                </div>
              <hr />
            </div>
            </div>
        ))}
          </div>
        </form>
      </div>
    </div>
  );
}
