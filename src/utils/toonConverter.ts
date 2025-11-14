/**
 * Converts JSON to TOON format based on official specification
 * https://github.com/toon-format/spec
 */

export function jsonToToon(json: string): string {
  try {
    const obj = JSON.parse(json);
    return encodeValue(obj, 0);
  } catch (error) {
    throw new Error("Invalid JSON");
  }
}

function encodeValue(value: any, indent: number): string {
  if (value === null) return "null";
  if (value === undefined) return "null";
  
  if (typeof value === "boolean") return value.toString();
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") return quoteIfNeeded(value);
  
  if (Array.isArray(value)) {
    return encodeArray(value, indent);
  }
  
  if (typeof value === "object") {
    return encodeObject(value, indent);
  }
  
  return String(value);
}

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return String(n);
  // Remove trailing zeros
  return n.toString().replace(/\.?0+$/, "");
}

function quoteIfNeeded(str: string): string {
  // Quote if contains special characters, commas, colons, or looks like a keyword
  if (str === "true" || str === "false" || str === "null") {
    return `"${str}"`;
  }
  if (/[,:\n\r\t\[\]{}]/.test(str) || /^\s|\s$/.test(str)) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  // Try to parse as number - if it looks like a number, quote it
  if (!isNaN(Number(str)) && str.trim() !== "") {
    return `"${str}"`;
  }
  return str;
}

function encodeArray(arr: any[], indent: number): string {
  if (arr.length === 0) {
    return `[0]:`;
  }
  
  // Check if array contains uniform objects
  if (arr.length > 0 && isUniformObjectArray(arr)) {
    return encodeUniformArray(arr, indent);
  }
  
  // Check if array contains only primitives
  if (arr.every(item => typeof item !== "object" || item === null)) {
    return encodePrimitiveArray(arr);
  }
  
  // Mixed array - use list format
  return encodeMixedArray(arr, indent);
}

function isUniformObjectArray(arr: any[]): boolean {
  if (arr.length === 0) return false;
  if (typeof arr[0] !== "object" || arr[0] === null || Array.isArray(arr[0])) {
    return false;
  }
  
  const firstKeys = Object.keys(arr[0]).sort();
  return arr.every(item => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      return false;
    }
    const keys = Object.keys(item).sort();
    return keys.length === firstKeys.length && 
           keys.every((key, i) => key === firstKeys[i]);
  });
}

function encodeUniformArray(arr: any[], indent: number): string {
  const fields = Object.keys(arr[0]);
  const spaces = "  ".repeat(indent);
  
  let result = `[${arr.length}]{${fields.join(",")}}:`;
  
  for (const item of arr) {
    const values = fields.map(field => {
      const val = item[field];
      if (typeof val === "object" && val !== null) {
        // For nested objects/arrays in uniform arrays, inline them
        return JSON.stringify(val);
      }
      return encodeValue(val, 0);
    });
    result += `\n${spaces}  ${values.join(",")}`;
  }
  
  return result;
}

function encodePrimitiveArray(arr: any[]): string {
  const values = arr.map(v => encodeValue(v, 0));
  return `[${arr.length}]: ${values.join(",")}`;
}

function encodeMixedArray(arr: any[], indent: number): string {
  const spaces = "  ".repeat(indent);
  let result = `[${arr.length}]:`;
  
  for (const item of arr) {
    if (typeof item === "object" && item !== null && !Array.isArray(item)) {
      // Nested object
      const objLines = encodeObject(item, indent + 1);
      result += `\n${spaces}  -${objLines.split("\n").join(`\n${spaces}  `)}`;
    } else if (Array.isArray(item)) {
      // Nested array
      const arrStr = encodeArray(item, indent + 1);
      result += `\n${spaces}  - ${arrStr}`;
    } else {
      // Primitive
      result += `\n${spaces}  - ${encodeValue(item, 0)}`;
    }
  }
  
  return result;
}

function encodeObject(obj: any, indent: number): string {
  const entries = Object.entries(obj);
  if (entries.length === 0) return "";
  
  const spaces = "  ".repeat(indent);
  const lines: string[] = [];
  
  for (const [key, value] of entries) {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        const arrStr = encodeArray(value, indent + 1);
        lines.push(`${spaces}${key}${arrStr}`);
      } else {
        // Nested object
        lines.push(`${spaces}${key}:`);
        const nested = encodeObject(value, indent + 1);
        if (nested) {
          lines.push(nested);
        }
      }
    } else {
      lines.push(`${spaces}${key}: ${encodeValue(value, 0)}`);
    }
  }
  
  return lines.join("\n");
}
