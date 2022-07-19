import supabase from "../supabase/client.js";

/**
 * Add user data
 * @route POST /user/
 */
export const addUser = async (req, res) => {
	let { name, address } = req.body;

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

/**
 * Retrieve user data
 * @route GET /user/:id
 */
export const getUserData = async (req, res) => {
	let { data: users, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", req.params.id);

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
		.where("id", req.params.id);

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
