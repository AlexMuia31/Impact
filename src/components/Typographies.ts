import { alpha, styled } from "@mui/material/styles";
import { TextField, Typography } from "@mui/material";

export const Heading = styled(Typography)({
  background: "linear-gradient(90deg, #AE67FA 1.84%, #F49867 102.67%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
  fontWeight: 800,
  fontFamily: "Manrope",
  lineHeight: "74px",
});

export const GeneralTypo = styled(Typography)({
  color: "#81AFDD",
  fontWeight: 400,
  fontSize: "20px",
  fontFamily: "Manrope",
  letterSpacing: "2px",
  //offRamp
});

export const FooterTypo = styled(Typography)({
  color: "#FFF",
  fontFamily: "Manrope",
  fontSize: " 12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  //onramp
});
