export async function fileToBytes(file) {
  const reader = new FileReader();

  const bytes = await reader.readAsArrayBuffer(file);

  return bytes;
}

export function textToBytes(text) {
  const encoder = new TextEncoder();

  return encoder.encode(text);
}

export function processFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    let isText = false;
    const reader = new FileReader();

    reader.onload = () => {
      let bytes = [];

      if (isText) {
      	const normalizedText = normalizeText(reader.result);
        bytes = textToBytes(normalizedText);
        console.log('text file in bytes:', bytes);
      } else {
      	bytes = new Uint8Array(reader.result);
      	console.log('not text file in bytes:', bytes);
      }

      resolve(bytes);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    if (isTextFile(file)) {
      isText = true;
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
}

function normalizeText(text) {
	return text.replace(/\s/g,'').toLowerCase();
}

function isTextFile(file) {
  if (!file || !file.type) return false;

  const type = file.type.toLowerCase();

  return (
    type.startsWith("text/") || // catches text/plain, text/html, text/css, text/csv, text/markdown etc.
    type.endsWith("json") ||    // application/json
    type.includes("xml") ||     // text/xml, application/xml
    type.includes("javascript") || // application/javascript, text/javascript
    type.includes("yaml") ||    // application/x-yaml, text/yaml
    type.includes("csv")        // sometimes CSV can be odd MIME types
  );
}

export function arrayIt(value) {
  if (Array.isArray(value))
    return value;
  else if (value !== '')
    return [value];

  return [];
}

export function objectIt(value, objValue=null) {
  if (isPlainObj(value)) return value;

  const obj = {}
  obj[value] = objValue;

  return obj;
}

function isPlainObj(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export async function hashFiles(filesBuffers) {
  const fileHashes = [];
  for (const file of filesBuffers) {
    console.log('file to be hashed', file);
    const hashBuffer = await crypto.subtle.digest("SHA-256", file);
    const bytesArray = Array.from(new Uint8Array(hashBuffer));
    const hexHash = bytesArray.map(b => b.toString(16).padStart(2, "0")).join("");
    fileHashes.push(hexHash);
  }

  return fileHashes;
}

export function formatTimestamp(nanoTimestamp) {
  // Convert nanoseconds → milliseconds
  const millis = Number(BigInt(nanoTimestamp) / 1000000n);

  // Create JS date
  const date = new Date(millis);

  // Format it nicely (local date & time)
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}