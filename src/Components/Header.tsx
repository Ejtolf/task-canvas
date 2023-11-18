import React from "react";
import "../Styles/Header.css";
import { TextField, ThemeProvider, createTheme } from "@mui/material";

export default function Header() {
    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-input': {
                            color: 'blue', // Устанавливаем желаемый цвет текста в TextField
                        },
                        '& label': {
                            color: 'blue', // Устанавливаем желаемый цвет текста метки в TextField
                        },
                        '& backgroundColor': {
                            color: "red"
                        }
                    },
                },
            },
        },
    });


    return (
        <div className="header">
            <div className="search-panel">
                <ThemeProvider theme={theme}>
                    <TextField className="searchfield" label="Search..." variant="filled" />
                </ThemeProvider>
            </div>
        </div>
    )
}
