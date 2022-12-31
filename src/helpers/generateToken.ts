import jwt from "jsonwebtoken";

export const tokenSign = async (user: { id: string, role: string }) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.SECRET_TOKEN || "token_test_games",
        {
            expiresIn: "24h",
        }
    );
}

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_TOKEN || "token_test_games");
    } catch (error) {
        if (error instanceof Error) {
            return null;
        }
    }
}