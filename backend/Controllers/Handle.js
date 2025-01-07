const SignupData = require("../Model/Signup")
const { setUser } = require("../Authentication/jwt")
const upload = require('../multer/multerConfig');
const uploadToS3 = require('../utils/s3Upload');

// SignUP (Create and Read)

const signup = async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;

    try {
        const uniqueEmail = await SignupData.findOne({ email });

        if (uniqueEmail) {
            return res.status(409).send({ message: 'User already exists' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Create user data
        const userData = new SignupData({
            name,
            email,
            phone,
            password,

            image: req.file ? `/uploads/${req.file.filename}` : null,
        });

        await userData.save();
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// (Delete)

const remove = async (req, res) => {
    const userID = req.params.id;

    try {
        const deleteUser = await SignupData.findByIdAndDelete(userID);
        if (!deleteUser) {
            return res.status(400).json({ message: "There is an issue while deleting user profile" });
        }
        res.status(200).json({ message: "User profile is deleted" });
    } catch (error) {
        console.log(error);
    }
}

// edit

const edit = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const updateData = { name, email, phone };
        if (password) {
            updateData.password = password; // Include password only if provided
        }

        const updatedUser = await SignupData.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userLogin = await SignupData.findOne({ email, password });

        if (!userLogin) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = setUser(userLogin);
        res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'LAX' });
        console.log(token);

        return res.status(200).json({ status: 'Login success' });

    } catch (error) {
        console.log(error);
    }
}

// Logout

const logout = async (req, res) => {
    try {
        res.clearCookie('token', { path: '/' }); // Adjust the path if necessary
        return res.status(200).json({ message: 'Cookie cleared' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Error clearing cookie' });
    }
};

//upload file 

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const localFilePath = req.file.path;
        const bucketName = 'broadlinkprotect';
        const keyName = `${Date.now()}_${req.file.originalname}`; // Unique file name

        // Upload to 'blogs/' folder in S3
        const s3Url = await uploadToS3(localFilePath, bucketName, keyName);
        fs.unlinkSync(localFilePath);  // Remove the local file after uploading to S3

        res.status(200).json({ message: 'File uploaded successfully', s3Url });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signup, login, edit, remove, logout, uploadFile }