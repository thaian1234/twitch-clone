import { db } from "@/lib/db";

export const getStreamByUserId = async (userId: string) => {
	const steam = await db.stream.findUnique({
		where: { userId },
	});

	return steam;
};
