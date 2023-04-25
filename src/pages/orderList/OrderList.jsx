import "./orderList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";

export default function ProductList() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const products = useSelector((state) => state.product.products);
  useEffect(() => {
      const getOrders = async () => {
          try {
          const res = await userRequest.get(`/orders`);
          setOrders(res.data);
          } catch (err) {}
      };
      getOrders();
  }, []);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  



  const handleDelete = async (id) => {
      try {
          await userRequest.delete(`/orders/${id}`);
          setOrders(orders.filter((order) => order._id !== id));
      } catch (error) {
        
      }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field:"userId",headerName:"User ID",width:220
    },
    {
      field: "status", headerName: "Status", width: 80,
    },
    {
      field:"createdAt",headerName:"Date",width:200,
    },
    {
      field:"amount",headerName:"Total",width:90,
      renderCell:(params)=>{
        return (
          <div className="productListItem">
            {params.row.amount} $
          </div>
        );
      }
    },
    {
      field:"products",headerName:"Products",width:350,overflow:"scroll",
      renderCell:(params)=>{
        return(
          <div>
            {params.row.products.map((product)=>(
              <div className="orderProduct">
              <div className="productListItemLeft">
                 {products.find((a)=>a._id===product.productId).title} 
              </div>
              <div className="productListItemRight">
                <img style={{width:"50px",height:"50px",borderRadius:"100%"}} src= {products.find((a)=>a._id===product.productId).img} alt="" />
              </div> 
                <hr />
              </div>
            ))}
          </div>
        )
      } 
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="orderListEdit">Xem chi tiết</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        rowHeight={200}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
