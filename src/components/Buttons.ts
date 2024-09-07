import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GetStartedButton = styled(Button)({
  borderRadius: "0px 5px 5px 0px",
  background: "#DE0687",
  whiteSpace: "nowrap",
  color: "#fff",
  "&:hover": {
    background: "#DE0687",
    //test
  },
  paddingRight: "4%",
  paddingLeft: "4%",
  textTransform: "capitalize",
});

export const BlackButton = styled(Button)({
  width: "189px",
  color: "#fff",
  height: "59px",
  borderRadius: "40px",
  background: "#000",
  "&:hover": {
    background: "#000",
  },
});

export const FooterButton = styled(Button)({
  border: "1px solid #FFF",
  color: "#fff",
  textTransform: "capitalize",
  padding: "1%",
});

export const PinkButton = styled(Button)({
  background: "#DE0687",
  whiteSpace: "nowrap",
  color: "#fff",
  "&:hover": {
    background: "#DE0687",
  },
  paddingRight: "4%",
  paddingLeft: "4%",
  textTransform: "capitalize",
});
