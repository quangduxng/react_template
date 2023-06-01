export const convertSecondToMinuteString = (second) => {
   return `${Math.floor(second / 60)}:${
      second % 60 < 10 ? `0${second % 60}` : second % 60
   }`
}
