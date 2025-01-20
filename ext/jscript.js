
// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class jscript{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('jscript', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'jscript',
      name: 'javascript',
      color1: '#0f1ebd',
      color2: '#0DA57A',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'CountID',
          blockType: BlockType.COMMAND,
          arguments: {
            TXT: {
              type: ArgumentType.STRING
            }
          },
          text: 'Alert [TXT]'
        },
        {
          opcode: 'Print Screen',
          blockType: BlockType.COMMAND,
          text: 'Print Screen',
          gen: {
            arduino: this.Print ScreenCpp,
            micropy: this.Print ScreenMpy
          }
        }
      ]
    }
  }

CountID (args, util){
  const TXT = args.TXT;
  alert(TXT);

  return this.write(`M0 \n`);
}

Print Screen (args, util){

  return this.write(`M0 \n`);
}

Print ScreenCpp (gen, block){
  cppComm(gen);
  return gen.template2code(block, 'Print Screen')
  print();
}

Print ScreenCpp (gen, block){
  mpyComm(gen);
  return gen.template2code(block, 'Print Screen')
}

}

module.exports = jscript;
