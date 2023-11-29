export const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            stiffness: 100,
        },
    },
};

export const item = {
    hidden: { scale: 0, },
    show: { scale: 1, },
};