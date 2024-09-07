import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CustomTextField = styled(TextField)({
  backgroundColor: "gray",
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "5px 0px 0px 5px",
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
  ".MuiInputBase-root": {
    backgroundColor: "#052D56",
  },
  "& .MuiSelect-icon": {
    color: "#000",
  },
});
