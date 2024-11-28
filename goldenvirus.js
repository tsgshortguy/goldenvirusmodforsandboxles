// Full GoldenVirus mod integration
const GoldenVirus = {
    name: 'GoldenVirus',
    color: 'gold',
    type: 'special',
    spreadRate: 0.1,
    lifeSpan: 10000,
    deathRate: 0.02,
    timer: 0,
    infected: false,
    spread: function(world, x, y) {
        world.entities.forEach((obj) => {
            if (this.isNearby(obj, x, y) && !obj.infected) {
                obj.infected = true;
                obj.color = this.color;
            }
        });
    },
    isNearby: function(obj, x, y) {
        return Math.abs(obj.x - x) < 10 && Math.abs(obj.y - y) < 10;
    },
    update: function(world, x, y) {
        if (this.timer < this.lifeSpan) {
            this.spread(world, x, y);
            this.timer += this.spreadRate;
        } else {
            this.timer = 0;
            world.removeElement(this);
        }
        this.spreadRate -= this.deathRate;
        if (this.spreadRate <= 0) this.spreadRate = 0;
    }
};

function createGoldenVirusButton() {
    const button = document.createElement('button');
    button.innerText = 'GoldenVirus';
    button.style.backgroundColor = 'gold';
    button.onclick = function() {
        gameWorld.addElement(GoldenVirus);
    };
    document.getElementById('specialToolbar').appendChild(button);
}
