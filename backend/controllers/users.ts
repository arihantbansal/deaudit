import supabase from "../supabase/client";

/**
 * Add user data
 * @route POST /user/
 */
export const addUser = async (req, res) => {
	const { address } = req.body;

	const { data, error } = await supabase.from("users").insert([
		{
			address: address,
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
	const { data: data, error: err } = await supabase
		.from("users")
		.select("audits_requested, jury_of, bugs_reported")
		.eq("address", req.params.address);

	const keys = Object.keys(req.body);

	const { data: user, error } = await supabase
		.from("users")
		.update([
			{
				...req.body,
				audits_requested: keys.includes("audits_requested")
					? data[0].audits_requested === null
						? req.body.audits_requested
						: [...data[0].audits_requested, req.body.audits_requested[0]]
					: data[0].audits_requested,
				jury_of: keys.includes("jury_of")
					? data[0].jury_of === null
						? req.body.jury_of
						: [...data[0].jury_of, req.body.jury_of[0]]
					: data[0].jury_of,
				bugs_reported: keys.includes("bugs_reported")
					? data[0].bugs_reported === null
						? req.body.bugs_reported
						: [...data[0].bugs_reported, req.body.bugs_reported[0]]
					: data[0].bugs_reported,
			},
		])
		.eq("address", req.params.address);

	if (error || err) {
		return res.status(500).json({
			message: "Error updating user data",
			error,
		});
	}

	return res.status(200).json({
		data: user[0],
	});
};
