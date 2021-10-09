import colors from "windicss/colors"

export default {
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        ...colors,
        "green-500-spotify": "#1ed760",
        "gray-900-spotify": "#121212",
        "gray-800-spotify": "#181818",
      },
      fontSize: {
        xxs: "0.5rem",
      },
    },
  },
}
