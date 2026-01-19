const quizEngine = {
    currentQuestion: null,

    start() {
        manager.showScreen('cooking-screen', false);
        manager.showScreen('quiz-screen', true);
        
        // Randomly decide which type of quiz to show
        const rand = Math.random();
        
        if (rand > 0.75) {
            this.setupOriginQuiz();
        } else if (rand > 0.50) {
            this.setupOddOneOut();
        } else if (rand > 0.25) {
            this.setupMarketQuiz();
        } else {
            this.setupHealthQuiz();
        }
    },

    // 1. ORIGIN QUIZ: "Which country is famous for...?"
    setupOriginQuiz() {
        const dish = foodData.dishes[Math.floor(Math.random() * foodData.dishes.length)];
        const question = `Chef Gusto asks: Which country is famous for ${dish.name}?`;
        
        // Generate options including the correct one
        const correct = `${dish.origin} ${dish.flag}`;
        const options = [correct, "USA 🇺🇸", "Brazil 🇧🇷", "India 🇮🇳", "Germany 🇩🇪"];
        
        this.render(question, options, correct, `Correct! ${dish.name} is a masterpiece of ${dish.origin}.`);
    },

    // 2. ODD ONE OUT: "Which ingredient DOES NOT belong?"
    setupOddOneOut() {
        const dish = foodData.dishes[Math.floor(Math.random() * foodData.dishes.length)];
        const question = `Quick! Which of these is NOT used in a traditional ${dish.name}?`;
        
        const correct = dish.junk[Math.floor(Math.random() * dish.junk.length)];
        // Pick two real ingredients
        const real1 = dish.ingredients[0];
        const real2 = dish.ingredients[1];
        
        const options = [correct, real1, real2];
        this.render(question, options, correct, `Exactly! ${correct} would ruin the flavor of ${dish.name}!`);
    },

    // 3. HEALTH & REMEDIES
    setupHealthQuiz() {
        const h = foodData.health[Math.floor(Math.random() * foodData.health.length)];
        this.render(`Health Tip: ${h.q}`, h.opts, h.a, h.info);
    },

    // 4. MARKET PRACTICES & ORGANIC
    setupMarketQuiz() {
        const m = foodData.market[Math.floor(Math.random() * foodData.market.length)];
        this.render(`Market Skill: ${m.q}`, m.opts, m.a, m.info);
    },

    // RENDER LOGIC
    render(question, options, correct, feedbackMsg) {
        manager.updateChef(question);
        
        const box = document.getElementById('options-box');
        box.innerHTML = '';

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn'; // Uses the style from our CSS
            btn.innerText = opt;
            
            btn.onclick = () => {
                if (opt === correct) {
                    manager.addScore(15);
                    manager.showFeedback("Magnificent!", feedbackMsg, true);
                } else {
                    manager.showFeedback("Oh No!", "That's not what the recipe calls for. Keep studying!", false);
                }
            };
            box.appendChild(btn);
        });
    }
};


