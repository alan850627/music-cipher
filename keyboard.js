const fs = require('fs');
const Midi = require('jsmidgen');

var file = new Midi.File();
var track = new Midi.Track();
file.addTrack(track);

const order = '1qaz2wsx3edc 4rfv5tgb6yhn7ujm8ik,9ol.0p;/-['

function findNote(c) {

  return 48 + order.indexOf(c)
}

function findDuration() {
  return 32
}

function processMessage(msg) {
  let len = msg.length
  let curNote = 60
  msg = msg.toLowerCase()

  for (let i = 0; i < len; i++) {
    let c = msg.charAt(i)
    curNote = findNote(c)
    /* addNote(channel, pitch, duration[, time[, velocity]])
     time and duration is hardcoded to 128 ticks per beat. */
    track.addNote(0, `${curNote}`, findDuration())
  }

}

function main () {
  let msg = process.argv[2] ? process.argv[2] : ''
  let filename = process.argv[3] ? process.argv[3] : 'out.mid'

  processMessage(msg)

  fs.writeFileSync(`${filename}`, file.toBytes(), 'binary');
}

main();

