import  express  from "express";
import { signup,signin, google, signOut } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.get('/signout',signOut)

router.get('/admin/dashboard', (req, res, next) => {
  const isAdmin = req.user && req.user.role === 'admin'; // assuming you attach user details to the request object
  if (isAdmin) {
    // Perform admin-related actions
    res.status(200).json('Admin dashboard');
  } else {
    res.status(403).json('Permission Denied');
  }
});



 


export default router;