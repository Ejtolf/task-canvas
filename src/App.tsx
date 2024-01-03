import React from 'react';
import { useState } from "react";
import Main from './Components/Main';
import { IsTaskPrepairingProvider } from "./Context/taskPrepairingContext";
import { TaskProvider } from './Context/tasksContext';

import './App.css';

export default function App() {

  return (
    <TaskProvider>
      <Main />
    </TaskProvider>
  );
}
