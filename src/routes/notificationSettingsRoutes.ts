import { Router } from "express";

import { getNotificationSettings } from "../controllers/NotificationSettingsController";

const router = Router();

router.get('/', getNotificationSettings);

export default router;