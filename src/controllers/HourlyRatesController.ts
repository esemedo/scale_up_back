import { Request, Response } from "express";
import {
  addHourlyRate as addHourlyRateMiddleware,
  getAllHourlyRates as getAllHourlyRatesMiddleware,
  getHourlyRateById as getHourlyRateByIdMiddleware,
  updateHourlyRate as updateHourlyRateMiddleware,
  updateHourlyRateRealRate as updateHourlyRateRealRateMiddleware,
  deleteHourlyRate as deleteHourlyRateMiddleware,
  getAllSubjectsNames as getAllSubjectsNamesMiddleware,
} from "../middlewares/hourlyRatesMiddleware";

export const addHourlyRate = async (req: Request, res: Response) => {
  return addHourlyRateMiddleware(req, res);
};

export const getAllHourlyRates = async (req: Request, res: Response) => {
  return getAllHourlyRatesMiddleware(req, res);
};

export const getHourlyRateById = async (req: Request, res: Response) => {
  return getHourlyRateByIdMiddleware(req, res);
};

export const updateHourlyRate = async (req: Request, res: Response) => {
  return updateHourlyRateMiddleware(req, res);
};

export const updateHourlyRateRealRate = async (req: Request, res: Response) => {
  return updateHourlyRateRealRateMiddleware(req, res);
};

export const deleteHourlyRate = async (req: Request, res: Response) => {
  return deleteHourlyRateMiddleware(req, res);
};

export const getAllSubjectsNames = async (req: Request, res: Response) => {
  return getAllSubjectsNamesMiddleware(req, res);
};
