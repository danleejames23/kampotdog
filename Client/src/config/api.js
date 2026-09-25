export const getImageUrl = (imageName) => {
    if (!imageName) return '';
    return `/images/${encodeURIComponent(imageName)}`;
};
