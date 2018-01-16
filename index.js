const fs = require('fs');
const Midi = require('jsmidgen');

var file = new Midi.File();
var track = new Midi.Track();
file.addTrack(track);

function findNote(c) {
  if (c.match(/a|h|o|v/i)) {
    return 'a'
  } else if (c.match(/b|i|p|w/i)) {
    return 'b'
  } else if (c.match(/c|j|q|x/i)) {
    return 'c'
  } else if (c.match(/d|k|r|y/i)) {
    return 'd'
  } else if (c.match(/e|l|s|z/i)) {
    return 'e'
  } else if (c.match(/f|m|t/i)) {
    return 'f'
  } else if (c.match(/g|n|u/i)) {
    return 'g'
  }
}

function findDuration(c) {
  if (c.match(/a|b|c|d|e|f|g/i)) {
    return 256
  } else if (c.match(/h|i|j|k|l|m|n/i)) {
    return 128
  } else if (c.match(/o|p|q|r|s|t|u/i)) {
    return 64
  } else if (c.match(/v|w|x|y|z/i)) {
    return 32
  }
}

function findOctave(curNote, prevNote, curOct) {
  /* may need to limit the octave if it goes out of range of midi */
  if (curNote.match(/a|b/i)) {
    curNote = curNote.charCodeAt(0) - 90
  } else {
    curNote = curNote.charCodeAt(0) - 97
  }

  if (prevNote.match(/a|b/i)) {
    prevNote = prevNote.charCodeAt(0) - 90
  } else {
    prevNote = prevNote.charCodeAt(0) - 97
  }

  if (curNote === prevNote) {
    return curOct;
  } else if (curNote > prevNote) {
    let u = curNote - prevNote
    let v = prevNote + 7 - curNote /* change the 7 for chromatic version? */
    if (u < v) {
      return curOct
    } else {
      return curOct - 1
    }
  } else if (prevNote > curNote) {
    let u = prevNote - curNote
    let v = curNote + 7 - prevNote
    if (u < v) {
      return curOct
    } else {
      return curOct + 1
    }
  }
}

function processMessage(msg) {
  let len = msg.length
  let curOct = 4; /* current octave */
  let curNote = 'a' /* current note. z is just a filler */
  let prevNote = 'a'
  let curDur = '128' /* one beat */
  let wait = 0 /* for handling rests */

  for (let i = 0; i < len; i++) {
    let c = msg.charAt(i)
    prevNote = curNote ? curNote : prevNote
    curNote = findNote(c)
    if (curNote) {
      curOct = findOctave(curNote, prevNote, curOct)
      curDur = findDuration(c)
      /* addNote(channel, pitch, duration[, time[, velocity]])
       time and duration is hardcoded to 128 ticks per beat. */
      track.addNote(0, `${curNote}${curOct}`, curDur, wait)
      wait = 0
    } else {
      /* if not a letter, we rest */
      /* one non-letter will rest for the same amount of time as previous note's length */
      wait += curDur;
    }
  }

}

function main () {
  let msg = process.argv[2] ? process.argv[2] : ''
  let filename = process.argv[3] ? process.argv[3] : 'out.mid'

  processMessage(msg)

  fs.writeFileSync(`${filename}`, file.toBytes(), 'binary');
}

main();

