import DropdownMenu from "./components/DropdownMenu/DropdownMenu.js";

import "./App.css";
import countryList from "./countryList";

function App() {
  const tooManyOptions = new Array(1000)
    .fill(null)
    .map((_, index) => `Option ${index + 1}`);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const tenOptions = new Array(10)
    .fill(null)
    .map((_, index) => `Option ${index + 1}`);

  return (
    <div className="App">
      <section className="dropdown-section">
        <div className="dropdown-header">Single Select Dropdown</div>
        <div className="dropdown-explain">
          Single-select dropdowns. No select all or deselect all buttons. Search
          string is space-insensitive and case-insensitive.
        </div>
        <DropdownMenu
          options={options}
          prompt={"Single-select (not searchable)"}
        />
        <DropdownMenu
          options={tenOptions}
          searchable={true}
          prompt={"Single-select (searchable)"}
        />
      </section>

      <section className="dropdown-section">
        <div className="dropdown-header">Multi Select Dropdown</div>
        <div className="dropdown-explain">
          Multi-select dropdowns display selected options as tags and offer
          integrated search functionality. Select-all and deselect-all buttons
          are provided for convenience, positioned above the tags to allow easy
          resetting of input, even with numerous tags.
        </div>
        <DropdownMenu
          options={options}
          multiselect={true}
          searchable={true}
          prompt={"Multi-select (searchable)"}
        />
        <DropdownMenu
          options={tenOptions}
          multiselect={true}
          prompt={"Multi-select (not searchable)"}
        />
      </section>

      <section className="dropdown-section">
        <div className="dropdown-header">
          Default Parameters for Reusability
        </div>
        <div className="dropdown-explain">
          The title above each dropdown is an optional prompt providing context.
          Omitting the prompt doesn't affect functionality, emphasizing the
          component's reusability. By default, single-select dropdown is chosen,
          and search is not allowed (reverting back to the most simple case).
          For single-select dropdowns, none option is prepended as an option to
          each list by default.
        </div>
        <DropdownMenu options={options} searchable={true} multiselect={true} />
        <DropdownMenu options={options} />
      </section>

      <section className="dropdown-section">
        <div className="dropdown-header">
          Efficient Rendering of Large Lists
        </div>
        <div className="dropdown-explain">
          Utilizing the react-window package, the component renders only a
          portion of a large dataset at a time, optimizing rendering
          performance. This approach enhances scalability and responsiveness,
          crucial for component reusability.
        </div>
        <DropdownMenu
          options={tooManyOptions}
          multiselect={true}
          prompt={"Choose from 1000 options, multi-select, not searchable"}
        />
        <DropdownMenu
          options={tooManyOptions}
          searchable={true}
          prompt={"Choose from 1000 options, single-select, searchable"}
        />
      </section>

      <section className="dropdown-section">
        <div className="dropdown-header">Edge Case: No Options</div>
        <DropdownMenu options={[]} multiselect={true} />
      </section>

      <section className="dropdown-section">
        <div className="dropdown-header">Examples</div>
        <DropdownMenu
          options={countryList}
          searchable={true}
          prompt={"Which country were you born in?"}
        />
        <DropdownMenu
          options={["Rock", "Paper", "Scissors"]}
          searchable={false}
          noneOption={false}
          prompt={"Rock, paper, or scissors"}
        />
        <DropdownMenu
          options={countryList}
          multiselect={true}
          searchable={true}
          prompt={"Select all the countries you wish to visit one day"}
        />
        <DropdownMenu
          options={[
            "Red",
            "Blue",
            "Green",
            "Yellow",
            "Orange",
            "Pink",
            "Purple",
          ]}
          multiselect={true}
          searchable={false}
          prompt={"Favorite colors"}
        />
      </section>
    </div>
  );
}

export default App;
