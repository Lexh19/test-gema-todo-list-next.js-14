const { useRouter } = require("next/router")
const { useEffect } = require("react")

const LayoutSecond = ({ children }) => {
    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const token = window.localStorage.getItem("token")
            if(!token || token == null) {
                router.push('/')
            }
        }

        checkToken()
    }, [])

    const handleLogout = async () => {
        window.localStorage.removeItem("token")
        window.alert("Logout Berhasil.")
        router.push("/auth/login")
    }

    return (
        <>
        <div className="flex justify-end mt-5 mr-10">
            <button className="text-xl font-bold text-white bg-red-600 px-5 py-3 rounded-lg hover:bg-red-500" onClick={handleLogout}>Logout</button>
        </div>
        <div className="mt-3 w-full h-screen">{ children }</div>
        </>
    )
}

export default LayoutSecond