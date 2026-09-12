function Dashboard() {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div>
            <h1>Life RPG Dashboard</h1>

            {user ? (
                <div>
                    <h2>
                        Welcome, {user.username}!
                    </h2>

                    <p>
                        Your adventure begins here.
                    </p>
                </div>
            ) : (
                <p>No user logged in.</p>
            )}
        </div>
    );
}

export default Dashboard;