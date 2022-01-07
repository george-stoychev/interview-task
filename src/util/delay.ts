export default function delay<T>(
  data: T | Promise<T>,
  delay = 500
): Promise<T> {
  return new Promise((resolve) => {
    return setTimeout(() => resolve(data), delay);
  });
}
