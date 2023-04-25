import Header from './Header/Header';


function LayoutOthers({ children }) {
  return (
   <div>
        <Header />
                {children}
     
   </div>
  );
}
export default LayoutOthers;