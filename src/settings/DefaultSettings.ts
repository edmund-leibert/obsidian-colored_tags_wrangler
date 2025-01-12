// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB}
	from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWranglerSettings {
	TagColors:{
		ColorPicker: Record<string, {tag_name:string, color:RGB, background_color:RGB,luminance_offset:number}>,

		EnableMultipleTags:boolean,
		EnableSeparateBackground:boolean,
		EnableSeparateLuminanceOffset:boolean,
		EnableDarkLightDifference:boolean,
		EnableBackgroundOpacity:boolean,
		Values:{
			BackgroundOpacity:number,
			LuminanceOffset:number,
		}
	},

	FolderNote:{
		Enable:boolean
		FolderTagLinks:Record<string, {folder_path:string, tag_name:string}>,

		EnableAutoDetect:boolean,

		Values:{
			ForceImportant:boolean,
			BorderRadius:string,
			Padding:string,
		}
	},

	Kanban:{
		Enable: boolean,
		EnableCards:boolean,
		EnableLists:boolean,
		HideHashtags:boolean,

		Values:{
			CardBackgroundOpacity:number,
			CardBorderOpacity:number,
			ListBackgroundOpacity:number,
			ListBorderOpacity:number,
		},
	},

	CSS:{
		Enable: boolean,
		TagsNoWrap:boolean,
		TagsNoWrapText:string,
	},

	Debug:{
		Enable:boolean,
	},

	Canvas:{
		Enable:boolean,

		Values:{
			CardBorderOpacity:number,
			CardBackgroundLuminanceOffset:number,
		},
	},
	Info: {
		SettingsVersion: number
	}
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const DefaultSettings: IColoredTagWranglerSettings = {
	TagColors:{
		ColorPicker: {},

		EnableMultipleTags:true,
		EnableSeparateBackground:false,
		EnableSeparateLuminanceOffset:false,
		EnableDarkLightDifference:true,
		EnableBackgroundOpacity:false,
		Values:{
			BackgroundOpacity:0.2,
			LuminanceOffset:0.15
		}
	},

	FolderNote:{
		Enable:false,
		FolderTagLinks:{},

		EnableAutoDetect:true,

		Values:{
			ForceImportant:true,
			BorderRadius:"12px",
			Padding:"5px",
		}
	},

	Kanban:{
		Enable:false,
		EnableCards:false,
		EnableLists:false,
		HideHashtags:false,

		Values:{
			CardBackgroundOpacity:0.2,
			CardBorderOpacity:0.3,
			ListBackgroundOpacity:0.2,
			ListBorderOpacity:0.3,
		},
	},

	Debug:{
		Enable:false,
	},

	CSS:{
		Enable: false,
		TagsNoWrap: false,
		TagsNoWrapText: "pre",
	},

	Canvas:{
		Enable:false,

		Values:{
			CardBorderOpacity:0.3,
			CardBackgroundLuminanceOffset:0.15,
		}
	},
	Info: {
		SettingsVersion: 9 // UPDATE THIS WHEN YOU CHANGE ANYTHING IN THE SETTINGS!!!
	}
}
