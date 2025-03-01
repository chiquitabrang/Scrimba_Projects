function Character(name) {
  this.name = name;
  this.collectedItemsArr = [];
  this.addItem = function (item) {
    this.collectedItemsArr.push(item);
    console.log(`${this.name} now has: ${this.collectedItemsArr.join(", ")}`);
  };
}

const merlin = new Character("Merlin");
merlin.addItem("wand");
merlin.addItem("map");
merlin.addItem("potions");
