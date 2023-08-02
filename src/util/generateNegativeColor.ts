// generates negative color for the passed hex color
const generateNegativeColor = (hexColor: string) => {
  // removing the '#' symbol if it's present
  hexColor = hexColor.replace("#", "")

  // parsing the hex color into RGB components
  const red = parseInt(hexColor.slice(0, 2), 16)
  const green = parseInt(hexColor.slice(2, 4), 16)
  const blue = parseInt(hexColor.slice(4, 6), 16)

  // calculating the negative color by inverting the RGB components
  const negativeRed = 255 - red
  const negativeGreen = 255 - green
  const negativeBlue = 255 - blue

  // converting the negative RGB values back to hex string
  const negativeHexColor =
    "#" +
    [negativeRed, negativeGreen, negativeBlue]
      .map((component) => component.toString(16).padStart(2, "0"))
      .join("")

  return negativeHexColor
}

export default generateNegativeColor
