
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const UserSchema = mongoose.Schema({
    //_id:Number,
    name:{
        type : String,
        required:[true,"Name is required"],
        lowercase: true,
        trim:true,
    },

    email:{
        type : String,
        requires:[true,"Email is required "],
        unique: true,
        lowercase:true,
        trim:true
    },
    mobile:{
        type:String,
        required:[true,"Mobile is required"],
        maxlength:10,
        minlength:10,
        trim:true
    },
    password:{
        type :String,
        required:[true,"Password is required"],
        minlength:5,
        trim:true
    },
   
     address:{
         type:String,
         required:[true,"Address is required "],
         trim : true
     },
     city:{
         type:String,
         required:[true,"City is required"],
         trim: true
     },
     gender:{
         type:String,
         reqiured:[true,"Gender is required"],
     },
     isAdmin:{
      type : Boolean,
     default :false,
     },
     role:String,
     status:Number,
     info:String
});

//jWT
UserSchema.methods.generateToken = async function (){
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email :this.email,
            isAdmin : this.isAdmin,
        },
         process.env.JWT_SECRET_KEY,
         {
            expiresIn : "30d",
         }
    );
        
    } catch (error) {
        console.error(error);
    }

}



//password hashing
UserSchema.pre("save",async function(){
    //console.log("pre method",this)

    const user = this;

    if(!user.isModified("password")){
        next();
    }
    
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
    }catch(error){
        next(error);
    }

});

//Compare password
UserSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password,this.password);
};





const UserSchemaModel = mongoose.model('user_collection',UserSchema);
module.exports = UserSchemaModel;