CREATE TABLE `file_metadata` (
	`uid` text PRIMARY KEY NOT NULL,
	`content_type` text NOT NULL,
	`file_size` integer NOT NULL,
	`ext` text NOT NULL,
	`original_filename` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `image_metadata` (
	`file_metadata_uid` text PRIMARY KEY NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL,
	FOREIGN KEY (`file_metadata_uid`) REFERENCES `file_metadata`(`uid`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scene` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`file_metadata_uid` text NOT NULL,
	FOREIGN KEY (`file_metadata_uid`) REFERENCES `file_metadata`(`uid`) ON UPDATE no action ON DELETE no action
);
