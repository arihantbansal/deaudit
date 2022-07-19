import supabase from "../supabase/client.js";

/**
 * Add user data
 * @route POST /user/
 */
export const addUser = async (req, res) => {
	if (!req.body.hasOwnProperty("name")) {
		return res.status(400).json({
			message: "Name is required",
		});
	}

	let { name } = req.body;

	const { data, error } = await supabase.from("users").insert([
		{
			name,
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
