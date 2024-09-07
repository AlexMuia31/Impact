import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { FooterTypo, Heading } from "./Typographies";
import { FooterButton } from "./Buttons";

const Footer = () => {
  return (
    <Box sx={{ background: "#031B34", pt: "10%", pb: "5%" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "1000px",
            }}
          >
            <Heading
              sx={{
                fontSize: { md: "62px", sm: "50px", xs: "30px" },
                textAlign: "center",
              }}
            >
              Do you want to step in to the future before others
            </Heading>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "4%" }}>
          <FooterButton>Request Early Access</FooterButton>
        </Box>
        <Grid container spacing={2} sx={{ mt: "5%" }}>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <FooterTypo sx={{ fontWeight: "14px", mb: "6%" }}>
                Links
              </FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>Overons</FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>Social Media</FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>Counters</FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>Contact</FooterTypo>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <FooterTypo sx={{ fontWeight: "14px", mb: "6%" }}>
                Company
              </FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>Terms & Conditions</FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>Privacy Policy</FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>Contact</FooterTypo>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box>
              <FooterTypo sx={{ fontWeight: "14px", mb: "6%" }}>
                Get in touch
              </FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>
                Crechterwoord K12 182 DK Alknjkcb
              </FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>085-132567</FooterTypo>
              <FooterTypo sx={{ mb: "3%" }}>info@payme.net</FooterTypo>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
