import httpStatus from "http-status";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { SportsService } from "./sports.services";
import {
  deleteImageFromCloudinary,
  sendImageToCloudinary,
} from "../multer/upload";
import { UploadApiResponse } from "cloudinary";
import { Sport } from "./sports.model";
import { ErrorHandler } from "../utils/error";

const handleCreateSports = catchAsync(async (req, res) => {
  const resp = (await sendImageToCloudinary(
    req.file!.filename,
    req.file!.path
  )) as UploadApiResponse;

  const result = await SportsService.createSportsService({
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Sports created successfully",
    data: result,
  });
});

const handleGetAllSports = catchAsync(async (req, res) => {
  const query = req.query;  
  const result = await SportsService.getAllSportsService(query);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sports retrieved successfully",
    data: result,
  });
});
const handleGetSports = catchAsync(async (req, res) => {
  const result = await SportsService.getSportsService();
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sports retrieved successfully",
    data: result,
  });
});
const handleGetSingleSport = catchAsync(async (req, res) => {
  const result = await SportsService.getSingleSportService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sport retrieved successfully",
    data: result,
  });
});
const handleUpdateSport = catchAsync(async (req, res) => {
  const sports = await Sport.findById(req.body.id);
  if (!sports) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Sports not found");
  }
  await deleteImageFromCloudinary(sports.image.public_id);

  const resp = (await sendImageToCloudinary(
    req.file!.filename,
    req.file!.path
  )) as UploadApiResponse;

  const updateSports = {
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  };
  const result = await SportsService.updateSportsService(
    req.body.id,
    updateSports
  );
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sport updated successfully",
    data: result,
  });
});

const handleUpdateStockWithCashOn = catchAsync(async (req, res) => {
  console.log("check payload", req.body.orders);
  const result = await SportsService.updateStockWithCashOnDelivery(
    req.body.orders
  );

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Stock updated successfully",
    data: result,
  });
});
const handleDeleteSport = catchAsync(async (req, res) => {
  const result = await SportsService.deleteSportsService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sports deleted successfully",
    data: result,
  });
});
const handleContactForm = catchAsync(async (req, res) => {
  console.log("contact info ", req.body);
  const result = await SportsService.contactFormSubmit(req.body);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Contact form submitted successfully",
    data: result,
  });
});
const handleCreateReview = catchAsync(async (req, res) => {
  const result = await SportsService.createReviewService(
    req.params.id,
    req.body
  );

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review created successfully",
    data: result,
  });
});

export const sportsController = {
  handleCreateSports,
  handleGetAllSports,
  handleGetSingleSport,
  handleUpdateSport,
  handleDeleteSport,
  handleUpdateStockWithCashOn,
  handleContactForm,
  handleGetSports,
  handleCreateReview,
};
