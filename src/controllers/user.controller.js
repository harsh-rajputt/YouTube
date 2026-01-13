import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/apiResponse.js';


const registerUser = asyncHandler(async (req, res) => {
     
      const { fullName, username, email, password}= req.body
      console.log("email", email);

      if([fullName, username, email, password].some((field) => field?.trim()==="")){
           throw new ApiError(400, "All fields are required")
      }
     const existedUser = User.findOne({$or: [{email}, {username}]})

     if(existedUser){
          throw new ApiError(409, "User already exists with this email or username")
     }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
     const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
     const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath);

     if(!avatarUpload){
          throw new ApiError(500, "Failed to upload avatar image")
     }
     const newUser = await User.create({
          fullName,
          username: username.toLowerCase(),
          email,
          password,
          avatar: avatarUpload.url,
          coverImage: coverImageUpload?.url || "",
     })

      const userCreate = await User.findById(newUser._id).select(
          "-password -refreshToken -watchHistory"
     );

     if(!userCreate){
          throw new ApiError(500, "Failed to create user")
     }
     return res.status(201).json(
          new ApiResponse(
               201,
               userCreate,
               "User registered successfully",
          )
     );

});     

export { registerUser };