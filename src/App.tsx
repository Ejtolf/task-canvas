import React from 'react';
import { useState } from "react";
import Main from './Components/Main';
import { IsTaskPrepairingProvider } from "./Context/taskPrepairingContext";

import './App.css';

export default function App() {

  return (
    <IsTaskPrepairingProvider >
      <Main />
    </IsTaskPrepairingProvider>
  );
}
