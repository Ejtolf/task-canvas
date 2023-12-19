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
                            color: 'blue',
                        },
                        '& label': {
                            color: 'blue',
                        },
                        '& backgroundColor': {
                            color: "red"
                        },
                    },
                },
            },
        },
    });


    return (
        <div className="header">
            <div className="search-panel">
                <img src={LOGO} alt="TaskCanvas" height="100" />
                <ThemeProvider theme={theme}>
                    <TextField className="searchfield" label="Search..." variant="filled" />
                </ThemeProvider>
            </div>
        </div>
    )
}
