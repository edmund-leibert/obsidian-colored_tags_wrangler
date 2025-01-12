// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v005}
    from "../old_setting_versions/ISettings_v005";
import {ISettings_v006} from "../old_setting_versions/ISettings_v006";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_5_to_6(loaded_data:ISettings_v005):ISettings_v006 {
    let transformed_data = loaded_data as unknown as ISettings_v006;

    // Fixes mistake
    transformed_data.Kanban.HideHashtags = loaded_data.Kanban.Enable

    transformed_data.Info.SettingsVersion = 6;
    return transformed_data;

}