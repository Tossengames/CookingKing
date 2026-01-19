const manager = {
    score: parseInt(localStorage.getItem('gm_score')) || 0,
    level: parseInt(localStorage.getItem('gm_level')) || 1,
    currentMode: 'all',

    startGame() {
        this.currentMode = document.getElementById('mode-select').value;
        this.showScreen('menu-screen', false);
        this.updateUI();
        this.nextTask();
    },

    nextTask() {
        let task = this.currentMode;
        if (task === 'all') task = Math.random() > 0.4 ? 'quiz' : 'cooking';
        
        if (task === 'quiz') quizEngine.start();
        else cookingEngine.start();
    },

    updateChef(msg) {
        document.getElementById('chef-bubble').innerText = msg;
    },

    showFeedback(title, msg, isWin) {
        document.getElementById('panel-title').innerText = title;
        document.getElementById('panel-msg').innerText = msg;
        document.getElementById('panel-avatar').innerText = isWin ? "👨‍🍳✨" : "👨‍🍳💢";
        document.getElementById('feedback-panel').classList.remove('hidden');
    },

    closeFeedback() {
        document.getElementById('feedback-panel').classList.add('hidden');
        this.nextTask();
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
    },

    showScreen(id, active = true) {
        document.getElementById(id).classList.toggle('active', active);
    },

    resetGame() {
        localStorage.clear();
        location.reload();
    }
};
manager.updateUI();
