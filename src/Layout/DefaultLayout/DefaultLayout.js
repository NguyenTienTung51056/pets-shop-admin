import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import "../../App.css";
function DefaultLayout({ children }) {
  return (
    <>
        <Topbar/>
        <div className="container">
        <Sidebar />
                {children}
        </div>
    </>
  );
}
export default DefaultLayout;