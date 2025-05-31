# Keyboard Date Input

EN / [JA](./README.ja.md)

## About
`keyboard-date-input` is a React component library that helps users to input dates and months using keyboard. It provides a simple way for entering dates without format errors.
It currently supports a format of `YYYY/MM/DD` for dates and `YYYY/MM` for months. (For year, only 1000-9999 is supported)


## How to use
### Package Installation
1. Install the package using npm:
   ```bash
   npm install keyboard-date-input
   ```
### Using Preset Input
1. Import the preset input component:
   ```javascript
   import { DateInput, MonthInput } from 'keyboard-date-input';
   ```
2. Use the component in your application:
   ```jsx
    <DateInput
      value={dateValue}
      onChange={setDateValue}
      className="date-input"
    />
    ```
    
### Using Custom Input
1. Import functions for the custom input component:
   ```javascript
   import { handleDateChange, handleKeyPress } from 'keyboard-date-input';
   ```
2. Set `handleDateChange` or `handleMonthChange` as the `onChange` handler, and `handleKeyPress` as the `onKeyDown` handler:
   ```jsx
   <YourInputComponent
     onChange={handleDateChange}
     onKeyDown={handleKeyPress}
     />
   ```
### API
- `DateInput`: A React component for date input.
  - Accepts the props as in HTMLInput element.
  - Returns a date input component that allows users to enter dates in `YYYY/MM/DD` format.
- `MonthInput`: A React component for month input.
  - Accepts the props as in HTMLInput element.
  - Returns a month input component that allows users to enter months in `YYYY/MM` format.
- `withDateInputFeature`: A higher-order component that wraps a custom input component to provide date input functionality.
  - `Component`: The custom input component to wrap.
  - Returns a new component with date input functionality.
- `withMonthInputFeature`: A higher-order component that wraps a custom input component to provide month input functionality.
  - `Component`: The custom input component to wrap.
  - Returns a new component with month input functionality.

## Specifications
### Basic
- Only numeric input is allowed.
- Non-numeric characters are ignored.
- There are two modes: initial input mode and edit mode.

### Initial Input Mode
- In initial input mode, once a number is entered, the input automatically moves to the next unit (year → month → day).
- Slashes (/) are inserted automatically.
- Input progresses through the following steps:
  - Year input
  - Month input
  - Day input

#### Year Input
- The year must be 4 digits.
- Once 4 digits are entered, it automatically transitions to month input.

##### Deletion with Backspace
Pressing the backspace key deletes one character at a time (same behavior as native input).

##### Cursor Movement
- If the month hasn't been entered yet, the arrow keys do not move the cursor.
- If the month has been entered:
  - Pressing the right arrow key moves to month input.
  - If the day hasn't been entered, behavior follows “Initial Input Mode → Month Input”.
  - If the day has been entered, behavior follows “Edit Mode → Month Edit”.
#### Month Input
- First digit:
  - Inputting 0 is ignored.
  - Inputting a number from 3 to 9:
    - If the year does not end with /, a slash is automatically inserted.
    - The value is zero-padded (yyyy/03, yyyy/09, etc.).
    - Moves to day input.
  - Inputting 1:
    - If the year does not end with /, a slash is automatically inserted.
    - The value is zero-padded to become yyyy/01.
    - Does not move to day input yet — waits for the second digit.
- Second digit:
  - Inputting 3 to 9:
    - Automatically inserts / after "01" and treats the input number as the beginning of the day (yyyy/01/03, etc.).
  - Inputting 0, 1, or 2:
    - Finalizes month as "10" or "12" and moves to day input.
##### Deletion with Backspace
- Backspace deletes one digit at a time during month input:
  - Deleting the first digit returns to year input.
  - Deleting the second digit leaves only the first digit.
##### Cursor Movement
- Pressing the left arrow moves the cursor to year input. Behavior follows “Edit Mode → Year Edit”.
- If day has been entered, pressing the right arrow moves to day input. Behavior follows “Initial Input Mode → Day Input”.
#### Day Input
- First digit:
  - Inputting 0 is ignored.
  - Inputting 1 to 9:
    - If the month doesn't end with /, it’s automatically inserted.
    - The value is zero-padded (yyyy/mm/01, etc.).
- Second digit:
  - Combines with the first digit and checks if the value exceeds the max days of the month.
    - If it exceeds: input is ignored.
    - If valid: combines as day value and transitions to edit mode.
##### Deletion with Backspace
Pressing backspace resets the day value to "00".
##### Cursor Movement
Pressing the left arrow moves the cursor to month input. Behavior follows “Edit Mode → Month Edit”.

### Edit Mode
When the input has the format yyyy/mm/dd, edit mode is enabled.

#### Year Edit
- When the cursor is at the year position (yyyy|/mm/dd), it enters year edit mode.
- Inputting a number shifts the digits to the left: the 4th digit is dropped, and the new digit becomes the 1st.

##### Deletion with Backspace
Pressing backspace resets the year to "0000".
##### Cursor Movement
Pressing the right arrow moves the cursor to month input. Behavior follows “Edit Mode → Month Edit”.

#### Month Edit
- When the cursor is at the month position (yyyy/mm|/dd), it enters month edit mode.
- Behavior based on input:
  - 0: If the month is "01", it becomes "10"; otherwise ignored.
  - 1: If the month is "01" or "11", it becomes "11"; otherwise changes to "01".
  - 2: If the month is "01" or "11", it becomes "12"; otherwise changes to "02".
  - 3 to 9: Zero-padded and set as the new month value.
##### Deletion with Backspace
Pressing backspace resets the month to "00".
##### Cursor Movement
- Pressing the left arrow moves to year input — behavior follows “Edit Mode → Year Edit”.
- Pressing the right arrow moves to day input — behavior follows “Edit Mode → Date Edit”.

#### Date Edit
- When the cursor is at the date position (yyyy/mm/dd|), it enters date edit mode.
- The new input is combined with the 1st digit of the current date and compared against the month's max date:
  - If it exceeds the max: input is ignored.
  - If valid: date is updated with the new value and remains in edit mode.
  - Examples:
    - "01" + 0 → "01"
    - "01" + 1 → "11"
    - "10" + 3 → "03"
    - "11" + 0 → "10"
    - "12" + 3 → "23"
    - "31" + 9 → "09"

##### Deletion with Backspace
Pressing backspace resets the date to "00".

## License
MIT License