CREATE TABLE `element_positions` (
	`element_uid` text PRIMARY KEY NOT NULL,
	`x` integer NOT NULL,
	`y` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scenes_to_elements` (
	`element_uid` text NOT NULL,
	`scene_slug` text NOT NULL,
	PRIMARY KEY(`element_uid`, `scene_slug`),
	FOREIGN KEY (`element_uid`) REFERENCES `element_positions`(`element_uid`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`scene_slug`) REFERENCES `scene`(`slug`) ON UPDATE no action ON DELETE no action
);
