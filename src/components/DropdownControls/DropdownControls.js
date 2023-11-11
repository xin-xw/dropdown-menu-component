import React from "react";
import "./DropdownControls.css";

function DropdownControls({ onSelectAll, onDeselectAll }) {
  return (
    <div className="dropdown-controls">
      <button className="control-btn-select-all" onClick={onSelectAll}>
        Select All
      </button>
      <button className="control-btn-deselect-all" onClick={onDeselectAll}>
        Deselect All
      </button>
    </div>
  );
}

export default DropdownControls;
