const quizEngine = {
    start() {
        manager.showScreen('quiz-screen');
        const rand = Math.random();
        if (rand > 0.6) this.originQuiz();
        else if (rand > 0.3) this.healthQuiz();
        else this.oddOneOut();
    },

    render(q, opts, correct) {
        document.getElementById('q-text').innerText = q;
        const box = document.getElementById('options-box');
        box.innerHTML = '';
        opts.sort(() => Math.random() - 0.5).forEach(o => {
            const b = document.createElement('button');
            b.className = 'opt-btn';
            b.innerText = o;
            b.onclick = () => {
                if (o === correct) { alert("Correct!"); manager.addScore(10); manager.nextTask(); }
                else { alert("Wrong! Try the next one."); manager.nextTask(); }
            };
            box.appendChild(b);
        });
    },

    originQuiz() {
        const d = foodData.dishes[Math.floor(Math.random() * foodData.dishes.length)];
        this.render(`Which country is famous for ${d.name}?`, [d.origin + " " + d.flag, "Germany 🇩🇪", "Canada 🇨🇦", "India 🇮🇳"], d.origin + " " + d.flag);
    },

    healthQuiz() {
        const h = foodData.health[Math.floor(Math.random() * foodData.health.length)];
        this.render(h.q, h.options, h.a);
    },

    oddOneOut() {
        const d = foodData.dishes[Math.floor(Math.random() * foodData.dishes.length)];
        const wrong = d.wrong[Math.floor(Math.random() * d.wrong.length)];
        const opts = [d.ingredients[0], d.ingredients[1], wrong];
        this.render(`Which ingredient is NOT used in a traditional ${d.name}?`, opts, wrong);
    }
};
