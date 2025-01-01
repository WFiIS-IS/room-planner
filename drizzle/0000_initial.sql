CREATE TABLE `file_metadata` (
	`uid` text PRIMARY KEY NOT NULL,
	`content_type` text NOT NULL,
	`file_size` integer NOT NULL,
	`ext` text NOT NULL,
	`original_filename` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `image_metadata` (
	`file_metadata` text PRIMARY KEY NOT NULL,
	`width` integer,
	`height` integer,
	FOREIGN KEY (`file_metadata`) REFERENCES `file_metadata`(`uid`) ON UPDATE no action ON DELETE no action
);
