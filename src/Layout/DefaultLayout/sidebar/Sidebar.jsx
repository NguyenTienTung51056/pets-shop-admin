import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {logoutt} from "../../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const user = useSelector((state) => state.user?.currentUser);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameLocation = location.pathname.split("/")[1];

  const onHandleLogout =(e) => {
    e.preventDefault();
     dispatch(logoutt(dispatch).then(() => navigate("/login")));
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className={nameLocation==="" ? "sidebarListItem  active": "sidebarListItem"} >
              <LineStyle className="sidebarIcon" />
              Trang chủ
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={nameLocation==="users" ? "sidebarListItem  active": "sidebarListItem"}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className={nameLocation==="products" ? "sidebarListItem  active": "sidebarListItem"}>
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className={nameLocation==="orders" ? "sidebarListItem  active": "sidebarListItem"}>
                <Storefront className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              <a href="https://www.google.com/intl/vi/gmail/about/">Email</a>
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              <a href="https://www.facebook.com/oppas.tungs.9/">Feedback</a>
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
            {user?.isAdmin && (<li className="sidebarListItem">
              <LogoutIcon className="sidebarIcon" />
              <button style={{border:"none",backgroundColor:"transparent",}} onClick={onHandleLogout}>Logout</button>
            </li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
