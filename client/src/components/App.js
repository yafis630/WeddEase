import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import WorkerRegistration from "./WorkerRegistration";
import Main from "./Main";
import Contact from "./Contact";
import SellerButtons from "./SellerButtons";
import WorkerCategory from "./WorkerCategory";
import WorkerLogin from "./WorkerLogin";
import WorkerHome from "./WorkerHome";
import WorkerProfile from "./WorkerProfile";
import WorkerDetails from "./WorkerDetails";
import CategoryButtons from "./CategoryButtons";
import CartPage from "./CartPage";
import AddressPage from "./AddressPage";
import PaymentGatewayPage from "./PaymentGatewayPage";
import UpdateProfile from "./UpdateProfile";
import UpdateProfileSeller from "./UpdateProfileSeller";
import SellerPr from "./SellerPr";
import SellerRegistration from "./SellerRegistration";
import SellerLogin from "./SellerLogin";
import SellerHome from "./SellerHome";
import { AuthProvider } from "../context/AuthProvider";
import { CartProvider} from "../context/CartContext";
import UploadProduct from "./UploadProduct";
import ShoppingServices from "./ShoppingServices";
import CatelogSeller from "./CatelogSeller";
import ProductDetails from "./ProductDetail";
import UpdateProfileUser from "./UpdateProfileUser";
import UserHome from "./UserHome";
import ProductDetail from "./ProductDetail";
import Catelog2 from "./Catelog2";
import AboutUs from "./AboutUs";
import OrderPage from "./OrderPage";
import ResetPasswordForm from "./ResetPasswordForm";
import SellerRequests from "./SellerRequests";
import ResetPasswordWorker from "./ResetPasswordWorker";
import ResetPasswordSeller from "./ResetPasswordSeller";
import UpdateQuantity from"./UpdateQuantity";

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
        <Routes>
          <Route path="/" element={<Main />} exact />
          <Route path="/SellerButtons" element={<SellerButtons />} exact />
          <Route
            path="/WorkerRegistration"
            element={<WorkerRegistration />}
            exact
          />

          <Route
            path="/SellerRegistration"
            element={<SellerRegistration />}
            exact
          />
          <Route path="/SellerLogin" element={<SellerLogin />} exact />
          <Route path="/SellerHome" element={<SellerHome />} exact />
          <Route path="/AboutUs" element={<AboutUs />} exact />
          <Route
            path="/UpdateProfileSeller"
            element={<UpdateProfileSeller />}
            exact
          />
          <Route path="/SellerPr" element={<SellerPr />} exact />

          <Route path="/SellerHome" element={<SellerHome />} exact />
          <Route path="/UserHome" element={<UserHome />} exact />
          <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} exact />
          <Route path="/OrderPage" element={<OrderPage />} exact />
          <Route path="/UpdateProfileUser" element={<UpdateProfileUser />} exact />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route
            path="/RegistrationForm"
            element={<RegistrationForm />}
            exact
          />
          <Route path="/userHome" element={<userHome />} exact />
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/CategoryButtons" element={<CategoryButtons />} />
          <Route path="/WorkerCategory" element={<WorkerCategory />} exact />
          <Route path="/WorkerHome" element={<WorkerHome />} exact />
          <Route path="/WorkerLogin" element={<WorkerLogin />} exact />
          <Route path="/workers/:category" element={<WorkerProfile />} exact />
          <Route path="/WorkerDetails/:id" element={<WorkerDetails />} exact/>
          <Route path="/CartPage" element={<CartPage />} exact />
          <Route path="/address" element={<AddressPage />} exact />
          <Route path="/PaymentGatewayPage"element={<PaymentGatewayPage />}exact/>
          <Route path="/Catelog2" element={<Catelog2 />} exact />
          <Route path="/UpdateProfile" element={<UpdateProfile />} exact />
          <Route path="/UploadProduct" element={<UploadProduct />} exact />
          <Route path="/AuthProvider" element={<AuthProvider />} />
          <Route path="/ShoppingServices" element={<ShoppingServices />} />
          <Route path="/sellers/:category" element={<CatelogSeller />} />
          <Route path="/ProductDetail/:productID" element={<ProductDetails />}/>
          <Route path="/UserHome"  element={<UserHome/>}/>
          <Route path="/UpdateProfileUser"  element={<UpdateProfileUser/>}/>
          <Route path="/ProductDetail/:productID" element={<ProductDetail />} />
          <Route path="/SellerRequests"  element={<SellerRequests/>}/>
          <Route path="/UpdateQuantity/:productID"  element={<UpdateQuantity/>}/>
          <Route path="/reset-password/:id/:token" element={<ResetPasswordForm/>}/>
          <Route path="/reset-password-worker/:id/:token" element={<ResetPasswordWorker/>}/>
          <Route path="/reset-password-seller/:id/:token" element={<ResetPasswordSeller/>}/>

        
        </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
