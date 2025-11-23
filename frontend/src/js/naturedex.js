/**
 * @file naturedex.js
 * @author Yujin Jeong, Evan Vink, Brian Diep
 * @version 1.0
 * @description A collection logic where users can collect items (flowers, trees, rocks) and unlock achievements.
 */


const MAX_COUNT = 5;
const INITIAL_COUNT = 0;
const INCREMENT = 1;

class NatureDex 
{
    constructor() 
    {
        // This is the maximum number of items per type/row in the NatureDex (flower, tree, rock)
        this.MAX_PER_TYPE = MAX_COUNT;

        // Initialize emoji and counter for flower, tree, and rock counts
        this.state = {
            flower: { emoji: ND_LANG.ND_EMOJI_FLOWER, count: INITIAL_COUNT, badgeId: "badge-flower" },
            tree:   { emoji: ND_LANG.ND_EMOJI_TREE, count: INITIAL_COUNT, badgeId: "badge-tree" },
            rock:   { emoji: ND_LANG.ND_EMOJI_ROCK, count: INITIAL_COUNT, badgeId: "badge-rock" }
        };

        // Set initial state for all achievements: initially locked
        this.unlockedAchievements = {
            flower: false,
            tree:   false,
            rock:   false
        };

        // Toast elements
        this.toast          = document.getElementById("toast");
        this.toastEmoji     = document.getElementById("toast-emoji");
        this.toastText      = document.getElementById("toast-text");
        this.toastTimeout   = null;

        // Bind methods to maintain correct `this`
        this.collect = this.collect.bind(this);

        // Initialize when DOM is ready
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() 
    {
        // Set up button events
        document.querySelectorAll(".collect-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const type = btn.dataset.type;
                this.collect(type);
            });
        });

        // Initial render
        this.renderAll();
    }

    // ===== Rendering emojis =====
    renderIcons(type) 
    {
        const { emoji, count }  = this.state[type];
        const container         = document.getElementById(`${type}-icons`);
        container.innerHTML     = ND_LANG.ND_CLEAR_CONTAINER;

        for (let i = 0; i < this.MAX_PER_TYPE; i++) 
            {
                const span           = document.createElement("span");
                span.textContent     = emoji;
                span.classList.add("icon");
            
            if (i < count) 
                {
                    span.classList.add("collected");
                }
            container.appendChild(span);
            }
    }


    // ===== Badge / achievement rendering =====
    renderBadges() 
    {
        Object.keys(this.state).forEach(type => 
        {
            const badge = document.getElementById(this.state[type].badgeId);
            if (this.unlockedAchievements[type]) 
            {
                badge.classList.add("unlocked");
            } 
            else 
            {
                badge.classList.remove("unlocked");
            }
        });
    }

    renderAll() 
    {
        this.renderIcons("flower");
        this.renderIcons("tree");
        this.renderIcons("rock");
        this.renderBadges();
    }

    // ===== Toast (small popup) =====
    showToast(emoji, text) 
    {
        this.toastEmoji.textContent = emoji;
        this.toastText.textContent  = text;
        this.toast.classList.add("show");

        clearTimeout(this.toastTimeout);

        this.toastTimeout = setTimeout(() => {
            this.toast.classList.remove("show");
        }, 2500);
    }

    // ===== Collection logic =====
    collect(type) 
    {
        const entry = this.state[type];

        // Check if row is already full
        if (entry.count >= this.MAX_PER_TYPE)
        {
            // Row already full, no more items can be collected
            this.showToast(ND_LANG.ND_EMOJI_CHECKMARK, ND_LANG.ND_TOAST_MAXED.replace("${type}", type));
            return;

        }

        // If not full: collect item
        entry.count += INCREMENT;
        this.renderIcons(type);

        // Check if this unlocks achievement (reached 5 for first time)
        if (entry.count === this.MAX_PER_TYPE && !this.unlockedAchievements[type]) 
        {
            this.unlockedAchievements[type] = true;
            this.renderBadges();

            // different emoji per type just for fun
            const emojiMap = {
                flower: ND_LANG.ND_EMOJI_FLOWER,
                tree:   ND_LANG.ND_EMOJI_TREE,
                rock:   ND_LANG.ND_EMOJI_ROCK
            };

            this.showToast(
                ND_LANG.ND_EMOJI_STAR,
                `${emojiMap[type]} ${type.toUpperCase()} ${ND_LANG.ND_BADGE_UNLOCKED}`
            );

        }
    }
}


// Instantiate the NatureDex class
const natureDex = new NatureDex();