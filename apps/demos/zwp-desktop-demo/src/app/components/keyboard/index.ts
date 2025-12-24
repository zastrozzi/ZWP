import { KeyboardPageComponent } from './keyboard.page.component'
import { KeyboardKeyComponent } from './keyboard.key.component'

export * from './keyboard.key.component'
export * from './keyboard.page.component'

export const KEYBOARD_COMPONENTS = {
    KeyboardKeyComponent,
    KeyboardPageComponent,

    ALL: [
        KeyboardKeyComponent,
        KeyboardPageComponent
    ]
}