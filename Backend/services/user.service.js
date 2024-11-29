const userModel = require("../models/user.model");

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }

    // Check if a user already exists with the provided email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    try {
        // Create and save the new user
        const user = await userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });

        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};
