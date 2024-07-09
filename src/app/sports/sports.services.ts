import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";
import { Sport } from "./sports.model";
import { ISports } from "./sports.interface";
import { sendContactEmail } from "../utils/nodemailer";

const createSportsService = async (payload:Partial<ISports>) => {  
  const sports = await Sport.create(payload);
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to create Sports");
  }
  return sports;
};
const getAllSportsService = async () => {
  const sports = await Sport.find();
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No sports Data Found");
  }
  return sports;
};

const getSingleSportService = async (id: string) => {
  const sports = await Sport.findById(id);
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No sports  Found");
  }
  return sports;
};

const updateSportsService = async (
  id: string,
  payload: Record<string, string>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = ["name", "category", "brand", "description", "price"];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }

  const result = await Sport.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update sports");
  }

  return result;
};
const deleteSportsService = async (id: string) => {
  const result = await Sport.findByIdAndDelete(id);
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to delete sports");
  }

  return result;
};
const contactFormSubmit = async (payload: { email: string; subject: string; text: string; html: string }) => {
  
  const result = await sendContactEmail(payload)
  if (!result) {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Failed to send contact information");
  }

  return result;
};

export const SportsService = {
  createSportsService,
  getAllSportsService,
  getSingleSportService,
  updateSportsService,
  deleteSportsService,
  contactFormSubmit
};
