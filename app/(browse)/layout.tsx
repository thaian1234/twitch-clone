import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

export default function BrowseLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			<div className="flex h-full pt-20">
				<Sidebar />
				<Container>{children}</Container>
			</div>
		</>
	);
}