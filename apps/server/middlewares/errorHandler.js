export default function errorHandler(err, _req, res, _next) {
    let status = 500
    let message = "Internal Server Error"

    switch (err.message) {
        case "InvalidUser":
            status = 400
            message = "Invalid User"
            break;
        case "InvalidOtp":
            status = 400
            message = "Invalid OTP"
            break;
    }

    res.status(status).json({ message })
}
