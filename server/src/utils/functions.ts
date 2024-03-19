export const isTaskStatus = (input: string): boolean => {
  if (input == 'not started' || input == 'started' || input == 'completed') {
    return true;
  } else return false;
};

export const isTaskPriority = (input: string): boolean => {
  if (input == 'low' || input == 'medium' || input == 'high') {
    return true;
  } else return false;
};

export const isNumber = (input: string): boolean => {
  if (Number.isNaN(parseInt(input))) {
    return false;
  } else return true;
};

export const isBoolean = (input: string): boolean => {
  if (input == 'true' || input == 'false') {
    return true;
  } else return false;
};
