const user = require('../models/user')

const getAllUsers = async(req,res)=>{
    try {
        const users  = await user.find({},{password:0});
        if(!users || users.length === 0){
           return res.status(404).json({message:"No Users Found"}) 
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const deleteUserById = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const deletedUser = await user.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting User:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = {getAllUsers,deleteUserById};