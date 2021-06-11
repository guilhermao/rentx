import { Router } from "express";

import { ResetUserPasswordController } from "@modules/accounts/usecases/resetUserPassword/ResetUserPasswordController";
import { SendForgotPassWordMailController } from "@modules/accounts/usecases/sendForgotPasswordMail/SendForgotPassWordMailController";

const passwordRoutes = Router();

const sendForgotPassWordMailController = new SendForgotPassWordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotPassWordMailController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);

export { passwordRoutes };
