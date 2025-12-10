import { NativeDateAdapter } from '@angular/material/core'

export class UKDateAdapter extends NativeDateAdapter {
    override parse(value: any): Date | null {
        const currentDate = new Date()
        let year: number = currentDate.getFullYear()
        let month: number = currentDate.getMonth()
        let day: number = currentDate.getDate()

        if (typeof value === 'string' && (value.indexOf('/') > -1 || value.indexOf('.') > -1 || value.indexOf('-') > -1)) {
            const str = value.split(/[./-]/)

            day = str[0] ? +str[0] : day
            month = str[1] ? +str[1] - 1 : month
            year = str[2]
                ? // If year is less than 3 digit long, we complete it.
                  +str[2].length <= 3
                    ? // if year is less than 20, we assume 21st century. otherwise we assume 20th century
                      +str[2] < 20
                        ? +str[2] + 2000
                        : +str[2] + 1900
                    : +str[2]
                : year

            return new Date(year, month, day)
        } else {
            return null
        }
    }
}
