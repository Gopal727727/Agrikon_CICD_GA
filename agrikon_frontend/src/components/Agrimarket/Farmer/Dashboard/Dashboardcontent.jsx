import React from "react";

import Dashboardcontent_businessman from "./Dashboardcontent_businessman";
import Dashboardcontent_farmer from "./Dashboardcontent_farmer";
const Dashboardcontent = () => {
const usertype=localStorage.getItem("usertype")
   if (usertype=="Farmer")
   {
    return (
<Dashboardcontent_farmer/>
    );
   }
   if (usertype=="Businessman")
   {
    return(
        <Dashboardcontent_businessman/>
    );
   }
};

export default Dashboardcontent;