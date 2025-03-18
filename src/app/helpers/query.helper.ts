const isValid = (value: unknown): boolean => value != null && value !== "";

const removeUselessQueryItems = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> =>
  Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => isValid(value))
    .reduce((acc, [key, value]) => {
      acc[key as keyof T] = value as T[keyof T];
      return acc;
    }, {} as Partial<T>);

export { removeUselessQueryItems };
