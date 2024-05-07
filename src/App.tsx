import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from 'react'
import { LockersList } from './pages/lockers/views/LockersList';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LockersList/>
    }
  ])

  return <RouterProvider router={router} />;
}
