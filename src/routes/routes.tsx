import { GeneratingPage, LandingPage, SignInPage, SignUpPage } from "../pages";

export const routesConfig = [
  {
    page: <GeneratingPage />,
    path: "/generating",
  },
  {
    page: <LandingPage />,
    path: "/",
  },
  {
    page: <SignInPage />,
    path: "/sign-in",
  },
  {
    page: <SignUpPage />,
    path: "/sign-up",
  },
];
