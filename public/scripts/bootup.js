async function bootup(self) {
  console.log("In bootup", this);
  const ascii = [
    `   ___                     __         ___          `,
    `  / _ |__ _____ ___ _____ / /____ _  / _ \\___ _  __`,
    ` / __ / // / _ \`/ // (_- / __/ _ \`/ / // / -_) |/ /`,
    `/_/ |_\\_,_/\\_, /\\_,_/___/\\__/\\_,_/ /____/\\__/|___/ `,
    `          /___/                                    `,
  ];
  const txtCommands = [
    "FORCE: XX0022. ENCYPT://000.222.2345",
    "TRYPASS: ********* AUTH CODE: ALPHA GAMMA: 1___ PRIORITY 1",
    "RETRY: REINDEER FLOTILLA",
    "Z:> /FALKEN/GAMES/TICTACTOE/ EXECUTE -PLAYERS 0",
    "================================================",
    "Priority 1 // local / scanning...",
    "scanning ports...",
    "BACKDOOR FOUND (23.45.23.12.00000000)",
    "BACKDOOR FOUND (13.66.23.12.00110000)",
    "BACKDOOR FOUND (13.66.23.12.00110044)",
    "...",
    "...",
    "BRUTE.EXE -r -z",
    "...locating vulnerabilities...",
    "...vulnerabilities found...",
    "MCP/> DEPLOY CLU",
    "SCAN: __ 0100.0000.0554.0080",
    "SCAN: __ 0020.0000.0553.0080",
    "SCAN: __ 0001.0000.0554.0550",
    "SCAN: __ 0012.0000.0553.0030",
    "SCAN: __ 0100.0000.0554.0080",
    "SCAN: __ 0020.0000.0553.0080",
  ];

  function progress(percent, width) {
    var size = Math.round((width * percent) / 100);
    var left = "",
      taken = "",
      i;
    for (i = size; i--; ) {
      taken += "=";
    }
    if (taken.length > 0) {
      taken = taken.replace(/=$/, ">");
    }
    for (i = width - size; i--; ) {
      left += " ";
    }

    let result = ascii.reduce((acc, line) => `${acc}${line}\n`, "");
    result += `[${taken + left}] ${percent}%`;
    return result;
  }

  var i = 0;
  var size = 30;
  prompt = self.get_prompt();
  string = progress(0, size);
  self.set_prompt(progress);
  animation = true;

  const cmds = async () => {
    for (const txtCommand of txtCommands) {
      self.echo(txtCommand);
      // windowBox.scrollTop = windowBox.scrollHeight;
      await sleep(100);
    }
  };

  async function loop() {
    string = progress(i++, size);
    self.set_prompt(string);
    if (i < 100) {
      timer = setTimeout(loop, 100);
    } else {
      self.echo(progress(i, size) + " [[b;green;]OK]").set_prompt(prompt);
      animation = false;
      await sleep(1000);
      await cmds();
    }
  }

  await loop();
}
