const Logger =(req,res,next) => {
    console.log("middleware is running");
    next();
}
export default Logger;