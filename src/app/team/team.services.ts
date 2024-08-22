import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";

import QueryBuilder from "../QueryBuilder/queryBuilder";
import { ITeam } from "./team.interface";
import { Team } from "./team.model";

// create a new Team service
const createTeamService = async (payload: Partial<ITeam>) => {
  const Teams = await Team.create(payload);
  if (!Teams) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to create Teams");
  }
  return Teams;
};

// get all teams members
const getAllTeamsService = async (query: Partial<ITeam>) => {
  const features = new QueryBuilder(Team.find(), query)
    .searchByName()
    .pagination();

  const Teams = await features.query;

  return Teams;
};

// get a single team member service
const getSingleTeamService = async (id: string) => {
  const Teams = await Team.findById(id);
  if (!Teams) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Teams  Found");
  }
  return Teams;
};

// update a single team member service
const updateTeamsService = async (
  id: string,
  payload: Record<string, string>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = ["name", "role", "image"];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }

  const result = await Team.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update Teams");
  }

  return result;
};

// delete a single team member service
const deleteTeamService = async (id: string) => {
  const result = await Team.findByIdAndDelete(id);
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to delete Teams");
  }

  return result;
};

export const TeamsService = {
  createTeamService,
  getAllTeamsService,
  getSingleTeamService,
  updateTeamsService,
  deleteTeamService,
};
