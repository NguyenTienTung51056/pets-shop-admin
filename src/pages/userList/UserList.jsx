import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const getUsers = async () => {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      };
      getUsers();
    } catch (error) {
      
    }
  }, []);

  const handleDelete = (id) => {
    try {
      userRequest.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created_At",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        getRowId={(r) => r._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
