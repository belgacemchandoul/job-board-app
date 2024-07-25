const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default truncateDescription