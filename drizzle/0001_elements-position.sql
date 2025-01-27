CREATE TABLE `element_positions` (
	`element_id` text NOT NULL,
	`scene_slug` text NOT NULL,
	`x` real NOT NULL,
	`y` real NOT NULL,
	PRIMARY KEY(`scene_slug`, `element_id`),
	FOREIGN KEY (`scene_slug`) REFERENCES `scene`(`slug`) ON UPDATE no action ON DELETE no action
);
