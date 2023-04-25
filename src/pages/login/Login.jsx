import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useSelector } from "react-redux";
import { admin } from "../../redux/userRedux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let error = useSelector((state) => state.user.isAdmin);

  const hamset = () => {
    setTimeout(() => {
      dispatch(admin(true));
    }, 3000);
  }

   useEffect(() => {
    setTimeout(() => {
      dispatch(admin(true));
    }, 3000);
   },[dispatch,true]);


  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    hamset();
  };

  

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {!error ?(<span  style={{ color: "red"}} >tai khoan nay khong phai Admin!</span>):(<></>)}
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
