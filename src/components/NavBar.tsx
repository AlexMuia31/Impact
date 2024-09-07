import { AppBar, Box, Container, Toolbar } from "@mui/material";
import React from "react";
import { GeneralTypo } from "./Typographies";
import Link from "next/link";

const NavBar = () => {
  return (
    <Box>
      <AppBar sx={{ background: "#040C18" }}>
        <Toolbar>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <GeneralTypo>Home</GeneralTypo>
            </Link>
            <Link href="/transactions" style={{ textDecoration: "none" }}>
              <GeneralTypo>Transact</GeneralTypo>
            </Link>
            <GeneralTypo sx={{ display: { xs: "none", sm: "flex" } }}>
              About
            </GeneralTypo>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
