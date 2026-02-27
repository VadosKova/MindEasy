import React from 'react';
import { SvgXml } from 'react-native-svg';

const SleepIcon = ({ width = 50, height = 50 }: { width?: number; height?: number }) => {
  const xml = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="50" height="50" transform="matrix(-1 0 0 1 50 0)" fill="url(#pattern0_475_26)"/>
<defs>
<pattern id="pattern0_475_26" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_475_26" transform="scale(0.01)"/>
</pattern>
<image id="image0_475_26" width="100" height="100" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAQ+UlEQVR4nO1deXBbSZl/HMNyFUPNci0LFLBAAbvczDILBcVRHDtQxVKw7BZUMQxTeIi65RxzZTKT0ZAMEyd6T7ZzWbKs7idZ8iFbniTObc/EiTOJc9pJJufkYBLbGYbtre/Jz+p+70mWbMmSbf2qvj9SsZ5a/VP3d3+SpJwyyCOPPPLII4888sgjjzzyyCOPPPLIO40Gmvq7wRCsJQ4H1apB+xTqGxzwK3VQdlO3/70TYvI/2BUedVl9u7O7Rqx5V1tGZKJL/kJk+fhKHr59sLs7c1G4xUIK5pwvVhcO/SoJF8f4H46wZwAMJn9bP0gJ1c0nD1BHQ3NJ1TKH1EW0v6JqlE4yV1U0WkQV1cL3aPKFJRgH3OVlAq4e2IUQX8vjUXxEHVBjX9kV1gvYOQbNr5RKeKxP5WQMIjHjWC7NZLbY9rQ6GFHdZnMI8b1vLrgfJGwV2G0vHznKIc7nLKcVpvbbnC+nZ1a1p/bW2sTuzcyqU8eHKLV7/2vqxY2wyL/a1mDKNV+dxNEEomqVCQFfLWDFvdLw6Oj4M1N1I/qNstpDJDv5YjMBj4HO0dLMN2YV3oAVvVBuIU3q2JGpVzvkrtg5u5nU8sBJJP8JVYJxg5rTVJ/+nBxN6zj9XM1kGJnY2eqQX9CxCu9hqMqyJUzrVaAAQVNfE+NpqMiWKL32hLhBLLjA/lExO1gqZzV5tUSEDNLzQo2LE8K3dGr3K6bj8N0j0qEeA6NbWLvCzCvN/8UGzGI0wPJe3C3LZdlPaFPFvZXvdGfLfMf8mIb9ZvCSbF9opWJJXjKPjhPsVxO2p5s37z8X3qU+c0RP0k6RNy0gu7hlLK3E0MJakFIK9bHCCwMQAH/iK7RdSyxWzrWNkQIKf9BmwHoFNRLQvV94nFXGDJgEMGYxEW0vZQG6WKP6OZYvQb0eWE1EQFcxHwWrSU7VXBf9Qe5rljfQRxNYPYaVIcNK6yjZIrJWCdKx0Y3CnMVv7L4v4D0f3wDZnGEqe6tO7c14zN2pVCaXjJGzfBDpzYI7TKUSvqfqMqE2ZEm3qNNL3hPqXGQGj8ScLdXkW+d7aCFIEqrRJvQ4gy/UVKgfdNs1ksaSB0ysAQ3X21sAiNEa8I6Pp7eIKmUMfRt/pWWL4HkMQ15eWy3lxOQQhiB8C5LAIqrALh8LRUcxnH0p5k23SiKvYRvqnPe1B9iRQI8qNvpcCrJl9bQxiMN0Av9eO
</image>
</defs>
</svg>`;

  return <SvgXml xml={xml} width={width} height={height} />;
};

export default SleepIcon;
