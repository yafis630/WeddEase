import React from "react";
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
import CategoryButtons from "./CategoryButtons";

import Categories from "./Categories";
import MarrageHall from "./Marragehall";
import Ressorts from "./Ressorts";
import BridalShoot from "./BridalShoot";
import NonVeg from "./NonVeg";
import Dryfruits from "./Dryfruits";
import Bakery from "./Bakery";
import Lehangas from "./Lehangas";
import Gowns from "./Gowns";
import Singers from "./Singers";
import Music from "./Music";
import Mehandi from "./Mehandi";
import Mehandi2 from "./Mehandi2";
import PreweddingShoot from "./PreweddingShoot";
import Sherwanis from "./Sherwanis";
import Suits from "./Suits";
import Invitations from "./Invitations";
import Kurta from "./Kurta";
import Makeup from "./Makeup";
import Makeup2 from "./Makeup2";
import Gold from "./Gold";
import Cater1 from "./Cater1";
import Gifts from "./Gifts"
import Floral from "./Floral";
import Spa from "./Spa";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/SellerButtons" element={<SellerButtons />} exact />
        <Route path="/WorkerRegistration" element={<WorkerRegistration />} exact />
        <Route path="/WorkerLogin" element={<WorkerLogin />} exact />
        <Route path="/LoginForm" element={<LoginForm />} exact />
        <Route path="/RegistrationForm" element={<RegistrationForm />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route path="/CategoryButtons" element={<CategoryButtons />} />
        <Route path="/WorkerCategory" element={<WorkerCategory />} exact />
        <Route path="/WorkerHome" element={<WorkerHome />} exact />
        <Route path="/workers/:category" element={<WorkerProfile />} exact />

        <Route path="/categories" element={<Categories />} exact />
        <Route path="/marrageHall" element={<MarrageHall />} exact/>
        <Route path="/ressorts" element={<Ressorts />} exact/>
        <Route path="/bridalShoot" element={<BridalShoot />} />
        <Route path="/preweddingShoot" element={<PreweddingShoot />} />
        <Route path="/nonVeg" element={<NonVeg />} exact />
        <Route path="/dryfruits" element={<Dryfruits />} exact />
        <Route path="/bakery" element={<Bakery />} exact />
        <Route path="/lehangas" element={<Lehangas/>} />
        <Route path="/gowns" element={<Gowns/>} />
        <Route path="/singers" element={<Singers/>} />
        <Route path="/music" element={<Music/>} />
        <Route path="/sherwanis" element={<Sherwanis/>} exact />
        <Route path="/suits" element={<Suits/>} exact />
        <Route path="/kurta" element={<Kurta/>} exact />
        <Route path="/Makeup" element={<Makeup />} />
        <Route path="/Makeup2" element={<Makeup2 />} />
        <Route path="/Gold" element={<Gold />} />           
        <Route path="/Floral" element={<Floral />} />      
        <Route path="/Mehandi" element={<Mehandi />} />
        <Route path="/Mehandi2" element={<Mehandi2 />} />
        <Route path="/Spa" element={<Spa />} exact/>
        <Route path="/Invitations" element={<Invitations />} exact/>
        <Route path="/Gifts" element={<Gifts />} exact/>
        <Route path="/Cater1" element={<Cater1/>} />
        <Route path="/Groom Wear/suits" element={<Suits/>} />
        
      </Routes>
      </div>
  );
}

export default App;