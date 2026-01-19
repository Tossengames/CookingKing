const cookingEngine = {
    activePlate: [],
    timer: null,
    targetDish: null,

    start() {
        manager.showScreen('quiz-screen', false);
        manager.showScreen('cooking-screen', true);
        this.activePlate = [];
        
        // Pick a random dish as a goal
        this.targetDish = foodData.dishes[Math.floor(Math.random() * foodData.dishes.length)];
        manager.updateChef(`I need you to cook: ${this.targetDish.name}`);
        
        this.renderPlates();
        this.renderBank();
        this.startTimer(30);
    },

    renderPlates() {
        const con = document.getElementById('plates-container');
        con.innerHTML = `<div class="plate-zone" id="main-plate" ondragover="event.preventDefault()" ondrop="cookingEngine.handleDrop(event)">
            <span class="plate-label">MAIN PLATE</span>
        </div>`;
    },

    renderBank() {
        const bank = document.getElementById('ingredient-bank');
        bank.innerHTML = '';
        const ings = [...this.targetDish.ingredients, ...this.targetDish.junk].sort(() => 0.5 - Math.random());
        
        ings.forEach(name => {
            const div = document.createElement('div');
            div.className = 'ing-item';
            div.draggable = true;
            div.innerHTML = `<div class="ing-circle">🍎</div><div class="ing-name">${name}</div>`;
            div.ondragstart = (e) => e.dataTransfer.setData('text', name);
            bank.appendChild(div);
        });
    },

    handleDrop(e) {
        e.preventDefault();
        const name = e.dataTransfer.getData('text');
        if(!this.activePlate.includes(name)) {
            this.activePlate.push(name);
            this.visualAdd(name);
        }
    },

    visualAdd(name) {
        const plate = document.getElementById('main-plate');
        const item = document.createElement('div');
        item.className = 'dropped-ing';
        item.innerText = "🔸"; // Placeholder for ingredient visual
        
        // Random spread inside circle
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 40 + 10;
        item.style.left = `calc(50% + ${Math.cos(angle) * dist}px)`;
        item.style.top = `calc(50% + ${Math.sin(angle) * dist}px)`;
        
        plate.appendChild(item);
    },

    checkResult() {
        clearInterval(this.timer);
        
        // DEBUG LOG
        console.log("--- CHEF DEBUG ---");
        console.log("Your Plate:", this.activePlate);
        console.log("Goal:", this.targetDish.name, this.targetDish.ingredients);

        // Flexible Match: Check if plate matches ANY dish in data
        const matchedDish = foodData.dishes.find(d => 
            d.ingredients.length === this.activePlate.length && 
            d.ingredients.every(i => this.activePlate.includes(i))
        );

        if (matchedDish) {
            manager.addScore(25);
            manager.showFeedback("Delicious!", `You successfully made ${matchedDish.name}!`, true);
        } else {
            manager.showFeedback("Kitchen Disaster!", "Chef Gusto cannot serve this mess!", false);
        }
    },

    startTimer(sec) {
        let time = sec;
        const bar = document.getElementById('timer-progress');
        this.timer = setInterval(() => {
            time -= 0.1;
            bar.style.width = (time / sec * 100) + "%";
            if(time <= 0) {
                clearInterval(this.timer);
                manager.showFeedback("Time's Up!", "The kitchen is closed!", false);
            }
        }, 100);
    }
};
