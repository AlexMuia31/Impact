import Head from "next/head";
import Image from "next/image";
import { Box, Container, Grid, Toolbar } from "@mui/material";
import { GeneralTypo, Heading } from "@/components/Typographies";
import { CustomTextField } from "@/components/TextFields";
import { BlackButton, GetStartedButton } from "@/components/Buttons";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import React, { useState } from "react";

const style = {
  width: "36px",
  height: "36px",
};

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleRequest = (e: any) => {
    e.preventDefault(); // Prevent the page from reloading

    fetch("https://off-the-ramp-api.onrender.com/api/v1/offramp-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PhoneNumber: phoneNumber,
        Token: token,
        Amount: parseFloat(amount), // Ensure the amount is a number
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success: The request was successful!"); // Log a success message
        console.log("Response Data:", data); // Log the success response data
        setResponse(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error); // Log the error
        setError(error.message);
      });
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#040C18", pb: "10%" }}>
      <Toolbar />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid
            item
            sx={{ display: "flex", alignItems: "center" }}
            xs={12}
            md={6}
          >
            <Box>
              <Heading
                sx={{ fontSize: { md: "62px", sm: "50px", xs: "30px" } }}
              >
                The Best On-ramp and Off-ramp product in Africa{" "}
              </Heading>
              <GeneralTypo sx={{ mt: "4%" }}>
                The best seamless platform for converting crypto to your local
                currency.
              </GeneralTypo>
              <Box
                sx={{
                  mt: "7%",
                  display: "flex",
                }}
              >
                <CustomTextField fullWidth />
                <GetStartedButton>Get Started</GetStartedButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: { md: "3%", xs: "4%" },
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <AvatarGroup total={1600} sx={style}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={style}
                  />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                    sx={style}
                  />
                  <Avatar
                    alt="Agnes Walker"
                    src="/static/images/avatar/4.jpg"
                    sx={style}
                  />
                  <Avatar
                    alt="Trevor Henderson"
                    src="/static/images/avatar/5.jpg"
                    sx={style}
                  />
                </AvatarGroup>
                <GeneralTypo sx={{ letterSpacing: "0px" }}>
                  1,600 people requested access a visit in last 24 hours
                </GeneralTypo>
              </Box>
            </Box>
          </Grid>
          <Grid item sx={{}} xs={12} md={6}>
            <Box>
              <Image
                src="/africa.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "7%" }}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ maxWidth: "800px" }}>
                    <Heading
                      sx={{
                        fontSize: { md: "62px", sm: "50px", xs: "30px" },
                        textAlign: "center",
                      }}
                    >
                      Get Access to your Funds any time, at any place
                    </Heading>
                  </Box>
                </Box>

                <GeneralTypo sx={{ mt: "4%" }}>
                  Competitive pricing: Access a wider pool of potential buyers,
                  leading to potentially higher returns and fairer valuations.
                </GeneralTypo>
                <GeneralTypo sx={{ mt: "2%" }}>
                  Transparent market data: Gain insights into market trends and
                  asset valuations to make informed investment decisions.
                </GeneralTypo>
                <GeneralTypo sx={{ mt: "2%" }}>
                  Mitigate holding period risk: Avoid being locked into
                  underperforming assets for extended periods.
                </GeneralTypo>
                <GeneralTypo sx={{ mt: "2%" }}>
                  Increased certainty and planning: Gain predictability in your
                  portfolio management and financial planning.
                </GeneralTypo>
                <GeneralTypo sx={{ mt: "2%" }}>
                  Reinvest and diversify: Free up capital to invest in new
                  opportunities or diversify your portfolio across more liquid
                  assets.
                </GeneralTypo>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid
          container
          sx={{
            mt: "7%",
            borderRadius: "10.724px",
            border: "1px solid #000",
            background:
              "linear-gradient(90deg, #AE67FA 1.84%, #F49867 102.67%)",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            padding: "46px",
          }}
        >
          <Grid item xs={12} md={10}>
            <Box sx={{}}>
              <Box>
                <GeneralTypo
                  sx={{
                    color: "#0E0E0E",
                    letterSpacing: "0px",
                    fontSize: "12px",
                  }}
                >
                  Request Early Access to Get Started
                </GeneralTypo>
                <GeneralTypo
                  sx={{ letterSpacing: "0px", color: "#000", fontWeight: 800 }}
                >
                  Register today & start exploring the endless possiblities.
                </GeneralTypo>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box>
              <BlackButton>Get Started</BlackButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <form onSubmit={handleRequest}>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Token:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Request</button>
        {response && <div>Response: {JSON.stringify(response)}</div>}
        {error && <div>Error: {error}</div>}
      </form>
    </Box>
  );
}
