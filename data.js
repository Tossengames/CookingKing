const foodData = {
    // DISHES: Used for Cooking Challenges & Origins
    dishes: [
        // Italian
        { id: 1, name: "Margherita Pizza", region: "Italian", ingredients: ["Dough", "Tomato", "Mozzarella", "Basil"], icon: "🍕", junk: ["Pineapple", "Beef", "Corn"], origin: "Italy", flag: "🇮🇹" },
        { id: 2, name: "Pasta Carbonara", region: "Italian", ingredients: ["Pasta", "Egg", "Pecorino", "Guanciale"], icon: "🍝", junk: ["Cream", "Garlic", "Onion"], origin: "Italy", flag: "🇮🇹" },
        
        // French
        { id: 3, name: "Ratatouille", region: "French", ingredients: ["Eggplant", "Zucchini", "Bell Pepper", "Tomato"], icon: "🥘", junk: ["Chicken", "Rice", "Butter"], origin: "France", flag: "🇫🇷" },
        { id: 4, name: "Crêpe Suzette", region: "French", ingredients: ["Flour", "Milk", "Orange", "Sugar"], icon: "🥞", junk: ["Salt", "Beef", "Pepper"], origin: "France", flag: "🇫🇷" },
        
        // World / Worldwide
        { id: 5, name: "Sushi Rolls", region: "World", ingredients: ["Rice", "Nori", "Raw Fish", "Vinegar"], icon: "🍣", junk: ["Bread", "Cheese", "Mayo"], origin: "Japan", flag: "🇯🇵" },
        { id: 6, name: "Beef Tacos", region: "World", ingredients: ["Tortilla", "Beef", "Salsa", "Lime"], icon: "🌮", junk: ["Pasta", "Soy Sauce", "Ginger"], origin: "Mexico", flag: "🇲🇽" },
        { id: 7, name: "Greek Salad", region: "World", ingredients: ["Cucumber", "Tomato", "Feta", "Olives"], icon: "🥗", junk: ["Lettuce", "Croutons", "Ham"], origin: "Greece", flag: "🇬🇷" },
        
        // Desserts & Sweets
        { id: 8, name: "Tiramisu", region: "Italian", ingredients: ["Ladyfingers", "Coffee", "Mascarpone", "Cocoa"], icon: "🍰", junk: ["Strawberry", "Gelatin"], origin: "Italy", flag: "🇮🇹" },
        { id: 9, name: "Baklava", region: "World", ingredients: ["Phyllo", "Honey", "Nuts", "Butter"], icon: "🍯", junk: ["Chocolate", "Milk"], origin: "Turkey", flag: "🇹🇷" },

        // Drinks
        { id: 10, name: "Matcha Latte", region: "World", ingredients: ["Matcha", "Hot Water", "Milk"], icon: "🍵", junk: ["Coffee", "Lemon"], origin: "Japan", flag: "🇯🇵" }
    ],

    // HEALTH & REMEDIES: Used for Quiz Engine
    health: [
        { 
            q: "Which ingredient is a powerful anti-inflammatory for joint and knee pain?", 
            a: "Turmeric", 
            opts: ["Turmeric", "Refined Sugar", "White Bread"], 
            info: "Curcumin in turmeric is world-famous for reducing inflammation!" 
        },
        { 
            q: "What is the best natural remedy for a sore throat or cough?", 
            a: "Honey & Garlic", 
            opts: ["Ice Cream", "Honey & Garlic", "Cold Soda"], 
            info: "Honey soothes the throat while garlic acts as a natural antibiotic." 
        },
        { 
            q: "Which food is richest in Vitamin C for the immune system?", 
            a: "Bell Peppers", 
            opts: ["Beef", "Bell Peppers", "White Rice"], 
            info: "Actually, Bell Peppers have more Vitamin C per gram than oranges!" 
        },
        { 
            q: "Which supplement is vital for bone health when you don't get enough sun?", 
            a: "Vitamin D", 
            opts: ["Vitamin D", "Vitamin B12", "Iron"], 
            info: "Vitamin D helps your body absorb calcium properly." 
        }
    ],

    // MARKET & ORGANIC: Best Practices for shopping
    market: [
        {
            q: "When picking a ripe Avocado, how should it feel?",
            a: "Slightly soft but not mushy",
            opts: ["Rock hard", "Slightly soft but not mushy", "Very soft and watery"],
            info: "Gently press the top; if it gives slightly, it's ready!"
        },
        {
            q: "What does the 'Organic' label primarily guarantee?",
            a: "No synthetic pesticides",
            opts: ["No synthetic pesticides", "More calories", "Zero sugar"],
            info: "Organic farming avoids synthetic chemicals and GMOs."
        }
    ]
};
