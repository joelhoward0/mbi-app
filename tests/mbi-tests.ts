import { MBI } from "../server/mbi"

describe("MBI.Generate", () => {
  test("it runs without error and generates the correct length", () => {
    const result = MBI.Generate()
    expect(result.length).toBe(11)
  })
})

describe("MBI.Verify", () => {
  const cases = [
    { mbi:  "5FF3N35RR61", isValid:  true },
    { mbi:  "0BF3N35RR61", isValid: false },
    { mbi:             "", isValid: false },
    { mbi: "5FF3N35RR612", isValid: false },
    { mbi:  "5FF3N35RR6Z", isValid: false },
    { mbi:  "<!%&{(.*)}>", isValid: false },
    { mbi:  "0FF3N35RR61", isValid: false },
    { mbi:  "1AC0DE0FG00", isValid:  true },
    { mbi:  "1HJ0KM0NP00", isValid:  true },
    { mbi:  "1QR0TU0VW00", isValid:  true },
    { mbi:  "1XY0AA0VW00", isValid:  true },
    { mbi:  "1AA0AA0AS00", isValid: false },
    { mbi:  "1AA0AA0AL00", isValid: false },
    { mbi:  "1AA0AA0AO00", isValid: false },
    { mbi:  "1AA0AA0AI00", isValid: false },
    { mbi:  "1AA0AA0AB00", isValid: false },
    { mbi:  "1AA0AA0AZ00", isValid: false },
  ]
  test.each(cases)('MBI: $mbi is valid: $isValid', (c) => {
    expect(MBI.Verify(c.mbi)).toBe(c.isValid)
  })
})

describe("MBI.Format", () => {
  const cases = [
    { mbi: "0FF3N35RR61", result: "0FF3-N35-RR61" },
    { mbi:            "",              result: "" }
  ]
  test.each(cases)('MBI: $mbi formatted: $result', (c) => {
    expect(MBI.Format(c.mbi)).toBe(c.result)
  })
})