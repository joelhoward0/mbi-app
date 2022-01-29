export namespace MBI {
  export function Generate(): string {
    var result = Array(mbiLength)
    for(var i = 0; i < result.length; i++) {
      result[i] = getMbiCharacter(i)
    }
    return result.join("");
  }

  //I am following the spec 
  type MBICharacterType = 'Letter' | 'NumberNotZero' | 'Number' | 'Either'
  const mbiIndices: MBICharacterType[] = [
    'NumberNotZero',
    'Letter',
    'Either',
    'Number',
    'Letter',
    'Either',
    'Number',
    'Letter',
    'Letter',
    'Number',
    'Number'
  ]
  const mbiLength = mbiIndices.length

  function getMbiCharacter(index: number): string {
    const type = mbiIndices[index]
    switch(type) {
      case "Letter": return getMbiLetter()
      case "NumberNotZero": return getMbiNumber(false)
      case "Number": return getMbiNumber(true)
      case "Either": {
        const flip = randomIntBetween(1, 0)
        return flip == 1 ? getMbiLetter() : getMbiNumber(true)
      }
    }
  }

  const mbiLetters = [
    'A', /*'B',*/ 'C', 'D', 'E', 'F', 'G', 'H', /*'I', */
    'J', 'K', /*'L',*/ 'M', 'N', /*'O',*/ 'P', 'Q', 'R', 
    /*'S',*/ 'T', 'U', 'V', 'W', 'X', 'Y', /*'Z'*/
  ]
  const mbiLettersLookup: { [l: string]: boolean } = { }
  mbiLetters.forEach(l => mbiLettersLookup[l] = true)
  function getMbiLetter(): string {
    return mbiLetters[randomIntBetween(mbiLetters.length, 0)]
  }

  function getMbiNumber(allowZero: boolean): string {
    return randomIntBetween(9, allowZero ? 0 : 1).toString()
  }

  function randomIntBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export function Verify(mbi: string): boolean {
    if (mbi.length != mbiLength)
      return false

    for(var i = 0; i < mbi.length; i++) {
      if (!isMbiCharacter(i, mbi[i]))
        return false
    }

    return true
  }

  function isMbiCharacter(index: number, character: string): boolean {
    const type = mbiIndices[index]
    switch(type) {
      case "Letter": return isMbiLetter(character)
      case "NumberNotZero": return isMbiNumber(character, false)
      case "Number": return isMbiNumber(character, true)
      case "Either": return isMbiLetter(character) || isMbiNumber(character, true)
    }
  }

  function isMbiLetter(letter: string) {
    return mbiLettersLookup[letter] === true
  }

  function isMbiNumber(number: string, allowZero: boolean) {
    if (number.length > 1) {
      return false
    }

    const n = parseInt(number)
    return !isNaN(n) && (allowZero || n != 0)
  }

  export function Format(mbi: string): string {
    if (mbi.length < 4)
      return mbi

    if (mbi.length < 7)
      return `${mbi.substring(0, 4)}-${mbi.substring(4)}`

    return `${mbi.substring(0, 4)}-${mbi.substring(4, 7)}-${mbi.substring(7)}`
  }

  export function Parse(mbi: string): string {
    return mbi.replaceAll("-", "") //note: this is valid in ES2021, but not earlier. if this application needs to run in older browsers, a shim will be needed
  }
}