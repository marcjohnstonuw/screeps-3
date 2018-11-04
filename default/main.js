var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
  let mainRoom = Game.spawns['Spawn1'].room;

  var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.source === 0);
  var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.source === 1);
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

  if (harvesters0.length < 3 && mainRoom.energyAvailable > 200) {
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], `harvester0-${Math.random()}`, {
      memory: { role: 'harvester', source: 0 },
    });
  }
  if (harvesters1.length < 3 && mainRoom.energyAvailable > 200) {
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], `harvester1-${Math.random()}`, {
      memory: { role: 'harvester', source: 1 },
    });
  }
  if (upgraders.length < 1 && mainRoom.energyAvailable > 200) {
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], `upgrader-${upgraders.length}`, {
      memory: { role: 'upgrader' },
    });
  }

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
  }

  // let roadPath = Game.spawns['Spawn1'].pos.findPathTo(Game.spawns['Spawn1'].room.controller);
  // roadPath.forEach(n => mainRoom.createConstructionSite(n.x, n.y, STRUCTURE_ROAD));

  // let extensionPlaces = [15, 16, 17, 18, 19];
  // extensionPlaces.forEach(c => mainRoom.createConstructionSite(22, c, STRUCTURE_EXTENSION))
}