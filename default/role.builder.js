var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function (creep) {
    let sourceId = creep.memory.source || 1;
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION);
      }
    });
    if (targets.length > 0) {
      if (creep.pos.inRangeTo(targets[0], 3)) {
        let res = creep.build(targets[0])
        if (res == ERR_NOT_ENOUGH_RESOURCES) {
          creep.memory.isFull = false
        }
      } else {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' }, reusePath: 10 });
      }
    }
  }
}

module.exports = roleUpgrader;