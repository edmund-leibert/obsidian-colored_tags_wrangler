// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerSettings}
    from "../DefaultSettings";
import {ISettings_v006}
    from "../old_setting_versions/ISettings_v006";
import {RGB} from "obsidian";
import {hslToRgb, rgbToHsl} from "../../lib";
import {ISettings_v007} from "../old_setting_versions/ISettings_v007";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_6_to_7(loaded_data:ISettings_v006):ISettings_v007 {
    let transformed_data = loaded_data as unknown as ISettings_v007;
    transformed_data.TagColors.Values.LuminanceOffset = 0.15;
    transformed_data.TagColors.EnableSeparateLuminanceOffset = false;
    transformed_data.TagColors.EnableDarkLightDifference = true;
    transformed_data.TagColors.EnableBackgroundOpacity = false;
    transformed_data.TagColors.Values.BackgroundOpacity = 0.2;

    // Fixes mistake
    for (const tagUUID of Object.keys(loaded_data.TagColors.ColorPicker)){
        let old_record = loaded_data.TagColors.ColorPicker[tagUUID];
        transformed_data.TagColors.ColorPicker[tagUUID] = {
            tag_name:old_record.tag_name,
            color:old_record.color,
            background_color:checkColor(old_record.background_color, old_record.color)
                ? callback_fix_background(old_record.background_color, transformed_data.TagColors.Values.LuminanceOffset)
                : old_record.background_color,
            luminance_offset:transformed_data.TagColors.Values.LuminanceOffset,
        }
    }

    transformed_data.Info.SettingsVersion = 7;
    return transformed_data as unknown as ISettings_v007;
}

function checkColor(color:RGB, background:RGB):boolean{
    let check = (
        color.r === background.r
        && color.g === background.g
        && color.b === background.b
    )
    console.warn({color, background, check})
    return check
}

function callback_fix_background(background:RGB, luminance_offset:number):RGB{
    let background_hsl = rgbToHsl(background)
    background_hsl.l -= luminance_offset
    return hslToRgb(background_hsl)
}