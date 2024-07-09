import httpStatus from "http-status";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { SportsService } from "./sports.services";
import { sendImageToCloudinary } from "../multer/upload";
import { UploadApiResponse } from "cloudinary";

const handleCreateSports = catchAsync(async(req, res) => {     
    const resp = await sendImageToCloudinary(req.file!.filename, req.file!.path) as UploadApiResponse   

    const result = await SportsService.createSportsService({...req.body, image: resp.secure_url  });   
    successResponse(res, {
        success:true, 
        statusCode:201, 
        message: "Sports retrieved successfully",
        data: result
    })
})

const handleGetAllSports = catchAsync(async(req, res) => {      
    const result = await SportsService.getAllSportsService();   
    successResponse(res, {
        success:true, 
        statusCode:  httpStatus.OK, 
        message: "Sports retrieved successfully",
        data: result
    })
})
const handleGetSingleSport = catchAsync(async(req, res) => {      
    const result = await SportsService.getSingleSportService(req.params.id);   
    successResponse(res, {
        success:true, 
        statusCode:  httpStatus.OK, 
        message: "Sport retrieved successfully",
        data: result
    })
})
const handleUpdateSport = catchAsync(async(req, res) => {    
    const updateSports = req.body;
    const result = await SportsService.updateSportsService(req.params.id, updateSports);
    successResponse(res, {
        success:true, 
        statusCode:  httpStatus.OK, 
        message: "Sport updated successfully",
        data: result
    })
})
const handleDeleteSport = catchAsync(async(req, res) => { 
    const result = await SportsService.deleteSportsService(req.params.id);
    successResponse(res, {
        success:true, 
        statusCode:  httpStatus.OK, 
        message: "Sports updated successfully",
        data: result
    })
})
const handleContactForm = catchAsync(async(req, res) => { 
    const result = await SportsService.contactFormSubmit(req.body);
    successResponse(res, {
        success:true, 
        statusCode:  httpStatus.OK, 
        message: "Contact form submitted successfully",
        data: result
    })
})


export const sportsController = {
    handleCreateSports,
    handleGetAllSports,
    handleGetSingleSport,
    handleUpdateSport,
    handleDeleteSport,
    handleContactForm
}