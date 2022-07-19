import supabase from "../supabase/client.js";

/**
 * Add audit data
 * @route POST /audit/
 */
export const addAudit = async (req, res) => {
	const { data, error } = await supabase.from("audits").insert([
		{
			...req.body,
		},
	]);

	if (error) {
		return res.status(500).json({
			message: "Error adding audit",
			error,
		});
	}

	return res.status(200).json({
		data: data[0],
	});
};

/**
 * Retrieve all audits
 * @route GET /audit/
 */
export const getAllAudits = async (req, res) => {
	let { data: audits, error } = await supabase
		.from("audits")
		.select("*")
		.order("id", { ascending: false });

	if (error) {
		return res.status(500).json({
			message: "Error fetching audits",
			error,
		});
	}

	return res.status(200).json({
		data: audits,
	});
};

/**
 * Retrieve audit data
 * @route GET /audit/:id
 */
export const getAuditData = async (req, res) => {
	let { data: audit, error } = await supabase
		.from("audits")
		.select("*")
		.eq("id", req.params.id);

	if (error) {
		return res.status(500).json({
			message: "Error fetching audit data",
			error,
		});
	}

	return res.status(200).json({
		data: audit[0],
	});
};
