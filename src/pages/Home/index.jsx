function Home() {

    function logout() {
        localStorage.removeItem("authToken");
        window.location.href = "/"
        alert("Voce saiu")
    }
    return (
        <>
            <p onClick={logout}>logout</p>
            <h1>Navigate</h1>
        </>
    )
}

export default Home