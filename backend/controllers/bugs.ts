import supabase from "../supabase/client";

/**
 * Retrieve bug data by audit
 * @route GET /bugs/audits/:address
 */
export const getBugsByAudit = async (req, res) => {
	const { data: bugs, error } = await supabase
		.from("bugs")
		.select("*")
		.eq("audit_id", req.params.address);

	if (error) {
		return res.status(500).json({
			message: "Error fetching bugs",
			error,
		});
	}

	return res.status(200).json({
		data: bugs,
	});
};

/**
 * Retrieve bug data by user
 * @route GET /bugs/users/:address
 */
export const getBugsByUser = async (req, res) => {
	const { data: bugs, error } = await supabase
		.from("bugs")
		.select("*")
		.eq("reported_by", req.params.address);

	if (error) {
		return res.status(500).json({
			message: "Error fetching bugs",
			error,
		});
	}

	return res.status(200).json({
		data: bugs,
	});
};

export const addBug = async (req, res) => {
	const {audit_id, reported_by, description} = req.body;

	const { data, error } = await supabase.from("bugs").insert([
		{
			audit_id,
			reported_by,
			description
		},
	]);

	if (error) {
		return res.status(500).json({
			message: "Error adding bug",
			error,
		});
	}

	return res.status(200).json({
		data: data[0].id,
	});
};

