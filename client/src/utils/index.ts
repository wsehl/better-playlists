import queryString from "query-string"

export const getHashParams = () => {
  return queryString.parse(window.location.search)
}
