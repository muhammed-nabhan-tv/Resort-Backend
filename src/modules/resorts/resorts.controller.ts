import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import {
  getAllResorts,
  getResortById,
} from "../resorts/resorts.services";

export const getResorts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resorts = await getAllResorts();

    return res.status(200).json({
      success: true,
      count: resorts.length,
      data: resorts,
    });
  } catch (error) {
    next(error);
  }
};

export const getResort = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
  return res.status(400).json({
    success: false,
    message: "Invalid resort ID",
  });
}

    const resort = await getResortById(id);

    if (!resort) {
      return res.status(404).json({
        success: false,
        message: "Resort not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: resort,
    });
  } catch (error) {
    next(error);
  }
};