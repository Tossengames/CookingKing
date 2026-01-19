const manager = {
    score: parseInt(localStorage.getItem('gm_score')) || 0,
    level: parseInt(localStorage.getItem('gm_level')) || 1,
    currentMode: 'all',
    currentRegion: 'World',

    startGame() {
        this.currentMode = document.getElementById('mode-select').value;
        this.currentRegion = document.getElementById('region-select').value;
        this.updateUI();
        this.nextTask();
    },

    nextTask() {
        let task = this.currentMode;
        if (task === 'all') task = Math.random() > 0.4 ? 'quiz' : 'cooking';
        
        if (task === 'quiz') quizEngine.start();
        else cookingEngine.start();
    },

    addScore(pts) {
        this.score += pts;
        this.level++;
        localStorage.setItem('gm_score', this.score);
        localStorage.setItem('gm_level', this.level);
        this.updateUI();
    },

    updateUI() {
        document.getElementById('score-val').innerText = `Score: ${this.score}`;
        document.getElementById('lvl').innerText = `Level ${this.level}`;
        document.getElementById('timer-progress').style.width = "100%";
    },

    showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    resetGame() {
        localStorage.clear();
        location.reload();
    }
};
manager.updateUI();
