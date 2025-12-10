export const millisecondsToMinutesAndSeconds = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0)
    return minutes + ':' + (parseInt(seconds, 10) < 10 ? '0' : '') + seconds
}

export const getUTCNowWithOffsetSeconds = (offsetSeconds: number): number => {
    return new Date(new Date().toUTCString()).valueOf() + (offsetSeconds * 1000)
}