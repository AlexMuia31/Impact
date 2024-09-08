import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { PinkButton } from "./Buttons";
import { CustomTextField } from "./TextFields";
import { useGetConnectUserMutation, useGetBalanceQuery } from "@/Api/services";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import truncateEthAddress from "truncate-eth-address";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#040D18",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const ConnectWallet = () => {
  const [open, setOpen] = React.useState(false);
  const [connect, setConnect] = React.useState({
    PhoneNumber: "",
    isTestNet: true,
  });

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [balance, setBalance] = React.useState<number | null>(null);

  const [connectUser, { isSuccess, isError, isLoading }] =
    useGetConnectUserMutation();

  const {
    data,
    isError: balanceError,
    isLoading: balanceLoading,
    isSuccess: balanceSuccess,
    refetch: refetchBalance,
  } = useGetBalanceQuery(walletAddress, { skip: !walletAddress });

  const handleConnectUser = async (event: any) => {
    event.preventDefault();
    try {
      const response = await connectUser(connect).unwrap();
      console.log("Success:", response);
      setSnackbarMessage("Connected successfully!");
      setSnackbarOpen(true);
      setWalletAddress(response.data.eth_address);
      setIsConnected(true);
      setBalance(response.balance.balance);
      localStorage.setItem("walletAddress", response.data.eth_address);
      localStorage.setItem("balance", response.balance.balance);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setConnect((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  React.useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    const savedBalance = localStorage.getItem("balance");

    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setIsConnected(true);
    }
    if (savedBalance) {
      setBalance(Number(savedBalance));
    }
  }, []);

  React.useEffect(() => {
    if (walletAddress) {
      refetchBalance();
    }
  }, [walletAddress, refetchBalance]);

  const handleCopy = () => {
    setIsCopied(true);
    setSnackbarMessage("Wallet address copied to clipboard!");
    setSnackbarOpen(true);
  };

  const handleDisconnect = () => {
    // Clear the local storage
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("balance");

    // Reset the state
    setWalletAddress(null);
    setBalance(null);
    setIsConnected(false);

    setSnackbarMessage("Wallet disconnected!");
    setSnackbarOpen(true);
  };

  return (
    <Box>
      {walletAddress && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Wallet Address: {truncateEthAddress(walletAddress)}
            </Typography>
            <CopyToClipboard text={walletAddress} onCopy={handleCopy}>
              <IconButton>
                <ContentCopyIcon sx={{ color: "#ffff" }} />
              </IconButton>
            </CopyToClipboard>
          </Box>

          {balance !== null ? (
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Balance: {balance || 0} KSH
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Loading balance...
            </Typography>
          )}

          {/* Disconnect Wallet button */}
          <PinkButton onClick={handleDisconnect} sx={{ mt: 2 }}>
            Disconnect Wallet
          </PinkButton>
        </Box>
      )}
      {!isConnected && (
        <Box
          sx={{
            mt: "4%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#fff" }}>
            Connect your wallet to see your wallet address...
          </Typography>
          <PinkButton sx={{ paddingX: 2 }} onClick={handleOpen}>
            Connect Wallet
          </PinkButton>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleConnectUser}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "#fff", mb: "3%" }}
          >
            Input your number to connect
          </Typography>
          <CustomTextField
            sx={{ mb: "4%" }}
            name="PhoneNumber"
            value={connect.PhoneNumber}
            onChange={handleChange}
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
          <PinkButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </PinkButton>
          {isError && (
            <Typography color="error">
              An error occurred. Please try again.
            </Typography>
          )}
          {isSuccess && (
            <Typography color="success" sx={{ color: "#000" }}>
              Connected successfully!
            </Typography>
          )}
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ConnectWallet;
