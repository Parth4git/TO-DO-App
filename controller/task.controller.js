import Task from "../models/task.js";
import ErrorHandeler from "../middleware/error.js";

export  const newTask = async(req,res,next)=>{
try {
    
    const {title,description}=req.body;

    await Task.create({
        title,description,user:req.user._id
    });

    res.status(201).json({
        sucess:true,
        message:"task created successfully"
    })

    
} catch (error) {
    next(error)
}
}

export const getMyTask=async (req,res,next) => {
    try {
        
    const tasks=await Task.find({user:req.user._id})
    res.status(200).json({
        sucess:true,
        tasks
    })

    } catch (error) {
        next(error)
    }

}

export const updateMyTask=async (req,res,next) => {
    try {
       
    const task =await Task.findById(req.params.id);
    
    if(!task) return next ( new ErrorHandeler("Task not found",404));

    task.status=!task.status;

    await task.save();

    res.status(200).json({
        sucess:true,
        message:"task updated successfully"
    })
 
    } catch (error) {
       next(error) 
    }
}

export const deleteMyTask=async (req,res,next) => {
   
 try {
    const task = await Task.findById(req.params.id);

// Ensure that the task exists before attempting to delete it
if (!task) {
    return next (new ErrorHandeler("Task not found", 404));
}

// Delete the task
await task.deleteOne(); // or task.deleteMany() if you're deleting multiple documents

// Send response
res.status(200).json({
    success: true,
    message: "Task deleted successfully"
});
 } catch (error) {
   next(error) 
 }


}
