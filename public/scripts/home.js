function home() {
  body.addEventListener("click", async () => {
    if (!booted) {
      booted = true;
      bootAudio.volume = 0.2;
      bootAudio.play();
      await sleep(1000);
      windowDisplay.classList.remove("minimize");
      await sleep(400);
      windowDisplay.classList.remove("transition");

      $("#terminal").terminal(
        function (command) {
          if (command !== "") {
            var result = window.eval(command);
            if (result != undefined) {
              this.echo(String(result));
            }
          }
        },
        {
          greetings: function (cb) {
            // echo
            bootup(this)
              .then(() => cb())
              .catch((err) => console.error(err));
          },
          name: "js_demo",
          prompt: "js> ",
        }
      );

      // await bootup();

      // await cli();
      playModemNoise();
    }
  });
}
