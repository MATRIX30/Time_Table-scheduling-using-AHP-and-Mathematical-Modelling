import Classes from "@/pages/Classes/Classes";
import { GeneratingPage, LandingPage } from "../pages";
import ClassDetail from "@/pages/Classes/ClassDetail";

export const routesConfig = [
  {
    page: <GeneratingPage />,
    path: "/shedules",
  },
  {
    page: <LandingPage />,
    path: "/",
  },
  {
    page:<Classes/>,
    path:"/classes"
  },
  {
    page:<ClassDetail/>,
    path:'/classes/:classN'
  }
];
