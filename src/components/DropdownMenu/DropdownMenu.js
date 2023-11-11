import React, { useState, useRef, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import DropdownControls from "../DropdownControls/DropdownControls.js";
import "./DropdownMenu.css";

function useOutsideAlerter({ ref, onClose }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onClose]);
}

// Reusable Dropdown component definition. Destructure props for easier access. Height of dropdown list is set to 250px by default, but can be overridden by passing in a height prop.

// By default Dropdown is single select, multiselect needs to be set to true for it to be multiselect

// Prompt parameter is optional, and provides a title text on top of the dropdown list
function DropdownMenu({
  options = [],
  multiselect = false,
  prompt = "",
  height = 275,
  searchable = false,
  noneOption = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Search bar for lists. Thought this would be useful for large lists.
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const wrapperRef = useRef(null);
  const listItemSize = 50;

  // Display logic for options
  let displayOptions = options;
  if (searchable && searchTerm.trim().length > 0) {
    displayOptions = options.filter((option) =>
      option
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
    );
  }
  if (!multiselect && noneOption) {
    displayOptions = ["None", ...displayOptions];
  }

  // Determine what to display in the dropdown bar
  let displayValue = "Select...";
  if (searchable) {
    displayValue = searchTerm;
  } else if (!multiselect && selectedOptions.length > 0) {
    displayValue = selectedOptions[0];
  }

  // Hook that handles closing the dropdown when the user clicks outside of it.
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));

  const handleOptionSelect = (option) => {
    if (multiselect) {
      // Add or remove the option from the selected options list
      setSelectedOptions((prevSelectedOptions) => {
        // If the option is already selected, remove it from the list
        if (prevSelectedOptions.includes(option)) {
          return prevSelectedOptions.filter(
            (selectedOption) => selectedOption !== option
          );
        }
        // Otherwise, add the option to the list
        return [...prevSelectedOptions, option];
      });
    } else {
      // Set the selected option to the current option
      setSelectedOptions([option]);
      if (!searchable) {
        setSearchTerm("");
      }
    }
  };

  const handleRemoveTag = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  // Turn search string into all lower case and remove spaces to find more results easier
  // Replace all whitespace with lowercase in a string using regex
  const filteredOptions =
    searchTerm.trim().length > 0
      ? displayOptions.filter((option) =>
          // Remove spaces from both the option and the search term before comparing
          option
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
        )
      : displayOptions;

  // Select all and deselect all buttons for multi-selected dropdown lists
  const handleSelectAll = () => setSelectedOptions(options);
  const handleDeselectAll = () => setSelectedOptions([]);

  // Return "No options available" edge case
  if (options.length === 0) {
    return (
      <div className="dropdown-search-bar">
        <input
          className="dropdown-search"
          placeholder={"No options available"}
          readOnly={true}
        />
      </div>
    );
  }

  return (
    <div>
      <header className="dropdown-prompt">{prompt}</header>
      <div className="dropdown-container" ref={wrapperRef}>
        <div className="dropdown-bar" onClick={() => setIsOpen(!isOpen)}>
          {searchable ? (
            <input
              className="dropdown-search"
              type="text"
              placeholder="Filter..."
              value={displayValue}
              onChange={handleSearchChange}
            />
          ) : (
            <span>{displayValue}</span> // Displays the selected option or default text
          )}
          <span className="dropdown-icon" />
        </div>

        {isOpen && multiselect && (
          <DropdownControls
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
          />
        )}
        {(searchable || multiselect) && (
          <div className="dropdown-tags">
            {selectedOptions.map((option) => (
              <span key={option} className="dropdown-tag">
                {option}
                <button
                  className="dropdown-tag-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(option);
                  }}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}
        {isOpen && (
          <>
            {!filteredOptions.length ? (
              <div className="no-results">No result found</div>
            ) : (
              <List
                height={height}
                itemCount={filteredOptions.length}
                itemSize={listItemSize}
                width="100%"
              >
                {({ index, style }) => {
                  const option = filteredOptions[index];
                  return (
                    <li
                      key={option}
                      className={`dropdown-item ${
                        selectedOptions.includes(option) ? "selected" : ""
                      }`}
                      style={style}
                      onClick={() => handleOptionSelect(option)}
                    >
                      <input
                        type={multiselect ? "checkbox" : "radio"}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionSelect(option)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      {option}
                    </li>
                  );
                }}
              </List>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
