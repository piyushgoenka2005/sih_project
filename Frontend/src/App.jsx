// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Request from "./components/Request";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";
import VerifyAuthority from "./components/VerifyAuthority";
import IssuingAuthority from "./components/IssuingAuthority";
import DashBoard from "./components/DashBoard"
import PendingVerification from "./components/PendingVerification"
import Layout from "./Layout";

// Update router to use Layout for each route
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "request",
    element: (
      <Layout>
        <Request />
      </Layout>
    ),
  },
  {
    path: "signup",
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "dashboard",
    element: (
      <Layout>
        <DashBoard />
      </Layout>
    ),
  },
  {
    path: "verify-authority",
    element: (
      <Layout>
        <VerifyAuthority />
      </Layout>
    ),
  },
  {
    path: "issuing-authority",
    element: (
      <Layout>
        <IssuingAuthority />
      </Layout>
    ),
  },
  {
    path: "pending-verification",
    element: (
      <Layout>
        <PendingVerification />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
