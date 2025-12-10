export const systemLightColors: ColorTheme = {
    'label': '#000000FF',
    'secondary-label': '#3C3C4399',
    'tertiary-label': '#3C3C434C',
    'quaternary-label': '#3C3C432D',

    'system-fill': '#78788033',
    'secondary-system-fill': '#78788028',
    'tertiary-system-fill': '#7676801E',
    'quaternary-system-fill': '#74748010',

    'placeholder-text': '#3c3c434c',

    'system-background': '#FFFFFFFF',
    'secondary-system-background': '#F7F7FAFF',
    'tertiary-system-background': '#FFFFFFFF',

    'system-grouped-background': '#f7f7faff',
    'secondary-system-grouped-background': '#ffffffff',
    'tertiary-system-grouped-background': '#f7f7faff',
    
    'separator': '#3c3c4349',
    'opaque-separator': '#c6c6c8ff',

    'link': '#007affff',
    'dark-text': '#000000FF',
    'light-text': '#FFFFFF99',

    'system-blue': '#007affff',
    'system-green': '#34c759ff',
    'system-indigo': '#5856d6ff',
    'system-orange': '#ff9500ff',
    'system-pink': '#ff2d55ff',
    'system-purple': '#af52deff',
    'system-red': '#ff3b30ff',
    'system-teal': '#5ac8faff',
    'system-yellow': '#ffcc00ff',
    'system-gray': '#8e8e93ff',
    'system-gray2': '#aeaeb2ff',
    'system-gray3': '#c7c7ccff',
    'system-gray4': '#d1d1d6ff',
    'system-gray5': '#e5e5eaff',
    'system-gray6': '#f7f7faff',
    'system-white': '#ffffffff',
    
    'clear': '#FFFFFF00'
}

export const systemDarkColors: ColorTheme = {
    'label': '#ffffffff',
    'secondary-label': '#ebebf599',
    'tertiary-label': '#ebebf54c',
    'quaternary-label': '#ebebf52d',

    'system-fill': '#7878805b',
    'secondary-system-fill': '#78788051',
    'tertiary-system-fill': '#7676803d',
    'quaternary-system-fill': '#7676802d',

    'placeholder-text': '#ebebf54c',

    'system-background': '#000000ff',
    'secondary-system-background': '#1c1c1eff',
    'tertiary-system-background': '#2c2c2eff',

    'system-grouped-background': '#000000ff',
    'secondary-system-grouped-background': '#1c1c1eff',
    'tertiary-system-grouped-background': '#2c2c2eff',
    
    'separator': '#54545899',
    'opaque-separator': '#38383aff',

    'link': '#0984ffff',
    'dark-text': '#000000ff',
    'light-text': '#ffffff99',

    'system-blue': '#0a84ffff',
    'system-green': '#30d158ff',
    'system-indigo': '#5e5ce6ff',
    'system-orange': '#ff9f0aff',
    'system-pink': '#ff375fff',
    'system-purple': '#bf5af2ff',
    'system-red': '#ff453aff',
    'system-teal': '#64d2ffff',
    'system-yellow': '#ffd60aff',
    'system-gray': '#8e8e93ff',
    'system-gray2': '#636366ff',
    'system-gray3': '#48484aff',
    'system-gray4': '#3a3a3cff',
    'system-gray5': '#2c2c2eff',
    'system-gray6': '#1c1c1eff',
    'system-white': '#ffffffff',
    
    'clear': '#FFFFFF00'
}

export interface ColorTheme {
    [colorName: string]: string
}

export interface ColorThemeSet {
    commonColors: { [colorName: string]: string }
    darkColors: { [colorName: string]: string }
    lightColors: { [colorName: string]: string }
    darkSafariThemeColor: string
    lightSafariThemeColor: string
}