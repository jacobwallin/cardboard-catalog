export default function detectFormChanges(
  currentValues: Array<any>,
  formValues: Array<any>
): boolean {
  // if arrays are difference in length, return true
  if (currentValues.length !== formValues.length) return true;

  // recursively iterate through both arrays and return true if there are differences
  const changes = currentValues.reduce((changesMade: boolean, value, index) => {
    if (Array.isArray(value)) {
      if (Array.isArray(formValues[index])) {
        const changesMadeRec = detectFormChanges(value, formValues[index]);
        if (changesMadeRec) return true;
        return changesMade;
      } else {
        return true;
      }
    } else {
      if (value !== formValues[index]) return true;
      return changesMade;
    }
  }, false);

  return changes;
}
