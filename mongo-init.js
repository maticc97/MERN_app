db.createUser(
    {
        user: "matic",
        pwd: "matic987",
        roles: [
            {
                role: "readWrite",
                db: "customers"
            }
        ]
    }
);