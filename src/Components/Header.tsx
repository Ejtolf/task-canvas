import React from "react";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import LOGO from "../media/logo.png";
import "../Styles/Header.css";

export default function Header() {
    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& label': {
                            color: 'white',
                        },
                        '& backgroundColor': {
                            color: "white"
                        },
                    },
                },
            },
        },
    });


    return (
        <div className="header">
            <div className="search-panel">
                <div className="logo">
                    <img src={LOGO} alt="TaskCanvas" height="100" />
                    <h1>TaskCanvas</h1>
                </div>
                <div className="searchfield-container">
                    <ThemeProvider theme={theme}>
                        <TextField className="searchfield" label="Search..." variant="filled" />
                    </ThemeProvider>
                </div>
            </div>
        </div>

    )
}