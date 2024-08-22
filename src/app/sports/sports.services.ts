import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";
import { Sport } from "./sports.model";
import { ISports, TQuery, TReview } from "./sports.interface";
import { sendContactEmail } from "../utils/nodemailer";
import QueryBuilder from "../QueryBuilder/queryBuilder";
import { updateStock } from "../utils/updateProduct";

// create a new sports service
const createSportsService = async (payload: Partial<ISports>) => {
  const sports = await Sport.create(payload);
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to create Sports");
  }
  return sports;
};

// get all sports services with the specified parameters
const getAllSportsService = async (query: TQuery) => { 
  const features = new QueryBuilder(Sport.find(), query)
    .searchByName()
    .filter()
    .searchByCategory()
    .searchByBrand()
    .pagination()
    .sorting();

  const sports = await features.query;

  return sports;
};

// get all sports without query parameters
const getSportsService = async () => {
  const sports = await Sport.find();
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No sports Data Found");
  }
  return sports;
};

// get sports latest
const getLatestSportsService = async () => {
  const sports = await Sport.find().sort({ createdAt: -1 }).limit(8);
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No sports Data Found");
  }
  return sports;
};

// get single sport by id
const getSingleSportService = async (id: string) => {
  const sports = await Sport.findById(id);
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No sports  Found");
  }
  return sports;
};

// update sport by id
const updateSportsService = async (
  id: string,
  payload: Record<string, string>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = [
    "name",
    "category",
    "brand",
    "description",
    "price",
    "stock",
    "image",
  ];

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

// update stock with cash on delivery
const updateStockWithCashOnDelivery = async (
  payload: {
    id: string;
    quantity: number;
  }[]
) => {
  const result = payload?.map(async ({ id, quantity }) => {
    await updateStock(id, quantity);
  });

  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update stock");
  }

  return result;
};

// delete sport by id
const deleteSportsService = async (id: string) => {
  const result = await Sport.findByIdAndDelete(id);
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to delete sports");
  }

  return result;
};

// contact information for contact section
const contactFormSubmit = async (payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const result = await sendContactEmail(payload);
  if (!result) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Failed to send contact information"
    );
  }

  return result;
};

// create a new review to a sport
const createReviewService = async (id: string, payload: TReview) => {
  const { name, email, comment, rating } = payload;

  const newReview = { name, email, comment, rating: Number(rating) };

  const sports = await Sport.findById(id);
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No sports found");
  }

  const isReviewed = sports.reviews?.find((review) => review.email === email);
  if (isReviewed) {
    sports.reviews?.forEach((review) => {
      if (review.email === email) {
        review.name = name;
        review.email = email;
        review.comment = comment;
        review.rating = Number(rating);
      }
    });
  } else {
    sports.reviews?.push(newReview);
    sports.numberOfReviews = sports.reviews?.length;
  }

  let averageRating = 0;

  sports.reviews?.forEach((review) => {
    averageRating += review.rating;
  });

  sports.ratings = averageRating / sports.reviews?.length!;
  await sports.save({ validateBeforeSave: false });

  return sports;
};

export const SportsService = {
  createSportsService,
  getAllSportsService,
  getSingleSportService,
  updateSportsService,
  updateStockWithCashOnDelivery,
  deleteSportsService,
  contactFormSubmit,
  getSportsService,
  createReviewService,
  getLatestSportsService,
};
