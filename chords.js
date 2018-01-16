const fs = require('fs');
const Midi = require('jsmidgen');

var file = new Midi.File();
var track = new Midi.Track();
file.addTrack(track);

function findNote(c) {
  if (c.match(/B|C|D/i)) {
    return 0 //C
  } else if (c.match(/A/i)) {
    return 1 //C#
  } else if (c.match(/F|G|H/i)) {
    return 2 //D
  } else if (c.match(/E/i)) {
    return 3 //D#
  } else if (c.match(/J|K|L/i)) {
    return 4 //E
  } else if (c.match(/M|N|P/i)) {
    return 5 //F
  } else if (c.match(/I/i)) {
    return 6 //F#
  } else if (c.match(/Q|R|S/i)) {
    return 7 //G
  } else if (c.match(/O/i)) {
    return 8 //G#
  } else if (c.match(/T|V|W/i)) {
    return 9 //A
  } else if (c.match(/U/i)) {
    return 10 //A#
  } else if (c.match(/X|Y|Z/i)) {
    return 11 //B
  } 
}

function findDuration() {
  return 128
}

function findOctave(curNote, prevNote, curOct) {
  if (curNote === prevNote) {
    return curOct + 1
  } else if (curNote > prevNote) {
    return curOct
  } else if (prevNote > curNote) {
    return curOct + 1
  }
}

function processMessage(msg) {
  let len = msg.length
  let curOct = 4; /* current octave */
  let curNote = -1 /* current note. z is just a filler */
  let prevNote = 0
  let chord = []

  for (let i = 0; i < len; i++) {
    let c = msg.charAt(i)
    prevNote = curNote
    curNote = findNote(c)
    if (!isNaN(curNote)) {
      curOct = findOctave(curNote, prevNote, curOct)
      /* addNote(channel, pitch, duration[, time[, velocity]])
       time and duration is hardcoded to 128 ticks per beat. */
      chord.push(`${curNote + curOct * 12}`)
    } else {
      track.addChord(0, chord, findDuration())
      curOct = 4
      curNote = -1
      chord = []
    }
  }
  track.addChord(0, chord, findDuration())
}

function main () {
  let msg = process.argv[2] ? process.argv[2] : ''
  let filename = process.argv[3] ? process.argv[3] : 'out.mid'

  processMessage(msg)

  fs.writeFileSync(`${filename}`, file.toBytes(), 'binary');
}

main();

