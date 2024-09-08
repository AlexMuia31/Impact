import { Box, Container, Toolbar } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import GetFiat from "@/components/GetFiat";
import GetCrypto from "@/components/GetCrypto";
import ConnectWallet from "@/components/ConnectWallet";
import { CustomTextField } from "@/components/TextFields";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Transactions = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#040C18",
        display: "flex",
        alignItems: "center",
        pt: "10%",
        pb: "10%",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ background: "#031B34", borderRadius: "5px !important" }}>
          <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
            {" "}
            <ConnectWallet />
          </Box>
          <AppBar position="static" sx={{ background: "#DE0687" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Get Fiat" {...a11yProps(0)} />
              <Tab label="Get Crypto" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <GetFiat />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <GetCrypto />
            </TabPanel>
          </SwipeableViews>
        </Box>
        <Box
          sx={{
            background: "#031B34",
            borderRadius: "5px !important",
            mt: "4%",
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ color: "#fff", textAlign: "center" }}>
            Withdraw to Mpesa
          </Typography>
          <Typography sx={{ color: "#fff", mt: "4%" }}>
            Enter your Phone Number:
          </Typography>
          <CustomTextField
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "#fff",
                },
                color: "#fff",
                backgroundColor: "grey",
                borderRadius: "12px",
              },
            }}
          />
          <Typography sx={{ color: "#fff", mt: "2%" }}>
            Enter amount:
          </Typography>
          <CustomTextField
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "#fff",
                },
                color: "#fff",
                backgroundColor: "grey",
                borderRadius: "12px",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Transactions;
