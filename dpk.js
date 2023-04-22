/** Refactoring Explaination                                           */
/** I move contants to the top so it will be easier to read.           */
/** hashEncoding function should be stand alone because it             */
/** will be easy to test if encoding is working.                       */
/** getCandidateByEvent is also for the ease of testing.               */
/** Now we can see all candidate is on the deterministicPartitionKey.  */


const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const HASH_ALGORITHM = "sha3-512";
const HASH_DIGEST_ENCODING = "hex"

exports.hashEncoding = (data) => {
  return crypto.createHash(HASH_ALGORITHM).update(data).digest(HASH_DIGEST_ENCODING);
}

exports.getCandidateByEvent = (event) => {
  let candidate;
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = this.hashEncoding(data);
    }
  }
  return candidate;
}

exports.deterministicPartitionKey = (event) => {
  let candidate = this.getCandidateByEvent(event);

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = this.hashEncoding(candidate);
  }
  return candidate;
};