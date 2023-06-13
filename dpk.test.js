const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  test("it should return '0' if event is not given", () => {
    const candidate = deterministicPartitionKey();
    expect(candidate).toBe("0");
  });

  test("it should give partitionkey if it is provided and candidate length is < MAX_PARTITION_KEY_LENGTH", () => {
    const event = { partitionKey: "myKey" };
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe("myKey");
  });

  test("it should compute partition key from event if event.partitionKey is undefined", () => {
    const event = { anyProperty: "anyValue" };
    const data = JSON.stringify(event);
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe(hash);
  });

  test("it should convert candidate to JSON string if it is not a string", () => {
    const event = { anyProperty: "anyValue" };
    const data = JSON.stringify(event);
    const candidate = deterministicPartitionKey({ partitionKey: event });
    expect(candidate).toBe(data);
  });

  test("it should give correct hash if candidate length exceeds MAX_PARTITION_KEY_LENGTH", () => {
    const longCandidate = "a".repeat(300);
    const hash = crypto
      .createHash("sha3-512")
      .update(longCandidate)
      .digest("hex");
    const candidate = deterministicPartitionKey({ partitionKey: longCandidate });
    expect(candidate).toBe(hash);
  });

  test("it should compute partition key for nested event", () => {
    const event = { nested: { key: "value" } };
    const data = JSON.stringify(event);
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe(hash);
  });

  test("it should handle special chars", () => {
    const event = { data: "@#$%^&*()_+{}:\"|<>?,./;'[]=-`~" };
    const data = JSON.stringify(event);
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");
    const candidate = deterministicPartitionKey(event);
    expect(candidate).toBe(hash);
  });
});
