import supabase from "../supabase/client";

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
	const { data: audits, error } = await supabase
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
	const { data: audit, error } = await supabase
		.from("audits")
		.select("*")
		.eq("contract_address", req.params.address);

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

/**
 * Update audit data
 * @route PUT /audit/:id
 */
export const updateAuditData = async (req, res) => {
	const { data, error } = await supabase
		.from("audits")
		.update([
			{
				...req.body,
			},
		])
		.eq("contract_address", req.params.address);

	if (error) {
		return res.status(500).json({
			message: "Error updating audit",
			error,
		});
	}

	return res.status(200).json({
		data: data[0],
	});
};
