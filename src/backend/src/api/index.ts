import { Router, Request, Response } from "express";
import { stkPush, callback , testMpesaAuth, queue, result,statusRouter} from "../payment-gateway/mpesa/";

let router = Router();

router.get("/test-root-api", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Off The Ramp API",
  });
});

router.get("/test-mpesa-auth", testMpesaAuth);
router.post("/stk-push", stkPush);
router.post("/callback", callback);
router.post("/queue", queue);
router.post("/result", result);
router.post("/status", statusRouter);




export { router as api};
