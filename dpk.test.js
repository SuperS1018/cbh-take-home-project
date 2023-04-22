const { 
  deterministicPartitionKey,
  hashEncoding,
  getCandidateByEvent
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  const MOCK_EVENT_WITH_PARTITIONKEY = {
    partitionKey: '20'
  }

  const MOCK_EVENT_WITHOUT_PARTITIONKEY = {
    name: 'mock_name'
  }

  const MOCK_HASH_CODE_RESPONSE = "f01ce96c6e76e2602fdb6849b611c9c65cdd49371a1d3e6205819ee55f07a4c75090f2c0f486d4690f7590242d60f839709804659be5600d87a881886889bb19";

  it("Should returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should return 'partitionKey' when given an event with partitionKey", () => {
    const trivialKey = deterministicPartitionKey(MOCK_EVENT_WITH_PARTITIONKEY);
    expect(trivialKey).toBe("20");
  });

  it("Should return a hash code when given an event without partitionKey", () => {
    const trivialKey = deterministicPartitionKey(MOCK_EVENT_WITHOUT_PARTITIONKEY);
    expect(trivialKey).toBe(MOCK_HASH_CODE_RESPONSE);
  });

  describe("hashEncoding", () => {
    it("Should convert data into hash codes", () => {
      const data = JSON.stringify(MOCK_EVENT_WITHOUT_PARTITIONKEY)
      const hash = hashEncoding(data);
      expect(hash).toBe(MOCK_HASH_CODE_RESPONSE)
    });
  });

  describe("getCandidateByEvent", () => {
    it("Should get candidate by event with partitionKey", () => {
      const candidate = getCandidateByEvent(MOCK_EVENT_WITH_PARTITIONKEY);
      expect(candidate).toBe("20")
    });

    it("Should get candidate by event with partitionKey", () => {
      const candidate = getCandidateByEvent(MOCK_EVENT_WITHOUT_PARTITIONKEY);
      expect(candidate).toBe(MOCK_HASH_CODE_RESPONSE)
    });
  })
});
