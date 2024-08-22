import httpStatus from "http-status";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";

import {
  deleteImageFromCloudinary,
  sendImageToCloudinary,
} from "../multer/upload";
import { UploadApiResponse } from "cloudinary";

import { ErrorHandler } from "../utils/error";
import { TeamsService } from "./team.services";
import { Team } from "./team.model";

// create a new team member
const handleCreateTeam = catchAsync(async (req, res) => {
  const resp = (await sendImageToCloudinary(
    req.file!.filename,
    req.file!.path
  )) as UploadApiResponse;

  const result = await TeamsService.createTeamService({
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Team created successfully",
    data: result,
  });
});

// get all teams members
const handleGetAllTeams = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await TeamsService.getAllTeamsService(query);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Teams retrieved successfully",
    data: result,
  });
});

// get single team member
const handleGetSingleTeam = catchAsync(async (req, res) => {
  const result = await TeamsService.getSingleTeamService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Sport retrieved successfully",
    data: result,
  });
});

// update team member information
const handleUpdateTeam = catchAsync(async (req, res) => {
  const team = await Team.findById(req.body.id);
  if (!team) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Team not found");
  }
  await deleteImageFromCloudinary(team.image.public_id);

  const resp = (await sendImageToCloudinary(
    req.file!.filename,
    req.file!.path
  )) as UploadApiResponse;

  const updateTeam = {
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  };
  const result = await TeamsService.updateTeamsService(req.body.id, updateTeam);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Team updated successfully",
    data: result,
  });
});

// delete team member
const handleDeleteSport = catchAsync(async (req, res) => {
  const result = await TeamsService.deleteTeamService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Team deleted successfully",
    data: result,
  });
});

export const teamController = {
  handleCreateTeam,
  handleGetAllTeams,
  handleGetSingleTeam,
  handleUpdateTeam,
  handleDeleteSport,
};
