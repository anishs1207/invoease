export const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => {
                console.error("Async Handler Error:", err);
                next(err);
            });
    };
};
