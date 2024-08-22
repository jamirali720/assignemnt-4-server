import { Schema, model } from "mongoose";
import { ITeam } from "./team.interface";


const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },

    image: {
      url: {
        type: String,
        required: [true, "Image Url is required"],
      },
      public_id: {
        type: String,
        required: [true, "Public ID is required"],
      },
    },
  },
  { timestamps: true }
);

export const Team = model<ITeam>("Team", teamSchema);
