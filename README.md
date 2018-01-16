# Music cipher

Enter English, converts into music based on the following table:

| Music representation | A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Half note | A | B | C | D | E | F | G |
| Quarter note | H | I | J | K | L | M | N |
| Eigth note | O | P | Q | R | S | T | U | 
| 16th note | V | W | X | Y | Z | N/A | N/A |

## Setup

Install Node.js and npm, then run
```
git clone https://github.com/alan850627/music-cipher.git
cd music-ciper
npm install
```

## Run
```
node index.js <message-in-quotes> <file-name>
```

an example:
```
node index.js "hi praetor how are you"
```
Note: not providing a filename will create a generic `out.mid` file.

another example:
```
node index.js "alan is the best" alan.mid
```

## How it works
* This script relies on the `jsmidgen` library to create the midi file.   
* The cipher works in a way of a lookup table, where each letter is mapped one to one to a note and some duration.   
* Each non-English alphabet characters are represented by rests. The duration of the rest is the same as the previous note's duration.   
* The octave of the note is chosen so that jumps between successive notes would be minimal.

