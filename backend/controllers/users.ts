import supabase from "../supabase/client";

/**
 * Add user data
 * @route POST /user/
 */
export const addUser = async (req, res) => {
	const { name, address } = req.body;

	const { data, error } = await supabase.from("users").insert([
		{
			name,
			address,
		},
	]);

	if (error) {
		return res.status(500).json({
			message: "Error adding user",
			error,
		});
	}

	return res.status(200).json({
		data: data[0],
	});
};

export const getAllUsers = async (req, res) => {
	const { data: users, error } = await supabase
		.from("users")
		.select("*")
		.order("id", { ascending: false });

	if (error) {
		return res.status(500).json({
			message: "Error fetching users",
			error,
		});
	}

	return res.status(200).json({
		data: users,
	});
};

/**
 * Retrieve user data
 * @route GET /user/:id
 */
export const getUserData = async (req, res) => {
	const { data: users, error } = await supabase
		.from("users")
		.select("*")
		.eq("address", req.params.address);

	if (error) {
		return res.status(500).json({
			message: "Error fetching user data",
			error,
		});
	}

	return res.status(200).json({
		data: users[0],
	});
};

/**
 * Update user data
 * @route PUT /user/:id
 */
export const updateUserData = async (req, res) => {
	const { data: user, error } = await supabase
		.from("users")
		.update([{ ...req.body }])
		.eq("address", req.params.address);

	if (error) {
		return res.status(500).json({
			message: "Error updating user data",
			error,
		});
	}

	return res.status(200).json({
		data: user[0],
	});
};
