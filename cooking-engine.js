const cookingEngine = {
    subMode: 'single',
    targets: [],
    contents: { p0: [], p1: [], p2: [] },
    timer: null,

    start() {
        manager.showScreen('cooking-screen');
        clearInterval(this.timer);
        this.contents = { p0: [], p1: [], p2: [] };
        
        const rand = Math.random();
        if (rand > 0.7) this.setupTriple();
        else if (rand > 0.4) this.setupPantry();
        else this.setupSingle();

        this.startTimer(this.subMode === 'triple' ? 45 : 25);
    },

    setupSingle() {
        this.subMode = 'single';
        const d = foodData.dishes[Math.floor(Math.random() * foodData.dishes.length)];
        this.targets = [d];
        document.getElementById('cook-goal').innerText = `Chef's Order: ${d.name}`;
        this.buildPlates(1);
        this.buildBank(d.ingredients, d.wrong);
    },

    setupTriple() {
        this.subMode = 'triple';
        this.targets = [...foodData.dishes].sort(() => 0.5 - Math.random()).slice(0, 3);
        document.getElementById('cook-goal').innerText = `3-Course Challenge! (Check Plate Labels)`;
        this.buildPlates(3);
        this.buildBank(this.targets.flatMap(t => t.ingredients), ["Soap", "Plastic"]);
    },

    setupPantry() {
        this.subMode = 'pantry';
        document.getElementById('cook-goal').innerText = "Pantry Mode: Make any dish you know!";
        this.buildPlates(1);
        this.buildBank(foodData.dishes.flatMap(d => d.ingredients), ["Old Boot"]);
    },

    buildPlates(n) {
        const con = document.getElementById('plates-container');
        con.innerHTML = '';
        for(let i=0; i<n; i++) {
            const p = document.createElement('div');
            p.className = 'plate-zone';
            p.innerHTML = `<span class="plate-label">${this.subMode === 'triple' ? this.targets[i].name : 'Plate'}</span><div id="p-items${i}"></div>`;
            p.ondragover = (e) => e.preventDefault();
            p.ondrop = (e) => {
                const ing = e.dataTransfer.getData('text');
                if(!this.contents[`p${i}`].includes(ing)) {
                    this.contents[`p${i}`].push(ing);
                    const s = document.createElement('span'); s.innerText = ing;
                    document.getElementById(`p-items${i}`).appendChild(s);
                }
            };
            con.appendChild(p);
        }
    },

    buildBank(req, junk) {
        const b = document.getElementById('ingredient-bank');
        b.innerHTML = '';
        [...new Set([...req, ...junk])].sort(() => Math.random() - 0.5).forEach(ing => {
            const d = document.createElement('div');
            d.className = 'ing'; d.draggable = true; d.innerText = ing;
            d.ondragstart = (e) => e.dataTransfer.setData('text', ing);
            b.appendChild(d);
        });
    },

    startTimer(sec) {
        let left = sec;
        this.timer = setInterval(() => {
            left--;
            document.getElementById('timer-progress').style.width = (left/sec*100) + "%";
            if(left <= 0) { clearInterval(this.timer); alert("Time Out!"); manager.nextTask(); }
        }, 1000);
    },

    checkResult() {
        clearInterval(this.timer);
        let win = false;
        if (this.subMode === 'single') win = this.isMatch(this.contents.p0, this.targets[0]);
        else if (this.subMode === 'triple') win = this.targets.every((t, i) => this.isMatch(this.contents[`p${i}`], t));
        else if (this.subMode === 'pantry') win = foodData.dishes.some(d => this.isMatch(this.contents.p0, d));

        if(win) { alert("Perfect Dish!"); manager.addScore(30); }
        else alert("Chef says: This is terrible!");
        manager.nextTask();
    },

    isMatch(p, d) {
        return d.ingredients.every(i => p.includes(i)) && p.length === d.ingredients.length;
    }
};
