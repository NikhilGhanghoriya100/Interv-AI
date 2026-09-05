import User from "../models/user.model.js"

export const getCurrentuser = async(req,res)=>{
   try {
    const userId = req.userId
    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({message:"user does not found"})
    }
    
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `failed to get currentUser ${error}` });
  }
};

export const buyCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const { credits, planName, amount } = req.body;

    const creditAmount = Number(credits);
    if (!creditAmount || creditAmount <= 0) {
      return res.status(400).json({ message: "Invalid credits amount" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.credits = (user.credits || 0) + creditAmount;
    await user.save();

    return res.status(200).json({
      message: `Successfully purchased ${creditAmount} credits!`,
      credits: user.credits,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: `Failed to add credits: ${error.message || error}` });
  }
};