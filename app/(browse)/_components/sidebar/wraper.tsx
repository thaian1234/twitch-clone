"use client";
import { cn } from "@/lib/utils";
import { useSiderbar } from "@/store/use-side-bar";

interface WrapperProps {
	children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
	const { collapsed } = useSiderbar((state) => state);

	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-[50]",
				collapsed && "w-[70px]"
			)}
		>
			{children}
		</aside>
	);
}
