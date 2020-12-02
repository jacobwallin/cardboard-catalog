import { AnyMxRecord } from "dns";

export default function detectFormChanges(
  currentValues: Array<any>,
  formValues: Array<any>
): boolean {
  return currentValues.reduce((changes: boolean, value, index) => {
    if (value !== formValues[index]) return true;
    return changes;
  }, false);
}
