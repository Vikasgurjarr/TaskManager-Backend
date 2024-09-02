
const adminMiddleware = async(req,res,next) =>{
    try {
        console.log(req.user);
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message:"You are not authorized to access this route"});
        }
        //res.status(200).json({msg:req.user});
        // If user is an admin , proceed to the next middleware
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;