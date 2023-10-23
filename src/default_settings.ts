// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWranglerSettings {
    customTagColors: Record<string, { r: number, g: number, b: number }>;
    enableKanban:boolean;
	enableKanbanCards:boolean;
	enableKanbanLists:boolean;
	enableDebugSettings:boolean;

	// The following setting_tab still have to be assigned to logic
	kanbanCardBackgroundOpacity:number;
	kanbanCardBorderOpacity:number;
	kanbanListBackgroundOpacity:number;
	kanbanListBorderOpacity:number;

}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const DEFAULT_SETTINGS: IColoredTagWranglerSettings = {
    customTagColors: {},
    enableKanban:false,
	enableKanbanCards:false,
	enableKanbanLists:false,
	enableDebugSettings:false,

	// The following setting_tab still have to be assigned to logic
	kanbanCardBackgroundOpacity:0.2,
	kanbanCardBorderOpacity:0.3,
	kanbanListBackgroundOpacity:0.2,
	kanbanListBorderOpacity:0.3,


}
