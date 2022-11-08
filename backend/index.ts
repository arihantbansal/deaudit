import app from "./app";
import { PORT } from "./utils/config";

app.listen(PORT, function () {
	console.log(`Server started on port ${PORT}`);
});

export {};
