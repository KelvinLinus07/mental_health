export const getPoints = () => {
  return parseInt(localStorage.getItem("points")) || 0;
};

export const addPoints = (value) => {
  const current = getPoints();
  const updated = current + value;

  localStorage.setItem("points", updated);

  // refresh UI everywhere
  window.dispatchEvent(new Event("pointsUpdated"));
};