# Music cipher

Enter English, converts into music based on various lookup tables.

### French:

| Music representation | A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Half note | A | B | C | D | E | F | G |
| Quarter note | H | I | J | K | L | M | N |
| Eigth note | O | P | Q | R | S | T | U | 
| 16th note | V | W | X | Y | Z | N/A | N/A |

* This script relies on the `jsmidgen` library to create the midi file.   
* The cipher works in a way of a lookup table, where each letter is mapped one-to-one to a note and some duration.   
* Each non-English alphabet characters are represented by rests. The duration of the rest is the same as the previous note's duration.   
* The octave of the note is chosen so that jumps between successive notes are minimal.

### Keyboard:
On a qwerty keyboard, we go from up to down, and left to right, each key incremented by a half step starting on C3. That is, "1" gets mapped to C3, "q" to "C#3", "a" to "D3", "Z" to "D#3", "2" to "E" and so on. The complete lookup table: `1qaz2wsx3edc 4rfv5tgb6yhn7ujm8ik,9ol.0p;/-[`. Each note is a 16th note long.

### Chords:
We map the alphabet to notes using this table:

* Alphabet: Note
* BCD: C
* A: C#
* FGH: D
* E: D#
* JKL: E 
* MNP: F
* I: F#
* QRS: G
* O: G#
* TVW: A
* U: A#
* XYZ: B

Each group of English letters are grouped into chords. That is, we split at each non-English-alphabet character. The chord is built so that the first letter of each word is the lowest note, in the MIDI 3rd octave range. Then, each successive letter will stack on top of the previous note, jumping octaves if necessary. Each chord is a quarter note long. 

## Setup

First, install [Node.js](https://nodejs.org/en/) and git, then copy this project:
```
git clone https://github.com/alan850627/music-cipher.git
cd music-ciper
npm install
```

## Run
A generic command:
```
node <file>.js <message-in-quotes> <file-name>
```

an example:
```
node french.js "hi praetor how are you"
```
Note: not providing a filename will create a generic `out.mid` file.

another example:
```
node keyboard.js "alan is the best" alan.mid
```

## Note
* I noticed inaccuracies when importing these MIDI files into Finale, but this is due to Finale trying to make the music look _pretty_ by extending some notes and deleting rests. I've verified the result with a MIDI sequencer, and the output is accurate to my knowledge. 
* You can obviosuly change the behavior of these mappings. Javascript is easy to understand.
* I should probably make this output MusicXML too, but I'll worry about that later.