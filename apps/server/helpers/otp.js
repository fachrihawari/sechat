export function generateOtp() {
    // Define the length of the OTP
    const otpLength = 6;

    // Generate a random number with the specified length
    const otp = Math.floor(Math.random() * Math.pow(10, otpLength));

    // Pad the OTP with leading zeros if necessary
    const paddedOtp = otp.toString().padStart(otpLength, '0');

    // Return the OTP
    return paddedOtp;
}

