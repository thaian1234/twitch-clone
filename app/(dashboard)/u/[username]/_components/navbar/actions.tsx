import Link from "next/link";

import { UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export async function Actions() {
	const user = await currentUser();

	return (
		<div className="flex items-center justify-end gap-x-2 ">
			<Button
				asChild
				size="sm"
				variant="ghost"
				className="text-muted-foreground hover:text-primary"
			>
				<Link href="/">
					<LogOut className="size-5 mr-2" />
					Exit
				</Link>
			</Button>

			<UserButton afterSignOutUrl="/" />
		</div>
	);
}
