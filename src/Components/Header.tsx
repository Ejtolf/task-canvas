import React from "react";
import LOGO from "../media/logo.png";

// Material UI
import { IconButton } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DraftsIcon from "@mui/icons-material/Drafts";
import TelegramIcon from '@mui/icons-material/Telegram';

import "../Styles/Header.css";

export default function Header() {
    return (
        <div className="header">
            <div className="search-panel">
                <div className="logo">
                    <img src={LOGO} alt="TaskCanvas" height="100" />
                    <h1>TaskCanvas</h1>
                </div>
            </div>
            <nav>
                <IconButton href="https://github.com/Ejtolf">
                    <GitHubIcon sx={{ color: "black" }} fontSize="large" />
                </IconButton>
                <IconButton href="https://www.linkedin.com/in/ejtolf/">
                    <LinkedInIcon sx={{ color: "purple" }} fontSize="large" />
                </IconButton>
                <IconButton href="mailto:gmartin1402gm@gmail.com">
                    <DraftsIcon sx={{ color: "red" }} fontSize="large" />
                </IconButton>
                <IconButton href="https://t.me/@edqvist">
                    <TelegramIcon sx={{ color: "cyan" }} fontSize="large" />
                </IconButton>
            </nav>
        </div>

    )
}