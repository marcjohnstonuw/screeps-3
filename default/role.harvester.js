var roleBuilder = require('role.builder');

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function (creep) {
    let sourceId = creep.memory.source
    if (creep.carry.energy < creep.carryCapacity && !creep.memory.isFull) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.pos.inRangeTo(sources[sourceId], 1)) {
        creep.harvest(sources[sourceId]);
      } else {
        creep.moveTo(sources[sourceId], { visualizePathStyle: { stroke: '#ffaa00' }, reusePath: 10 });
      }
    }
    else {
      creep.memory.isFull = true;
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.pos.inRangeTo(targets[0], 1)) {
          let res = creep.transfer(targets[0], RESOURCE_ENERGY);
          if (res === ERR_NOT_ENOUGH_RESOURCES) {
            creep.memory.isFull = false;
          }
        } else {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
        }
      } else {
        return roleBuilder.run(creep);
      }
    }
  }
};

module.exports = roleHarvester;