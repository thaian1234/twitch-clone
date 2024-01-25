"use client";

import Image from "next/image";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uploadthing";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ElementRef, useRef, useState, useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { useRouter } from "next/navigation";
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";
import { onDeleteFile } from "@/actions/upload";

interface InfoModalProps {
	initialName: string;
	initialThunbnailUrl: string | null;
}

type InfoInputs = {
	name: string;
	thumbnailUrl: string | null;
};

export function InfoModal({
	initialName,
	initialThunbnailUrl,
}: InfoModalProps) {
	const router = useRouter();
	const { register, handleSubmit, setValue, getValues } = useForm<InfoInputs>(
		{
			defaultValues: {
				name: initialName,
				thumbnailUrl: initialThunbnailUrl,
			},
		}
	);
	const [isPending, startTransition] = useTransition();
	const closeRef = useRef<ElementRef<"button">>(null);
	const thumbnailUrl = getValues("thumbnailUrl");

	const onRemove = () => {
		startTransition(() => {
			onDeleteFile(thumbnailUrl)
				.then(() => {
					setValue("thumbnailUrl", "");
					toast.success("Thumbnail removed");
				})
				.catch(() => toast.error("Cannot upload image"));
		});
	};

	const onSubmit = handleSubmit((data) => {
		if (data.name === initialName) {
			closeRef.current?.click();
			return toast.success("Stream updated");
		}

		startTransition(() => {
			updateStream({ name: data.name })
				.then(() => {
					toast.success("Stream updated");
					closeRef.current?.click();
				})
				.catch(() => toast.error("Something went wrong"));
		});
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" size="sm" className="ml-auto">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit stream info</DialogTitle>
				</DialogHeader>
				<form className="space-y-14" onSubmit={onSubmit}>
					<div className="space-y-2">
						<Label>Name</Label>
						<Input
							{...register("name")}
							placeholder="Stream name"
							disabled={isPending}
						/>
					</div>
					<div className="space-y-2">
						<Label>Thumbnail</Label>
						{thumbnailUrl ? (
							<div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
								<div className="absolute top-2 right-2 z-[10]">
									<Hint
										label="Remove thumbnail"
										asChild
										side="top"
									>
										<Button
											type="button"
											disabled={isPending}
											onClick={onRemove}
											className="size-auto p-1.5 bg-red-500"
										>
											<Trash className="size-4" />
										</Button>
									</Hint>
								</div>
								<Image
									alt="Thumbnail"
									src={thumbnailUrl}
									fill
									className="object-cover"
								/>
							</div>
						) : (
							<div className="rounded-xl border outline-dashed outline-muted">
								<UploadDropzone
									{...register("thumbnailUrl")}
									endpoint="thumbnailUploader"
									appearance={{
										label: {
											color: "#FFFFFF",
										},
										allowedContent: {
											color: "#FFFFFF",
										},
									}}
									onClientUploadComplete={(res) => {
										setValue("thumbnailUrl", res?.[0].url);
										router.refresh();

										toast.success("Thumbnail uploaded");
									}}
								/>
							</div>
						)}
					</div>
					<div className="flex justify-between">
						<DialogClose ref={closeRef} asChild>
							<Button type="button" variant="ghost">
								Cancel
							</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							variant="primary"
							type="submit"
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
