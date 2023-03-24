const extractingSubtasksFromOpenAiResponse = (arr) => {
  let extractedArray = arr.match(/{[^{}]+}/g);
  const formattedArray = extractedArray.map((item) => {
    const regex = /{\s*summary:\s*"([^"]+)",\s*description:\s*"([^"]+)"\s*}/;
    const match = item.match(regex);
    if (match) {
      return { summary: match[1], description: match[2] };
    } else {
      return null;
    }
  });
  return formattedArray;
};

module.exports = {
  extractingSubtasksFromOpenAiResponse,
};
