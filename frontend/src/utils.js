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