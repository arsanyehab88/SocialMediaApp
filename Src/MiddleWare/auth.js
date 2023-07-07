import jwt from "jsonwebtoken"




export const auth = (req, res, next) => {
    let authorization = req.headers["authorization"]

    if (!authorization || (authorization && authorization.startsWith("Bearer") == false)) return res.json({ massage: "Invalid Token" })

    let token = authorization.split(" ")[1]
    jwt.verify(token, process.env.SECURTY_KEY, (err, decode) => {
        if (err) return res.json({ massage: "Invalid Token" })
        req.email = decode.email
        req.ID = decode.ID
        next()
    })
}

