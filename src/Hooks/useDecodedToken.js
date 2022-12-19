import jwtDecode from "jwt-decode"

const useDecodedToken = () => {
    const token = localStorage.getItem("tenttisov_token")
    const decodedToken = token && jwtDecode(token, "secretkeyappearshere")
    return decodedToken
}

export default useDecodedToken