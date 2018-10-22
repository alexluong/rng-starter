const defaults = {
  accessToken: localStorage.getItem("accessToken"),
  me: JSON.parse(localStorage.getItem("me")),
}

export default defaults
