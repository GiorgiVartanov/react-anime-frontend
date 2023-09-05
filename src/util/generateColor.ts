// generates color for passed string (always same color for the same string)
const generateColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const color = "#" + ((hash & 0x00ffffff) | 0x808080).toString(16).slice(-6)

  return color
}

export default generateColor
