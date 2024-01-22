import { isFollwingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
	params: {
		username: string;
	};
}

export default async function UserPage({ params }: UserPageProps) {
	const user = await getUserByUsername(params.username);

	if (!user) notFound();

	const isFollowingData = isFollwingUser(user.id);
	const isBlockedData = isBlockedByUser(user.id);
	const [isFollowing, isBlocked] = await Promise.all([
		isFollowingData,
		isBlockedData,
	]);

	return (
		<div className="flex flex-col gap-y-4">
			<p>Username: {user.username}</p>
			<p>User id: {user.id}</p>
			<p>Is following: {`${isFollowing}`}</p>
			<p>is blocked by this user: {`${isBlocked}`}</p>
			<Actions userId={user.id} isFollowing={isFollowing} />
		</div>
	);
}
