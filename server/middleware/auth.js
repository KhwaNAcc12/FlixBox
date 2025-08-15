import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next)=>{
    try {
        const { userId } = req.auth();

        const user = await clerkClient.users.getUser(userId)
        console.log(user);
        
        
        if(user.privateMetadata.role !== 'admin'){
            return res.json({success: false, message: "not authorized"})
        }

        next();
    } catch (error) {
        return res.json({ success: false, message: "not authorized" });
    }
}

//     // Corrected this line: req.auth is an object, not a function.
//     const { userId } = req.auth;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authorized: No user ID found." });
//     }

//     const user = await clerkClient.users.getUser(userId);

//     // --- LOGGING FOR DEBUGGING ---

//     // 1. Logging `user.role` as you requested. This will likely print `undefined`.
//     console.log("Attempting to log user.role:", user.role);

//     // 2. Logging the correct value from private metadata. This should show 'admin' or another role.
//     console.log("Value of user.privateMetadata.role:", user.privateMetadata.role);

//     // 3. (Optional but very helpful) Log the entire user object to see all available data.
//     // console.log("Full user object from Clerk:", JSON.stringify(user, null, 2));

//     // --- END LOGGING ---

//     if (user.privateMetadata.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Forbidden: User is not an admin." });
//     }

//     next();
//   } catch (error) {
//     console.error("Error in protectAdmin middleware:", error);
//     return res.status(401).json({ success: false, message: "Not authorized" });
//   }
// };