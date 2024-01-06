import React from 'react';
import Main from './Components/Main';
import { IsTaskPrepairingProvider } from "./Context/contexts";
// import { TaskProvider } from './Context/contexts';

import './App.css';

export default function App() {

  return (
    <IsTaskPrepairingProvider>
      <Main />
    </IsTaskPrepairingProvider >
  );
}
