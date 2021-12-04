import React from "react";

const Tile = ({ tile }) => {
  let classArry = ["tile"];
  classArry.push("tile" + tile.value);
  if (!tile.mergedInto) {
    classArry.push(`position_${tile.row}_${tile.column}`);
  }
  if (tile.mergedInto) {
    classArry.push("merged");
  }
  if (tile.isNew()) {
    classArry.push("new");
  }
  if (tile.hasMoved()) {
    classArry.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
    classArry.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
    classArry.push("isMoving");
  }

  return <span className={classArry.join(" ")}></span>;
};

export default Tile;
