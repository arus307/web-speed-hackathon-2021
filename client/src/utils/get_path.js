/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId) {
  return `/images/${imageId}_320w.webp 320w ,`
+`/images/${imageId}_640w.webp 640w ,`
+ `/images/${imageId}_1280w.webp 1280w ,`
+ `/images/${imageId}.webp`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  // return `/movies/${movieId}.gif`;
  return `/movies/${movieId}.webm`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles/${profileImageId}.webp`;
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
