import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Clapperboard } from "lucide-react";

export async function Actions() {
	const user = await currentUser();

	return (
		<div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
			{!user && (
				<SignInButton>
					<Button variant="primary" size="sm">
						Login
					</Button>
				</SignInButton>
			)}

			{!!user && (
				<div className="flex items-center gap-x-4">
					<Button
						size="sm"
						variant="ghost"
						className="text-muted-foreground hover:text-primary"
						asChild
					>
						<Link href={`/u/${user.username}`}>
							<Clapperboard className="size-5 lg:mr-2" />
							<span className="hidden lg:block">Dashboard</span>
						</Link>
					</Button>
					<UserButton afterSignOutUrl="/" />
				</div>
			)}
		</div>
	);
}

export function LoadingSpinnerButton() {
	return (
		<div className="border-gray-300 size-8 animate-spin rounded-full border-4 border-t-blue-600" />
	);
}
