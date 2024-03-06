import React from "react";
import { createContext, useContext, useState } from "react";

type ContextValue = {
    isTaskPreparing: boolean;
    setIsTaskPreparing: (value: boolean) => void;
};
const IsTaskPrepairingContext = createContext<ContextValue>({
    isTaskPreparing: false,
    setIsTaskPreparing: () => { },
});

export default IsTaskPrepairingContext;

export const IsTaskPrepairingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isTaskPreparing, setIsTaskPreparing] = useState(false);

    return (
        <IsTaskPrepairingContext.Provider
            value={{ isTaskPreparing, setIsTaskPreparing }}
        >
            {children}
        </IsTaskPrepairingContext.Provider>
    );
};

