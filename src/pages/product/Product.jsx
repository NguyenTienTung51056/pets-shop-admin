import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@mui/icons-material";
import { useSelector } from "react-redux";
import {  useState } from "react";
import {  updateProduct } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [typeDetails, setTypeDetails] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setInputs(product);
    setCat(product.categories);
    setTypeDetails(product.typeDetails);
    setColor(product.color);
  },[product])


  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleTypeDetails = (e) => {
    setTypeDetails(e.target.value.split(","));
  }
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  }
  const handleClick = async (e) => {
    e.preventDefault();
    if (file!==null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
        // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat ,typeDetails: typeDetails, color: color};
          updateProduct(productId, product,dispatch).then(()=>{
            navigate("/products");
          }).catch((err)=>{
            console.log(err);
          })
        });
      }
    );
    }
    const product = { ...inputs,categories: cat ,typeDetails: typeDetails, color: color};
   await  updateProduct(productId, product,dispatch);
    navigate("/products");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Tạo</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="title" type="text" onChange={handleChange}defaultValue={product.title} />
            <label>Product Description</label>
            <input name="desc" type="text" onChange={handleChange} defaultValue={product.desc} />
            <label>Price</label>
            <input name="price" type="text" onChange={handleChange} defaultValue={product.price} />
            <label>Count</label>
            <input name="count" type="text" onChange={handleChange} defaultValue={product.count} />
            <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" defaultValue={product.categories} onChange={handleCat} />
          <label>Type Detatils</label>
          <input type="text" placeholder="cogi,alaska" defaultValue={product.typeDetails} onChange={handleTypeDetails} />
          <label>Color</label>
          <input type="text" placeholder="yellow,pink" defaultValue={product.color} onChange={handleColor} />
          <label>In Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg"  />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            <button onClick={handleClick} className="productButton">Sửa</button>
          </div>
        </form>
      </div>
    </div>
  );
}
