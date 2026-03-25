  const charDiv = document.getElementById("char");
      const resultDiv = document.getElementById("result");
      const startBtn = document.getElementById("startBtn");
      const stopBtn = document.getElementById("stopBtn");

      let trials = 10;
      let currentTrial = 0;
      let totalReactionTime = 0;
      let currentChar = "";
      let startTime = 0;
      let testRunning = false;

      function isLetter(c) {
        return /^[A-Z]$/.test(c);
      }

      function getRandomChar() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return chars[Math.floor(Math.random() * chars.length)];
      }

      function startTest() {
        trials = 10;
        currentTrial = 0;
        totalReactionTime = 0;
        testRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resultDiv.innerHTML = "";
        nextTrial();
      }

      function stopTest() {
        testRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        if (currentTrial > 0) {
          const avg = (totalReactionTime / currentTrial).toFixed(3);
          resultDiv.innerHTML = `Test stopped. Average Reaction Time: ${avg} s`;
        } else {
          resultDiv.innerHTML = `Test stopped. No trials completed.`;
        }
        charDiv.textContent = "";
      }

      function nextTrial() {
        currentChar = getRandomChar();
        charDiv.textContent = currentChar;
        startTime = performance.now();
      }

      function handleKey(e) {
        if (!testRunning) return;

        const endTime = performance.now();
        const reactionTime = (endTime - startTime) / 1000;

        let correct = false;

        if (e.key.toLowerCase() === "a" && isLetter(currentChar))
          correct = true;

        if (e.key.toLowerCase() === "l" && !isLetter(currentChar))
          correct = true;

        if (correct) {
          resultDiv.innerHTML = `✔ Correct! Reaction Time: ${reactionTime.toFixed(3)} s`;
          totalReactionTime += reactionTime;
          currentTrial++;

          if (currentTrial >= trials) {
            const avg = (totalReactionTime / trials).toFixed(3);
            resultDiv.innerHTML += `<br><br>🎯 Test completed! Average Reaction Time: ${avg} s`;
            testRunning = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            charDiv.textContent = "";
          } else {
            nextTrial();
          }
        } else {
          resultDiv.innerHTML = "❌ Wrong key!";
        }
      }

      startBtn.addEventListener("click", startTest);
      stopBtn.addEventListener("click", stopTest);
      document.addEventListener("keydown", handleKey);