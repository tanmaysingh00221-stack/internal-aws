import type {
    NextFunction,
    Request,
    Response,
} from "express";

import jwt from "jsonwebtoken";

import type { AuthUser } from "../types.js";

export function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization?.replace(
        /^Bearer\s+/,
        ""
    );

    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    try {
        req.user = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as AuthUser;

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}