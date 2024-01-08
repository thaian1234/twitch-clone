import { resolve } from "path";
import { db } from "./db";
import { getSelf } from "@/lib/auth-service";
import { delay } from "./delay";

export const getRecommended = async () => {
	const users = await db.user.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return users;
};
