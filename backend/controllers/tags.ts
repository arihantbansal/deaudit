import supabase from "../supabase/client";

export const getAllTags = async (req, res) => {
	const { data: tags, error } = await supabase.from("audits").select("tags");

	if (error) {
		return res.status(500).json({
			message: "Error fetching audits",
			error,
		});
	}

	const result = [...new Set(tags)];
	return res.status(200).json({
		data: result[0],
	});
};
